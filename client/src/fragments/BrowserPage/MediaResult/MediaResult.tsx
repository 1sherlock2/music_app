import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import DownloadIcon from '../../../components/Icons/Download';
import ErrorIcon from '../../../components/Icons/Error';
import Img from '../../../components/Img/Img';
import { Loader_1 } from '../../../loader/Loader_1';
import { altImageSrc } from '../../../store/altrImageSrc';
import { queryDataLink, uploadFile } from '../state';
import s from './MediaResult.scss';

const MediaResult = () => {
  const responseByLink = useRecoilValue(queryDataLink);
  const [dataByUpload, setDataByUpload] = useState(null);
  const uploadStatus = useRecoilValueLoadable(uploadFile(dataByUpload));
  console.log({ dataByUpload });
  console.log('uploadStatus', uploadStatus.contents);
  if (!responseByLink) return null;

  if (!!uploadStatus.contents.data?.success) {
    console.log('null');
    setDataByUpload(null);
  }

  const { id, duration, thumbnail, title, url } = responseByLink;

  const downloadByLink = (data) => () => setDataByUpload(data);

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
                {uploadStatus.state === 'hasValue' ? (
                  <DownloadIcon
                    size="30px"
                    color="#333"
                    onClick={downloadByLink({
                      url: audioUrl,
                      image: thumbnail,
                      title,
                      ext,
                      ...(responseByLink.artist && {
                        artist: responseByLink.artist
                      }),
                      ...(responseByLink.name && { name: responseByLink.name })
                    })}
                  />
                ) : uploadStatus.state === 'loading' ? (
                  <Loader_1 className={s.loader} />
                ) : (
                  <ErrorIcon size="30px" />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MediaResult;
