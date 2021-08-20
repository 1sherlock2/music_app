import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/db/entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: process.env.SECRET_KEY
  })],
  providers: [UserService],
  controllers: [UserController],
  // exports: [PassportModule]
})
export class UserModule {}