import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Visibility from '../../components/Icons/Visibility/Visibility';
import DefaultTrackImg from '../../components/Icons/DefaultTrackImg/DefaultTrackImg';
import { allTraksByUser } from '../../store/index';
import s from './Playlist.scss';
import Img from '../../components/Img/Img';

const Playlist = () => {
  const allTracks = useRecoilValue(allTraksByUser);
  const [imgLoad, setImgLoad] = useState(false);

  return (
    <div className={s.playList}>
      {allTracks?.map((track, index) => {
        const { id, img, artist, name } = track;
        return (
          <div key={`${id}_${index}`} className={s.container}>
            <div className={s.container_img}>
              <Img
                src={img}
                altSrc="https://res.cloudinary.com/drypohi9s/image/upload/v1633723468/music_app/alt_src_img/audio-wave-svgrepo-com_trpgkx.svg"
              />
            </div>
            <div className={s.container_track}>
              <div className={s.container_track__name}>{name}</div>
              <div className={s.container_track__author}>{artist}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
