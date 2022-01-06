import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { OrderTracks } from 'src/db/entity/orderTracks.entity';
import { Track } from 'src/db/entity/track.entity';
import { User } from 'src/db/entity/user.entity';
import {
  ILoginAccess,
  IRegistrationStatus
} from 'src/interfaces/user.register_status.interface';
import { UserCreateDTO } from 'src/user/dto/userCreate.dto';
import httpMessages from 'src/utils/httpMessages';
import { Repository } from 'typeorm';
import { IJwtValidate } from './dto/jwtStrategy.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    @InjectRepository(OrderTracks)
    private readonly orderTraksEntity: Repository<OrderTracks>,
    private jwtService: JwtService
  ) {}

  async create(userDTO: UserCreateDTO): Promise<IRegistrationStatus> {
    try {
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
}
