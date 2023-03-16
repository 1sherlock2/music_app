import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { OrderTracksEntity } from '../../db/entity/orderTracks.entity';
import { UserEntity } from '../../db/entity/user.entity';
import { RoleEnum } from '../../enums/role.enum';
import {
  ILoginAccess,
  IRegistrationStatus
} from '../../interfaces/user.register_status.interface';
import httpMessages from '../../utils/httpMessages';
import { EmailService } from '../email/email.service';
import { LoginDTO, UserCreateDTO } from './dto/user.dto';
import updateQueryForUser from './utils/updateQueryForUser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(OrderTracksEntity)
    private readonly orderTraksEntity: Repository<OrderTracksEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService
  ) {}

  async create(userDTO: UserCreateDTO): Promise<IRegistrationStatus> {
    // TODO удалить создание ролей ( нужно в тестовом формате )
    const { nickname, password, email, roles } = userDTO;
    const userHasInDb = await this.userEntity.findOne({
      where: { nickname }
    });
    if (userHasInDb) {
      throw new BadRequestException({
        success: false,
        message: httpMessages.userAvailable
      });
    }
    const userSave: UserEntity = await this.userEntity.create({
      nickname,
      password,
      email,
      roles
    });

    // верификационная ссылка
    await this.emailService.sendVerificationLink(email);

    await this.userEntity.save(userSave);

    // Создание взаимосвязи с таблицей порядка треков
    const identifyTrakIdsSave = await this.orderTraksEntity.create({
      order: [],
      user: userSave
    });

    await this.orderTraksEntity.save(identifyTrakIdsSave);
    const result = {
      success: true,
      message: httpMessages.userWasCreated
    };
    return result;
  }
  async authenticate(loginDTO: LoginDTO): Promise<ILoginAccess> {
    const { nickname, password } = loginDTO;
    const user: UserEntity = await this.userEntity.findOne({
      where: { nickname }
    });
    if (!user) {
      throw new UnauthorizedException(httpMessages.userOrPasswordIsNotCorrect);
    }
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      throw new UnauthorizedException(httpMessages.userOrPasswordIsNotCorrect);
    }
    const accessToken: string = this.jwtService.sign({
      id: user.id,
      roles: user.roles
    });
    return { nickname, accessToken, success: true };
  }

  async changePass({ nickname, old_pass, password: new_pass }) {
    try {
      const findLogin = await this.userEntity.findOne({
        where: { nickname }
      });
      if (!findLogin) {
        throw new NotFoundException(httpMessages.userIsNotFind);
      }

      const passwordCompare = await compare(old_pass, findLogin.password);
      if (!passwordCompare) {
        throw new UnauthorizedException(
          httpMessages.userOrPasswordIsNotCorrect
        );
      }
      const round = this.configService.get('ROUND');
      const hashPassword = await hash(new_pass, Number(round));
      await this.userEntity
        .createQueryBuilder()
        .update({ password: hashPassword })
        .where({ nickname });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async addRole({ userId, role }) {
    const user = await this.userEntity.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException(httpMessages.userNotFound);
    }
    const rolesAvailable = Array.isArray(role)
      ? role.some((el) => user.roles.includes(el))
      : user.roles.includes(role);
    if (rolesAvailable) {
      throw new HttpException(
        httpMessages.rolesAvailableByUser,
        HttpStatus.BAD_REQUEST
      );
    }
    const modifyRoles = Array.isArray(role) ? role : [role];
    await updateQueryForUser(UserEntity, { roles: modifyRoles }, userId);
    return { status: HttpStatus.OK, message: httpMessages.rolesUpdated };
  }

  async ban(userId) {
    const user = await this.userEntity.findOneBy({ id: userId });
    const userIsAdmin = user.roles.includes(RoleEnum.Admin);
    if (!user) {
      throw new UnauthorizedException(httpMessages.userNotFound);
    }
    if (userIsAdmin) {
      throw new HttpException(httpMessages.userIsAdmin, HttpStatus.BAD_REQUEST);
    }

    await updateQueryForUser(UserEntity, { banned: true }, userId);
    return { status: HttpStatus.OK, message: httpMessages.userWasBanned };
  }

  async getUserEmail(email: string) {
    return this.userEntity.findOne({ where: { email } });
  }

  async markEmailConfirm(email: string): Promise<void> {
    this.userEntity.update({ email }, { isEmailConfirmed: true });
  }
}
