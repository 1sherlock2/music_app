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
import classnames from 'classnames';
import { IAudioPayload, IPlaylistPopup } from './AudioPayload.interface';
import Img from '../../components/Img/Img';
import useClickOutside from '../../hooks/useClickOutside';
import useCombinedRef from '../../hooks/useCombinedRef';
import { useRecoilValue } from 'recoil';
import { getUrlTrackStream } from '../../store/index';
import { Events, LevelLoadedData } from 'hls.js';
import useHlsLoad from '../../hooks/useHlsLoad';
import numToFix from '../../utils/numToFix';
import LineAndNameAudio from './blocks/LineAndNameAudio/LineAndNameAudio';

const defaultTopPosition = 20;
const defaultLeftPosition = 0;

const AudioPayload: React.FC<IPlaylistPopup & IAudioPayload> = ({
  setOpen,
  open,
  goToPreviousTrack,
  goToNextTrack,
  trackIndex,
  currentTrack
}) => {
  const urlStream = useRecoilValue(getUrlTrackStream(currentTrack.id));
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [repeatAudioRef, setRepeatAudioRef] = useState(false);
  const [topPosition, setTopPosition] = useState<number>(defaultTopPosition);
  const [leftPosition, setLeftPosition] = useState<number>(defaultLeftPosition);
  const [borderStyle, setBorderStyle] = useState(false);

  // Аудиоконтроллер
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // Переменные для управление положением аудиоплеера
  const touchY = useRef<number>(0);
  const touchX = useRef<number>(0);
  const changePos = useRef({ x: 0, y: 0 });
  const differentValue = useRef<number>(30);

  // Переменные для анимирования при переключении
  const transformByCloseX = useRef<boolean>(false);
  // const transformByCloseY = useRef<boolean>(false);
  const [transformByCloseY, setTransformByCloseY] = useState<boolean>(false);

  // Переменные для управление воспроизведением
  const intervalRef = useRef<any>();

  const { artist, name, img } = useMemo(() => currentTrack, [currentTrack]);

  // Загрузка аудио с сервера cloudinary
  const hlsLoad = useHlsLoad(audioRef, urlStream);
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

  const containerRef = useClickOutside((): any => setOpen(false));
  const audioContainerRef = useRef(null);

  const handleTouchStart = (ev: TouchEvent) => {
    setBorderStyle(true);
    const { clientY, clientX } = ev.touches[0];
    touchY.current = clientY;
    touchX.current = clientX;
  };
  const handleTouchEnd = (ev: TouchEvent) => {
    setBorderStyle(false);
    const { clientX } = ev.changedTouches[0];
    changePos.current.x = clientX - touchX.current;

    if (changePos.current.x <= -differentValue.current) {
      transformByCloseX.current = true;
      setTimeout(() => {
        goToNextTrack();
      }, 500);
    } else if (
      changePos.current.x >= differentValue.current &&
      changePos.current.x !== 0
    ) {
      transformByCloseX.current = true;
      setTimeout(() => {
        goToPreviousTrack();
      }, 500);
    } else {
      setLeftPosition(defaultLeftPosition);
    }
  };

  const handleTouchEvent = (ev: TouchEvent) => {
    const { clientX } = ev.touches[0];
    changePos.current.x = clientX - touchX.current;

    // Установление значений для ограничения движения блока по вертикале
    if (Math.abs(numToFix(changePos.current.x, 2)) > differentValue.current) {
      setLeftPosition(
        Math.sign(changePos.current.x) > 0
          ? differentValue.current
          : -differentValue.current
      );
    } else {
      setLeftPosition(changePos.current.x);
    }
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

  const changeCurrentTime = useCallback(
    (value: number) => {
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

  // Действия по смене времени музыки
  const onScrubEnd = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }, [isPlaying]);

  useEffect(() => {
    // Воспроизведение трека при загрузки частей аудиофайла
    hlsLoad.startPlay(hlsStartPlayAudio);

    setLeftPosition(0);

    // Для появления следующего компонента при переключении
    transformByCloseX.current = false;
    return () => {
      setIsPlaying(false);
      hlsLoad.detachAudio();
    };
  }, [trackIndex, audioRef]);

  // Действия при проигрывании
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const changeTranslate = useMemo(
    () =>
      transformByCloseX.current
        ? changePos.current.x < 0
          ? '-100%'
          : '100%'
        : 0,
    [transformByCloseX.current, changePos.current.x]
  );

  return (
    <div className={classnames({ [s.outside]: open })}>
      <div
        className={s.container}
        style={{
          top: `${topPosition}px`,
          left: `${leftPosition}px`,
          transform: `translate(${changeTranslate}, ${
            transformByCloseY ? '100%' : 0
          })`,
          ...(borderStyle && {
            borderBottomLeftRadius: '7%',
            borderBottomRightRadius: '7%'
          })
        }}
        ref={useCombinedRef(containerRef, audioContainerRef)}
      >
        <div className={s.container_wrapper}>
          <LineAndNameAudio
            name={name}
            artist={artist}
            setTopPosition={setTopPosition}
            differentValue={differentValue.current}
            setTransformByCloseY={setTransformByCloseY}
            setOpen={setOpen}
          />
          <div
            className={s.container_wrapper_image}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchEvent}
          >
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
            setRepeatAudioRef={setRepeatAudioRef}
            repeatAudioRef={repeatAudioRef}
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
      </div>
    </div>
  );
};
const memoAudioPayload = React.memo(AudioPayload);
export default memoAudioPayload;
