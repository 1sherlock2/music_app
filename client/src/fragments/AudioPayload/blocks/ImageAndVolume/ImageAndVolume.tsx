import React, { ChangeEventHandler } from 'react';
import Img from '../../../../components/Img/Img';
import { IChangeRange } from '../../AudioPayload.interface';
import { IImageAndVolumeProps } from './ImageAndVolume.interface';
import s from './ImageAndVolume.scss';

const ImageAndVolume: React.FC<IImageAndVolumeProps> = ({
  img,
  volume,
  setVolume
}) => {
  const changeVolume: IChangeRange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setVolume(Number(event.target.value));

  return (
    <div className={s.wrapper_img}>
      <div className={s.image}>
        <div className={s.image_title}>
          <Img
            src={img}
            altSrc="https://res.cloudinary.com/drypohi9s/image/upload/v1633723468/music_app/alt_src_img/audio-wave-svgrepo-com_trpgkx.svg"
          />
        </div>
      </div>
      <div className={s.volume}>
        <input type="range" value={volume} onChange={changeVolume} />
      </div>
      {/* <div style={{ 'word-wrap': 'break-word' }}>
        fdgioejrtg puwehnrgune rguiheuytvcbgo syfbrguoy
      </div> */}
    </div>
  );
};

export default ImageAndVolume;
