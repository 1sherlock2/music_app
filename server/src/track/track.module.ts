import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Track } from "../db/entity/track.entity";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
