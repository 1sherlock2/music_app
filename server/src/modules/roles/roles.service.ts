import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../db/entity/roles/roles.entity';
import httpMessages from '../../utils/httpMessages';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesEntity: Repository<RoleEntity>
  ) {}
  async createRole(dto) {
    try {
      const { role } = dto;
      const rolesAvailable = await this.rolesEntity.findOne({
        where: { role }
      });
      if (rolesAvailable) {
        throw new HttpException(
          httpMessages.rolesAvailable,
          HttpStatus.BAD_REQUEST
        );
      }
      const rolesPayload = await this.rolesEntity.create(dto);
      await this.rolesEntity.save(rolesPayload);

      return { status: HttpStatus.OK, message: httpMessages.rolesCreated };
    } catch (e) {
      throw new HttpException(
        httpMessages.rolesExeption,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
