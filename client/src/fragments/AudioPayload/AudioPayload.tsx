import React, { TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import CurrentProgressTime from '../CurrentProgressTime/CurrentProgressTime';
import s from './AudioPayload.scss';
import classnames from 'classnames';
import {
  IAudioPayload,
  IDurationTarget,
  ITouchY
} from './AudioPayload.interface';
import Img from '../../components/Img/Img';
import useClickOutside from '../../hooks/useClickOutside';

const AudioPayload: React.FC<IAudioPayload> = ({
  setOpen,
  open,
  trackIndex,
  goToPreviousTrack,
  goToNextTrack,
  currentTrack
}) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [repeatAudioRef, setRepeatAudioRef] = useState(false);
  const [touchY, setTouchY] = useState<ITouchY>({});

  const { artist, name, audio, img } = useMemo(
    () => currentTrack,
    [currentTrack]
  );

  // audio prepare
  const audioRef = useRef<HTMLAudioElement>(new Audio(audio));
  const intervalRef = useRef<any>();
  const isReady = useRef(false);

  const containerRef = useClickOutside((): any => setOpen(false));

  const currentPercent = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = {
    backgroundImage: `linear-gradient(to top, #fdcbf1 ${currentPercent}, #fdcbf1 1%, #e6dee9 100%)`
  };

  // события свертывания плеера
  const handleTouchStart = (ev: TouchEvent) => {
    const { clientY } = ev.touches[0];
    setTouchY({ ...touchY, startY: clientY });
  };

  const handleTouchEnd = (ev: TouchEvent) => {
    const { clientY } = ev.changedTouches[0];
    setTouchY({ ...touchY, endY: clientY });
  };

  useEffect(() => {
    const { startY, endY } = touchY;
    if (!startY || !endY) {
      return undefined;
    }
    const changePosY = endY - startY;
    if (changePosY >= 40) {
      setOpen(false);
    }
    return () => setTouchY({});
  }, [touchY]);

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

  console.log('audioRef', audioRef);

  //  Действия с текущей музыкой при переключении
  useEffect(() => {
    const loadMetaDataHandler = (e: IDurationTarget): void => {
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
    <div className={classnames({ [s.outside]: open })}>
      <div
        className={s.container}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={s.container_wrapper}>
          <div className={s.container_line} />
          <div
            className={s.container_wrapper_title}
          >{`${name} - ${artist}`}</div>
          <div className={s.container_wrapper_image}>
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
            onScrubEnd={onScrubEnd}
            trackProgress={trackProgress}
            trackStyling={trackStyling}
            changeCurrentTime={changeCurrentTime}
            duration={duration}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPayload;
