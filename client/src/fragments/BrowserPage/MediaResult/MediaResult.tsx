import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable
} from 'recoil';
import DownloadIcon from '../../../components/Icons/Download';
import ErrorIcon from '../../../components/Icons/Error';
import SuccessIcon from '../../../components/Icons/Success';
import Img from '../../../components/Img/Img';
import { Loader_1 } from '../../../loader/Loader_1';
import { altImageSrc } from '../../../store/altrImageSrc';
import {
  dataByUploadClick,
  linkText,
  queryDataLink,
  uploadFile
} from '../state';
import s from './MediaResult.scss';

const MediaResult = () => {
  const responseByLink = useRecoilValue(queryDataLink);
  const [dataByUpload, setDataByUpload] = useRecoilState(dataByUploadClick);
  const uploadStatus = useRecoilValueLoadable(uploadFile);
  console.log({ uploadStatus });
  console.log({ dataByUpload });
  if (!responseByLink) return null;

  // if (!!uploadStatus.contents.data?.success) {
  //   setDataByUpload('');
  // }

  const { id, duration, thumbnail, title, url } = responseByLink;
  const [name, artist] = title.split(' - ').reverse();

  const downloadByLink = (data) => () => {
    setDataByUpload(data);
  };

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
                {uploadStatus.state === 'hasValue' && !uploadStatus.contents ? (
                  <DownloadIcon
                    size="30px"
                    color="#333"
                    onClick={downloadByLink({
                      url: audioUrl,
                      image: thumbnail,
                      ext,
                      artist,
                      name
                    })}
                  />
                ) : !!uploadStatus.contents.data?.success ? (
                  <SuccessIcon size="30px" color="#3faa74" />
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
