import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/db/entity/roles/roles.entity';
import httpMessages from 'src/utils/httpMessages';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesEntity: Repository<Role>
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
