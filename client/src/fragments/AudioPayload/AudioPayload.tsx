import React, {
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import CurrentProgressTime from '../CurrentProgressTime/CurrentProgressTime';
import s from './AudioPayload.scss';
import { IAudioPayload, IPlaylistPopup } from './AudioPayload.interface';
import Img from '../../components/Img/Img';
import { useRecoilValue } from 'recoil';
import { getUrlTrackStream } from '../../store/index';
import { Events, LevelLoadedData } from 'hls.js';
import useHlsLoad from '../../hooks/useHlsLoad';
import LineAndNameAudio from './blocks/LineAndNameAudio/LineAndNameAudio';
import { useSwiperSlide } from 'swiper/react/swiper-react';

const AudioPayload: React.FC<IPlaylistPopup & IAudioPayload> = ({
  goToPreviousTrack,
  goToNextTrack,
  trackIndex,
  currentTrack,
  isChangeTrack,
  setRepeat,
  repeat
}) => {
  const swiperSlide = useSwiperSlide();
  if (!swiperSlide.isActive) return null;

  const urlStream = useRecoilValue(getUrlTrackStream(currentTrack.id));
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  // Аудиоконтроллер
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // Переменные для управление воспроизведением
  const intervalRef = useRef<any>();

  const { artist, name, img } = useMemo(() => currentTrack, [currentTrack]);

  // Загрузка аудио с сервера cloudinary
  const hlsLoad = useHlsLoad(audioRef, urlStream, swiperSlide.isActive);
  const hlsSetDuration = useCallback(
    (
      _e: Events.LEVEL_LOADED,
      { details: { totalduration } }: LevelLoadedData
    ) => setDuration(Math.floor((totalduration * 100) / 100)),
    []
  );
  // Установка длительности трека
  hlsLoad.hlsSetDuration(hlsSetDuration);
  const hlsStartPlayAudio = () => setIsPlaying(true);

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

  const changeCurrentTime = useCallback(
    (value: number): void => {
      if (isPlaying) {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
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

  return (
    <div className={s.wrapper}>
      <LineAndNameAudio name={name} artist={artist} />
      <div className={s.wrapper_image}>
        <div className={s.image_title}>
          <Img
            src={img}
            altSrc="https://res.cloudinary.com/drypohi9s/image/upload/v1633723468/music_app/alt_src_img/audio-wave-svgrepo-com_trpgkx.svg"
          />
        </div>
      </div>
      <AudioPlayer
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        goToNextTrack={goToNextTrack}
        goToPreviousTrack={goToPreviousTrack}
        setRepeat={setRepeat}
        repeat={repeat}
        ref={audioRef}
      />
      <CurrentProgressTime
        hlsLoad={hlsLoad}
        urlStream={urlStream}
        onScrubEnd={onScrubEnd}
        trackProgress={trackProgress}
        changeCurrentTime={changeCurrentTime}
        duration={duration}
      />
    </div>
  );
};
const memoAudioPayload = React.memo(AudioPayload);
export default memoAudioPayload;
