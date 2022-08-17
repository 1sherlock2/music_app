import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lazy, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.scss';
import useClickOutside from '../../hooks/useClickOutside';
import AudioPayload from '../AudioPayload/AudioPayload';
import {
  IPlaylistPopup,
  IRepeat
} from '../AudioPayload/AudioPayload.interface';
import s from './PlaylistPopup.scss';

const PlaylistPopup: React.FC<IPlaylistPopup> = ({
  allTracks,
  generalIndexTrack,
  setOpen,
  open
}) => {
  const [trackIndex, setTrackIndex] = useState<number>(generalIndexTrack || 0);
  const [isChangeTrack, setIsChangeTrack] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<keyof IRepeat>('allLoop');

  const currentTrack = useMemo(
    () => allTracks && allTracks[trackIndex],
    [allTracks, trackIndex]
  );
  const containerRef = useClickOutside(() => setOpen(false));

  useEffect(() => {
    const rootEl = document.getElementById('root');
    const firstChild = rootEl?.firstElementChild;
    firstChild?.classList.add(s.hidden);
  }, []);

  // Следующий трек
  const goToNextTrack = useCallback(() => setTrackIndex((prev) => ++prev), []);

  // Предыдущий трек
  const goToPreviousTrack = useCallback(
    () => setTrackIndex((prev) => --prev),
    []
  );

  // Действия при начальной инициализации свайпера
  // const initSwiper = (swiper) => {
  //   console.log('init', swiper);
  // };

  console.log({ trackIndex });
  // Изменение трека свайпом
  const changeTrackSwipe = useCallback(
    (swiper: { activeIndex: React.SetStateAction<number> }) => {
      setIsChangeTrack(true);
      setTrackIndex((swiper.activeIndex as number) - 1);
      console.log(`activeIndex`, swiper.activeIndex);
    },
    []
  );

  useEffect(() => {
    setIsChangeTrack(false);
    if (allTracks) {
      //? добавить логику повторения аудиолиста при перелистывании последнего трека
      if (trackIndex > allTracks.length) {
        setTrackIndex(0);
      }
      if (trackIndex < 0) {
        setTrackIndex(allTracks.length - 1);
      }
    }
  }, [trackIndex]);

  if (!currentTrack?.audio) return null;

  return createPortal(
    <div className={s.outside}>
      <div ref={containerRef}>
        <Swiper
          className={s.swiper}
          spaceBetween={20}
          // onInit={initSwiper}
          initialSlide={trackIndex}
          onSlideChange={changeTrackSwipe}
          loop={repeat === 'allLoop'}
          lazy
          modules={[Lazy]}
        >
          {allTracks?.map((track, index) => (
            <SwiperSlide
              key={`${track.name}-${index}`}
              virtualIndex={trackIndex}
            >
              <AudioPayload
                setOpen={setOpen}
                open={open}
                isChangeTrack={isChangeTrack}
                goToNextTrack={goToNextTrack}
                goToPreviousTrack={goToPreviousTrack}
                trackIndex={trackIndex}
                currentTrack={currentTrack}
                setRepeat={setRepeat}
                repeat={repeat}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>,
    document.body
  );
};

export default PlaylistPopup;
