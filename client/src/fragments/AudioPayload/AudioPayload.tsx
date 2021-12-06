import React, { TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import CurrentProgressTime from '../CurrentProgressTime/CurrentProgressTime';
import s from './AudioPayload.scss';
import classnames from 'classnames';
import {
  IAudioPayload,
  IDurationTarget,
  IPlaylistPopup
} from './AudioPayload.interface';
import Img from '../../components/Img/Img';
import useClickOutside from '../../hooks/useClickOutside';
import useCombinedRef from '../../hooks/useCombinedRef';
import useGetAudioUrl from '../../hooks/useGetAudioUrl';
import { useRecoilValue } from 'recoil';
import { getUrlTrackStream } from '../../store/index';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [repeatAudioRef, setRepeatAudioRef] = useState(false);
  const [topPosition, setTopPosition] = useState(60);
  const [leftPosition, setLeftPosition] = useState(0);
  const [borderStyle, setBorderStyle] = useState(false);
  const intervalValueByClose = useRef<number>(0.2);
  const [transformByCloseY, setTranformByCloseY] = useState(false);
  const [transformByCloseX, setTranformByCloseX] = useState(false);
  const touchY = useRef<number>(0);
  const touchX = useRef<number>(0);
  const changePos = useRef({ x: 0, y: 0 });
  const differentValue = useRef<number>(150);
  const urlAudio = useRef<string>(null);

  // useEffect(() => {
  //   urlAudio.current = useGetAudioUrl();
  // }, [])

  const { artist, name, audio, img } = useMemo(
    () => currentTrack,
    [currentTrack]
  );

  // audio prepare
  const audioRef = useRef<HTMLAudioElement>(new Audio(urlStream));
  const intervalRef = useRef<any>();
  const isReady = useRef(false);

  const containerRef = useClickOutside((): any => setOpen(false));
  const audioContainerRef = useRef(null);

  const currentPercent = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = {
    backgroundImage: `linear-gradient(to top, #fdcbf1 ${currentPercent}, #fdcbf1 1%, #e6dee9 100%)`
  };

  const handleTouchStart = (ev: TouchEvent) => {
    setBorderStyle(true);
    const { clientY, clientX } = ev.touches[0];
    touchY.current = clientY;
    touchX.current = clientX;
  };
  const handleTouchEnd = (ev: TouchEvent) => {
    setBorderStyle(false);
    const { clientY, clientX } = ev.changedTouches[0];
    changePos.current.y = clientY - touchY.current;
    changePos.current.x = clientX - touchX.current;
    if (changePos.current.y >= differentValue.current) {
      setTranformByCloseY(true);
      setTimeout(() => {
        setOpen(false);
      }, intervalValueByClose.current * 1000);
    } else if (changePos.current.x <= -differentValue.current) {
      setTranformByCloseX(true);
      setTimeout(() => {
        setOpen(false);
        // goToNextTrack();
      }, intervalValueByClose.current * 1000);
    } else if (
      changePos.current.x >= differentValue.current &&
      changePos.current.x !== 0
    ) {
      setTranformByCloseX(true);
      setTimeout(() => {
        setOpen(false);
        // goToPreviousTrack();
      }, intervalValueByClose.current * 1000);
    } else {
      setTopPosition(60);
      setLeftPosition(0);
    }
  };

  console.log('changePos', changePos.current.x);
  const handleTouchEvent = (ev: TouchEvent) => {
    const { clientX, clientY } = ev.touches[0];
    changePos.current.y = clientY - touchY.current;
    changePos.current.x = clientX - touchX.current;
    setTopPosition(changePos.current.y);
    setLeftPosition(changePos.current.x);
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
    audioRef.current = new Audio(urlStream);
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
      setTopPosition;
    };
  }, [audioRef, trackIndex]);

  return (
    <div className={classnames({ [s.outside]: open })}>
      <div
        className={s.container}
        style={{
          top: `${topPosition}px`,
          left: `${leftPosition}px`,
          transform: `translate(${
            transformByCloseX
              ? changePos.current.x < 0
                ? '-700px'
                : '700px'
              : 0
          }, ${transformByCloseY ? '700px' : 0})`,
          transition: `transform ${intervalValueByClose.current}s`,
          ...(borderStyle && {
            'border-bottom-left-radius': '7%',
            'border-bottom-right-radius': '7%'
          })
        }}
        ref={useCombinedRef(containerRef, audioContainerRef)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEvent}
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
const memoAudioPayload = React.memo(AudioPayload);
export default memoAudioPayload;
