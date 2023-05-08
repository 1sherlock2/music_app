import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
import useClickOutside from '../../hooks/useClickOutside';
import useHlsLoad from '../../hooks/useHlsLoad';
import { getUrlTrackStream } from '../../store';
import AudioPayload from '../AudioPayload/AudioPayload';
import { Events, LevelLoadedData } from 'hls.js';
import { IRepeat } from '../AudioPayload/AudioPayload.interface';
import s from './PlaylistPopup.scss';
import { IPlaylistPopup } from './PlaylistPopup.interface';
import { repeatValue } from './constant';
import useCombinedRef from '../../hooks/useCombinedRef';

const PlaylistPopup: React.FC<IPlaylistPopup> = ({
  allTracks = [],
  generalIndexTrack,
  setOpen
}) => {
  const defaultTopPosition = 10;
  const [trackIndex, setTrackIndex] = useState<number>(generalIndexTrack || 0);
  const [repeat, setRepeat] = useState<keyof IRepeat>(repeatValue.oneLoop);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [blockSwipe, setBlockSwipe] = useState<boolean>(false);
  const [topPosition, setTopPosition] = useState<number>(defaultTopPosition);
  const [transformByCloseY, setTransformByCloseY] = useState<boolean>(false);
  const [fullHeight, setFullHeight] = useState<number>(0);
  const lastIndexTrack = allTracks.findIndex(
    (el) => el.id === allTracks[allTracks.length - 1].id
  );

  if (trackIndex > lastIndexTrack && repeat === repeatValue.allLoop) {
    return null;
  }

  const currentTrack = useMemo(
    () => allTracks[trackIndex],
    [allTracks, trackIndex]
  );
  if (!currentTrack?.audio) return null;
  const urlStream = useRecoilValue(getUrlTrackStream(currentTrack.id));

  // Аудиоконтроллер
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  audioRef.current.volume = volume;

  // Переменные для управление воспроизведением
  const intervalRef = useRef<any>();

  // Загрузка аудио с сервера cloudinary
  const hlsLoad = useHlsLoad(audioRef, urlStream);
  const hlsSetDuration = useCallback(
    (
      _e: Events.LEVEL_LOADED,
      { details: { totalduration } }: LevelLoadedData
    ) => setDuration(Math.floor((totalduration * 100) / 100)),
    []
  );

  const containerOutRef = useClickOutside(() => setOpen(false));
  const containerRef = useRef<HTMLDivElement>(null);

  // Следующий трек
  const goToNextTrack = useCallback(() => {
    if (lastIndexTrack === trackIndex) {
      setOpen(false);
      return;
    }
    setTrackIndex((prev) => ++prev);
  }, []);

  // Предыдущий трек
  const goToPreviousTrack = useCallback(
    () => setTrackIndex((prev) => --prev),
    []
  );

  // Изменение трека свайпом
  const changeTrackSwipe = useCallback(
    (swiper: { realIndex: React.SetStateAction<number> }) =>
      setTrackIndex(swiper.realIndex),
    []
  );

  const startTimer = (): void => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        goToNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 500);
  };

  const changeCurrentTime = useCallback(
    (time) => {
      if (isPlaying) {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(time);
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(time);
        setTrackProgress(audioRef.current.currentTime);
        setIsPlaying(true);
      }
    },
    [isPlaying]
  );

  const hlsStartPlayAudio = () => {
    setIsPlaying(true);
  };

  const handleClickRep = useCallback(() => {
    setRepeat(repeatValue[repeat]);
  }, [repeat]);

  useEffect(() => {
    const rootEl = document.getElementById('root');
    const firstChild = rootEl?.firstElementChild;
    firstChild?.classList.add(s.hidden);

    const { height } = containerRef.current?.getBoundingClientRect() as DOMRect;
    setFullHeight(height);

    const sliderWrapper = document.querySelector('.swiper-wrapper');
    sliderWrapper?.classList.add(s['swiper-wrapper']);
  }, []);

  // Установка длительности трека
  hlsLoad.hlsSetDuration(hlsSetDuration);

  useEffect(() => {
    // Воспроизведение трека при загрузки частей аудиофайла
    if (allTracks) {
      hlsLoad.startPlay(hlsStartPlayAudio);
      //? добавить логику повторения аудиолиста при перелистывании последнего трека
      if (trackIndex > allTracks.length) {
        setTrackIndex(0);
      }
    }
    return () => {
      setIsPlaying(false);
      hlsLoad.detachAudio();
    };
  }, [trackIndex]);

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
    (audioRef as React.MutableRefObject<{ loop: boolean }>).current.loop =
      repeat === repeatValue.noLoop ? true : false;
  }, [repeat]);

  useEffect(() => {
    if (transformByCloseY) {
      setTimeout(() => setOpen(false), 200);
    }
  }, [transformByCloseY]);

  const loopMode: boolean = useMemo(
    () => repeat === repeatValue.oneLoop,
    [repeat]
  );

  return createPortal(
    <div className={s.outside}>
      <div ref={containerRef} className={s.container}>
        <Swiper
          style={{
            top: `${topPosition}%`,
            transform: `translateY(${transformByCloseY ? 100 : 0}%)`
          }}
          className={s.swiper}
          spaceBetween={20}
          initialSlide={trackIndex}
          loop={loopMode}
          lazy
          watchSlidesProgress
          onSlideChange={changeTrackSwipe}
          onTouchMove={(swiper) => (swiper.allowTouchMove = !blockSwipe)}
          onTouchEnd={(swiper) => (swiper.allowTouchMove = !blockSwipe)}
        >
          {allTracks?.map((track, index) => (
            <div key={`${track.name}-${index}`}>
              <SwiperSlide key={`${track.name}-${index}`}>
                <div ref={containerOutRef}>
                  <AudioPayload
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    hlsLoad={hlsLoad}
                    trackProgress={trackProgress}
                    setBlockSwipe={setBlockSwipe}
                    duration={duration}
                    goToNextTrack={goToNextTrack}
                    goToPreviousTrack={goToPreviousTrack}
                    currentTrack={currentTrack}
                    handleClickRep={handleClickRep}
                    volume={volume}
                    setVolume={setVolume}
                    repeat={repeat}
                    changeCurrentTime={changeCurrentTime}
                    defaultTopPosition={defaultTopPosition}
                    setTopPosition={setTopPosition}
                    setTransformByCloseY={setTransformByCloseY}
                    fullHeight={fullHeight}
                  />
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>,
    document.body
  );
};

export default PlaylistPopup;
