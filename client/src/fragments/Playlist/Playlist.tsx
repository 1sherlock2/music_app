import React, { useCallback, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import PlaylistPopup from '../PlaylistPopup/PlaylistPopup';
import { allTraksByUser } from '../../store/index';
import s from './Playlist.scss';
import Img from '../../components/Img/Img';

const Playlist = () => {
  const allTracks = useRecoilValue(allTraksByUser);
  // const trackRefs: any = useRef(allTracks?.map(() => React.createRef()));
  const [generalIndexTrack, setTrackIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = useCallback((index: number) => {
    setTrackIndex(index);
    setOpen(true);
  }, []);

  return (
    <div className={s.playList}>
      {allTracks?.map((track, index) => {
        const { id, img, artist, name } = track;
        return (
          <div
            key={`${id}_${index}`}
            // ref={trackRefs.current[index]}
            className={s.container}
            onClick={() => handleClick(index)}
          >
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
      {open && !!allTracks.length && (
        <PlaylistPopup
          allTracks={allTracks}
          generalIndexTrack={generalIndexTrack}
          setOpen={setOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default Playlist;
