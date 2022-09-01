import React, { useMemo } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import CurrentProgressTime from '../CurrentProgressTime/CurrentProgressTime';
import { IAudioPayload } from './AudioPayload.interface';
import LineAndNameAudio from './blocks/LineAndNameAudio/LineAndNameAudio';
import { useSwiperSlide } from 'swiper/react/swiper-react';
import ImageAndVolume from './blocks/ImageAndVolume/ImageAndVolume';
import s from './AudioPayload.scss';

const AudioPayload: React.FC<IAudioPayload> = ({
  isPlaying,
  setIsPlaying,
  hlsLoad,
  trackProgress,
  setBlockSwipe,
  duration,
  goToNextTrack,
  goToPreviousTrack,
  currentTrack,
  handleClickRep,
  volume,
  setVolume,
  repeat,
  changeCurrentTime
}) => {
  const swiperSlide = useSwiperSlide();
  if (!swiperSlide.isActive) return null;

  const { artist, name, img } = useMemo(() => currentTrack, [currentTrack]);

  return (
    <div className={s.wrapper}>
      <LineAndNameAudio name={name} artist={artist} />
      <ImageAndVolume img={img} volume={volume} setVolume={setVolume} />
      <AudioPlayer
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        goToNextTrack={goToNextTrack}
        goToPreviousTrack={goToPreviousTrack}
        handleClickRep={handleClickRep}
        repeat={repeat}
      />
      <CurrentProgressTime
        hlsLoad={hlsLoad}
        trackProgress={trackProgress}
        setBlockSwipe={setBlockSwipe}
        duration={duration}
        changeCurrentTime={changeCurrentTime}
      />
    </div>
  );
};
const memoAudioPayload = React.memo(AudioPayload);
export default memoAudioPayload;
