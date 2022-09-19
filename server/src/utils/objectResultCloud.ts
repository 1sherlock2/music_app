import { HttpException, HttpStatus } from '@nestjs/common';
import {
  IResultCloudinary,
  IUploadStatus
} from '../modules/track/interfaces/track.interface';
import httpMessages from './httpMessages';

export default (resUploadFiles) =>
  resUploadFiles.reduce((acc: IResultCloudinary, response: IUploadStatus) => {
    const { success, audioHlsUrl, imgUrl } = response;
    if (!success) {
      throw new HttpException(
        httpMessages.errorUpladAudioInCloud,
        HttpStatus.BAD_GATEWAY
      );
    }

    if (imgUrl) acc.cloudinaryImg = imgUrl;
    if (audioHlsUrl) acc.cloudinaryAudio = audioHlsUrl;
    return acc;
  }, {});
