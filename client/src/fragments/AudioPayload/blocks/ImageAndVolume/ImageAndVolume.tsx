import React, { TouchEventHandler, useRef, useState } from 'react';
import Img from '../../../../components/Img/Img';
import { IChangeRange } from '../../AudioPayload.interface';
import { IImageAndVolumeProps } from './ImageAndVolume.interface';
import s from './ImageAndVolume.scss';

const ImageAndVolume: React.FC<IImageAndVolumeProps> = ({
  img,
  volume,
  setVolume
}) => {
  const [topPosition, setTopPosition] = useState<number>((1 - volume) * 100);
  // const [volumeLine, setVolumeLine] = useState<number>();
  const volumeRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const percentByVolume = (posY: number) => {
    const { top, bottom } =
      volumeRef.current?.getBoundingClientRect() as DOMRect;
    const currentPosThumb = posY > bottom ? bottom : posY < top ? top : posY;
    return Math.abs((currentPosThumb - top) / (bottom - top)) * 100;
  };
  const modifyPercentVolume = (percent: number) =>
    1 - Number(percent.toFixed(2)) / 100;
  const changeVolume = (event: React.TouchEvent<HTMLDivElement>) => {
    const { clientY } = event.touches[0];
    const percentThumb = percentByVolume(clientY);
    setTopPosition(percentThumb);
    setVolume(modifyPercentVolume(percentThumb));
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) =>
    changeVolume(event);
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    changeVolume(event);
    thumbRef.current?.classList.add(s.increase);
  };

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
      <div
        className={s.volume}
        ref={volumeRef}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={() => thumbRef.current?.classList.remove(s.increase)}
      >
        <div
          className={s.volume_track__progress}
          style={{ height: `${volume * 100}%` }}
        />
        <div
          className={s.volume_track__thumb}
          style={{ top: `${topPosition}%` }}
          ref={thumbRef}
        />
      </div>
    </div>
  );
};

export default ImageAndVolume;
