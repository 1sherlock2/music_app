import React, { useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import DownloadIcon from '../../../components/Icons/Download';
import Img from '../../../components/Img/Img';
import { altImageSrc } from '../../../store/altrImageSrc';
import { queryDataLink, uploadFile } from '../state';
import s from './MediaResult.scss';

const MediaResult = () => {
  const responseByLink = useRecoilValue(queryDataLink);
  const [dataByUpload, setDataByUpload] = useState(null);
  const uploadStatus = useRecoilValueLoadable(uploadFile(dataByUpload));
  if (!responseByLink) return null;

  const { id, duration, thumbnail, title, url } = responseByLink;

  const downloadByLink = (data) => setDataByUpload(data);
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
            <div className={s.links_item} key={`${ext}_${index}_${id}`}>
              <div className={s.links_item__quality}>{`${quality} kb/s`}</div>
              <div className={s.links_item__codec}>{audioCodec}</div>
              <div className={s.links_item__url}>
                <DownloadIcon
                  size="30px"
                  color="#333"
                  onClick={() =>
                    downloadByLink({
                      url: audioUrl,
                      image: thumbnail,
                      title,
                      ext,
                      ...(responseByLink.artist && {
                        artist: responseByLink.artist
                      }),
                      ...(responseByLink.name && { name: responseByLink.name })
                    })
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MediaResult;
