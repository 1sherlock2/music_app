import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Lazy, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.scss';
import useClickOutside from '../../hooks/useClickOutside';
import useHlsLoad from '../../hooks/useHlsLoad';
import { getUrlTrackStream } from '../../store';
import AudioPayload from '../AudioPayload/AudioPayload';
import { Events, LevelLoadedData } from 'hls.js';
import {
  IchangeCurrentTime,
  IRepeat
} from '../AudioPayload/AudioPayload.interface';
import s from './PlaylistPopup.scss';
import { IPlaylistPopup } from './PlaylistPopup.interface';

const PlaylistPopup: React.FC<IPlaylistPopup> = ({
  allTracks,
  generalIndexTrack,
  setOpen
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

  //!
  const urlStream = useRecoilValue(getUrlTrackStream(currentTrack.id));
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  // Аудиоконтроллер
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // Переменные для управление воспроизведением
  const intervalRef = useRef<any>();

  // Загрузка аудио с сервера cloudinary
  const hlsLoad = useHlsLoad(audioRef, urlStream);
  const hlsSetDuration = useCallback(
    (
      _e: Events.LEVEL_LOADED,
      { details: { totalduration } }: LevelLoadedData
    ) => {
      setDuration(Math.floor((totalduration * 100) / 100));
    },
    []
  );
  // Установка длительности трека
  hlsLoad.hlsSetDuration(hlsSetDuration);
  const hlsStartPlayAudio = () => {
    setIsPlaying(true);
  };

  const startTimer = (): void => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        goToNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const changeCurrentTime: IchangeCurrentTime = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isPlaying) {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(event.target.value);
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(event.target.value);
        setTrackProgress(audioRef.current.currentTime);
        setIsPlaying(true);
      }
    },
    [isPlaying]
  );

  // Действия по смене времени трека
  const onScrubEnd = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }, [isPlaying]);

  // Смена трека
  useEffect(() => {
    // Воспроизведение трека при загрузки частей аудиофайла
    hlsLoad.startPlay(hlsStartPlayAudio);
    if (isChangeTrack) {
      setIsPlaying(false); // audioRef.current = false
      hlsLoad.detachAudio();
    }
    return () => {
      setIsPlaying(false); // audioRef.current = false
      hlsLoad.detachAudio();
    };
  }, [trackIndex, audioRef.current, isChangeTrack]);

  // Действия при проигрывании (остановка и воспроизведение трека)
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (repeat === 'oneLoop') {
      (audioRef as React.MutableRefObject<{ loop: boolean }>).current.loop =
        true;
    } else {
      (audioRef as React.MutableRefObject<{ loop: boolean }>).current.loop =
        false;
    }
  }, [repeat]);

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
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                hlsLoad={hlsLoad}
                onScrubEnd={onScrubEnd}
                trackProgress={trackProgress}
                changeCurrentTime={changeCurrentTime}
                duration={duration}
                goToNextTrack={goToNextTrack}
                goToPreviousTrack={goToPreviousTrack}
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
