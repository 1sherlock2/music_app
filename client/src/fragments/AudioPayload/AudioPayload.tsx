import React, { useMemo } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import CurrentProgressTime from '../CurrentProgressTime/CurrentProgressTime';
import s from './AudioPayload.scss';
import { IAudioPayload } from './AudioPayload.interface';
import Img from '../../components/Img/Img';
import LineAndNameAudio from './blocks/LineAndNameAudio/LineAndNameAudio';
import { useSwiperSlide } from 'swiper/react/swiper-react';

const AudioPayload: React.FC<IAudioPayload> = ({
  isPlaying,
  setIsPlaying,
  hlsLoad,
  onScrubEnd,
  trackProgress,
  changeCurrentTime,
  duration,
  goToNextTrack,
  goToPreviousTrack,
  currentTrack,
  setRepeat,
  repeat
}) => {
  const swiperSlide = useSwiperSlide();
  if (!swiperSlide.isActive) return null;

  const { artist, name, img } = useMemo(() => currentTrack, [currentTrack]);

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
      />
      <CurrentProgressTime
        hlsLoad={hlsLoad}
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
