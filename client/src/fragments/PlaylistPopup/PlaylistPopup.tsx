import React, {
  ChangeEventHandler,
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
import { IChangeRange, IRepeat } from '../AudioPayload/AudioPayload.interface';
import s from './PlaylistPopup.scss';
import { IPlaylistPopup } from './PlaylistPopup.interface';
import { repeatValue } from './constant';
import useCombinedRef from '../../hooks/useCombinedRef';

const PlaylistPopup: React.FC<IPlaylistPopup> = ({
  allTracks = [],
  generalIndexTrack,
  setOpen
}) => {
  const [trackIndex, setTrackIndex] = useState<number>(generalIndexTrack || 0);
  const [repeat, setRepeat] = useState<keyof IRepeat>(repeatValue.allLoop);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
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
    ) => {
      setDuration(Math.floor((totalduration * 100) / 100));
    },
    []
  );

  const containerRef = useClickOutside(() => setOpen(false));

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
    }, 1000);
  };

  const changeCurrentTime: IChangeRange = useCallback(
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
      setIsPlaying(false); // audioRef.current = false
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

  const loopMode: boolean = useMemo(
    () => repeat === repeatValue.oneLoop,
    [repeat]
  );

  // console.log({ repeat });
  // console.log('loop', audioRef.current.loop);

  return createPortal(
    <div className={s.outside}>
      <div ref={containerRef}>
        <Swiper
          className={s.swiper}
          spaceBetween={20}
          // onInit={initSwiper}
          initialSlide={trackIndex}
          onSlideChange={changeTrackSwipe}
          loop={loopMode}
          lazy
          modules={[Lazy]}
        >
          {allTracks?.map((track, index) => (
            <SwiperSlide key={`${track.name}-${index}`}>
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
                handleClickRep={handleClickRep}
                volume={volume}
                setVolume={setVolume}
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
