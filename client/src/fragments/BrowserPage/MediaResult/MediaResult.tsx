import React from 'react';
import { useRecoilValue } from 'recoil';
import Img from '../../../components/Img/Img';
import { altImageSrc } from '../../../store/altrImageSrc';
import DownloadedUrl from './DownloadedUrl/DownloadedUrl';
import s from './MediaResult.scss';
import { queryDataLink } from './state';

const MediaResult = () => {
  const responseByLink = useRecoilValue(queryDataLink);

  if (!responseByLink) return null;
  const { id, duration, thumbnail, title, url } = responseByLink;
  const [name, artist] = title.split(' - ').reverse();

  return (
    <div className={s.result}>
      <div className={s.result_info}>
        <Img src={thumbnail} altSrc={altImageSrc} />
        <span>{title}</span>
        <span>{duration}</span>
      </div>
      <div className={s.links}>
        {url?.length &&
          url.map(({ quality, audioCodec, url: audioUrl, ext }, index) => (
            <DownloadedUrl
              key={index}
              ext={ext}
              id={id}
              audioCodec={audioCodec}
              quality={quality}
              audioUrl={audioUrl}
              thumbnail={thumbnail}
              artist={artist}
              name={name}
            />
          ))}
      </div>
    </div>
  );
};
export default MediaResult;
