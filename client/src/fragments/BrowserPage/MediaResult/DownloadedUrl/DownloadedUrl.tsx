import React, { useEffect, useState } from 'react';
import DownloadIcon from '../../../../components/Icons/Download';
import ErrorIcon from '../../../../components/Icons/Error';
import SuccessIcon from '../../../../components/Icons/Success';
import usePrevious from '../../../../hooks/usePrevious';
import { Loader_1 } from '../../../../loader/Loader_1';
import { dataByLinkDB, uploadFileByLinkDB } from '../../../../store/queries';
import { IAudioURL } from '../MediaResult.interface';
import { IDataByQuery, IDownloadedUrl } from './DownloadedUrl.interface';
import s from './DownloadedUrl.scss';

const DownloadedUrl: React.FC<IDownloadedUrl> = ({
  ext,
  id,
  audioCodec,
  quality,
  audioUrl,
  thumbnail,
  artist,
  name
}) => {
  const prevAudioUrl = usePrevious(audioUrl);
  const [uploadStatus, setUploadStatus] = useState('');
  const [dataByQuery, setDataByQuery] = useState<IDataByQuery>();
  const downloadByLink = (data: IDataByQuery) => () => {
    setDataByQuery(data);
  };
  useEffect(() => {
    if (!dataByQuery) return;
    (async () => {
      setUploadStatus('loading');
      const response = await uploadFileByLinkDB(dataByQuery).catch((e) => {
        if (!!e) {
          setUploadStatus('error');
        }
      });
      if (!!response?.data?.success) {
        setUploadStatus('success');
      }
    })();
  }, [dataByQuery]);

  useEffect(() => {
    if (prevAudioUrl !== audioUrl) {
      setUploadStatus('');
    }
  }, [audioUrl]);

  return (
    <div className={s.links_item} key={`${ext}_${id}`}>
      <div className={s.links_item__quality}>{`${quality} kb/s`}</div>
      <div className={s.links_item__codec}>{audioCodec}</div>
      <div className={s.links_item__url}>
        {!uploadStatus ? (
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
        ) : uploadStatus === 'success' ? (
          <SuccessIcon size="30px" color="#3faa74" />
        ) : uploadStatus === 'loading' ? (
          <Loader_1 className={s.loader} />
        ) : (
          uploadStatus === 'error' && <ErrorIcon size="30px" />
        )}
      </div>
    </div>
  );
};

export default DownloadedUrl;
