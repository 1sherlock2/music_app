import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { getConnection, Repository } from 'typeorm';
import { OrderTracks } from '../../db/entity/orderTracks.entity';
import { User } from '../../db/entity/user.entity';
import { RoleEnum } from '../../enums/role.enum';
import {
  ILoginAccess,
  IRegistrationStatus
} from '../../interfaces/user.register_status.interface';
import httpMessages from '../../utils/httpMessages';
import { LoginDTO, UserCreateDTO } from './dto/user.dto';
import updateQueryForUser from './utils/updateQueryForUser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    @InjectRepository(OrderTracks)
    private readonly orderTraksEntity: Repository<OrderTracks>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async create(userDTO: UserCreateDTO): Promise<IRegistrationStatus> {
    try {
      // TODO удалить создание ролей ( нужно в тестовом формате )
      const { nickname, password, email, roles } = userDTO;
      const userHasInDb = await this.userEntity.findOne({
        where: { nickname }
      });
      if (userHasInDb) {
        throw new HttpException(
          httpMessages.userAvailable,
          HttpStatus.BAD_REQUEST
        );
      }
      const userSave: User = await this.userEntity.create({
        nickname,
        password,
        email,
        roles
      });
      await this.userEntity.save(userSave);

      // Создание взаимосвязи с таблицей порядка треков
      const identifyTrakIdsSave = await this.orderTraksEntity.create({
        order: [],
        user: userSave
      });
      await this.orderTraksEntity.save(identifyTrakIdsSave);

      const result = {
        success: true,
        message: httpMessages.userWasCreated,
        status: HttpStatus.OK
      };
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async authenticate(loginDTO: LoginDTO): Promise<ILoginAccess> {
    const { nickname, password } = loginDTO;
    const user: User = await this.userEntity.findOne({ where: { nickname } });
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
      // const { acknowledged } = this.userEntity.update({ where: { nickname: nickname} }, { password: hashPassword })
      const aaa = await this.userEntity
        .createQueryBuilder()
        .update({ password: hashPassword })
        .where({ nickname });
      const a = 1;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async addRole({ userId, role }) {
    const user = await this.userEntity.findOne(userId);
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
    await updateQueryForUser(User, { roles: modifyRoles }, userId);
    return { status: HttpStatus.OK, message: httpMessages.rolesUpdated };
  }

  async ban(userId) {
    const user = await this.userEntity.findOne(userId);
    const userIsAdmin = user.roles.includes(RoleEnum.Admin);
    if (!user) {
      throw new UnauthorizedException(httpMessages.userNotFound);
    }
    if (userIsAdmin) {
      throw new HttpException(httpMessages.userIsAdmin, HttpStatus.BAD_REQUEST);
    }

    await updateQueryForUser(User, { banned: true }, userId);
    return { status: HttpStatus.OK, message: httpMessages.userWasBanned };
  }
}
