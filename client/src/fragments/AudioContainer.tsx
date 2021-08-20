import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import CurrentProgressTime from './CurrentProgressTime/CurrentProgressTime';
import s from './AudioContainer.scss';
import { IAppContainer, IintervalRef, IDurationTarget } from './AudioContainer.interface';

const AudioContainer: React.FC<IAppContainer> = ({ musics }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [repeatAudioRef, setRepeatAudioRef] = useState(false);

  const { title, audio, artist, img, color } = musics[trackIndex];

  // audio prepare
  const audioRef = useRef<HTMLAudioElement>(new Audio(audio));
  const intervalRef = useRef<NodeJS.Timer>();
  const isReady = useRef(false);

  const currentPercent = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = {
    backgroundImage: `linear-gradient(to top, #fdcbf1 ${currentPercent}, #fdcbf1 1%, #e6dee9 100%)`,
  };

  const startTimer = (): void => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        goToNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const changeCurrentTime = (value: number) => {
    if (isPlaying) {
      // function clearInterval(intervalId: NodeJS.Timeout): void;
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current.currentTime);
      setIsPlaying(true);
    }
  };

  // Действия по смене времени музыки
  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };
  // Следующий трек
  const goToNextTrack = () => {
    if (trackIndex >= musics.length - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex + 1);
    }
  };
  // Предыдущий трек
  const goToPreviousTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(musics.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  // Действия при проигрывании
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  //  Действия при смене музыки
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audio);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Установление isReady для след перехода и автоматического старта музыки
      isReady.current = true;
    }
  }, [trackIndex]);

  //  Действия с текущей музыкой при переключении
  useEffect(() => {
    const loadMetaDataHandler = (e: IDurationTarget) => {
        setDuration(e.target.duration);
      };
    audioRef.current.addEventListener('loadedmetadata', loadMetaDataHandler);
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      audioRef.current.removeEventListener(
        'loadedmetadata',
        loadMetaDataHandler
      );
    };
  }, [audioRef, trackIndex]);
  return (
    <div className={s.container}>
      <div className={s.container_wrapper}>
        <div className={s.container_wrapper_title}>{title}</div>
        <div
          className={s.container_wrapper_image}
          style={{ backgroundColor: color }}
        >
          <div className={s.image_title}>
            <img src={img} alt={`${title}_${artist}`} />
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
          onScrubEnd={onScrubEnd}
          trackProgress={trackProgress}
          trackStyling={trackStyling}
          changeCurrentTime={changeCurrentTime}
          duration={duration}
        />
      </div>
    </div>
  );
};

export default AudioContainer;
