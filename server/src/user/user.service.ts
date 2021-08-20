import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { User } from "src/db/entity/user.entity";
import { ILoginAccess, IRegistrationStatus } from "src/interfaces/user.register_status.interface";
import { UserCreateDTO } from "src/user/dto/userCreate.dto";
import httpMessages from "src/utils/httpMessages";
import { Repository } from "typeorm";
import { LoginDTO } from "./dto/login.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    private readonly jwtService: JwtService
    ) {}

    async create(userDTO: UserCreateDTO): Promise<IRegistrationStatus> {
      const { nickname, password, email, roles } = userDTO;
      const userHasInDb = await this.userEntity.findOne({ where: { nickname } })
      if (userHasInDb) {
        throw new HttpException(httpMessages.userAvailable, HttpStatus.BAD_REQUEST)
      }
      const userSave: User = await this.userEntity.create({ 
        nickname, password, email, roles
       })
      await this.userEntity.save(userSave);
       
       const result = { success: true, message: httpMessages.userWasCreated, status: HttpStatus.OK };
       console.log(result)
       return result;
    }
    async authenticate(loginDTO: LoginDTO): Promise<ILoginAccess> {
      const { nickname, password } = loginDTO;
      const user = await this.userEntity.findOne({ where: { nickname }})
      if (!user) {
        throw new HttpException(httpMessages.userIsNotCreated, HttpStatus.UNAUTHORIZED);
      }
      const passwordCompare = await compare(password, user.password)
      if (!passwordCompare) {
        throw new HttpException(httpMessages.passwordNotCompare, HttpStatus.UNAUTHORIZED)
      }
      const expiresIn = process.env.EXPIRESIN
      const accessToken = this.jwtService.sign(nickname, { secret: process.env.SECRET_KEY, algorithm: 'RS256'})
      return { expiresIn, accessToken };
    }
}