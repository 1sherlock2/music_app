import React from 'react';
import Previous from '../../components/Icons/AudioPlayer/Previous';
import Play from '../../components/Icons/AudioPlayer/Play';
import Next from '../../components/Icons/AudioPlayer/Next';
import Order from '../../components/Icons/AudioPlayer/Order';
import Pause from '../../components/Icons/AudioPlayer/Pause';
import s from './AudioPlayer.scss';
import { IRepeat } from '../AudioPayload/AudioPayload.interface';
import { IAudioPlayer } from './AudioPlayer.interface';
import { repeatValue } from '../PlaylistPopup/constant';
import RepeateOne from '../../components/Icons/AudioPlayer/RepeateOne';
import Repeat from '../../components/Icons/AudioPlayer/Repeat';

const AudioPlayer = ({
  isPlaying,
  setIsPlaying,
  goToNextTrack,
  goToPreviousTrack,
  handleClickRep,
  repeat
}: IAudioPlayer) => {
  const size = '50px';
  return (
    <div className={s.audio_player}>
      <div className={s.audio_player_repeat} onClick={handleClickRep}>
        <div>
          {repeat === 'allLoop' ? (
            <Repeat color="#333" size="30px" />
          ) : repeat === 'noLoop' ? (
            <Repeat color="#6F6F6F" size="30px" />
          ) : (
            <RepeateOne color="#333" size="30px" />
          )}
        </div>
      </div>
      <div className={s.audio_player_prev} onClick={goToPreviousTrack}>
        <Previous color="#333" size={size} />
      </div>
      <div
        className={s.audio_player_play}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {!isPlaying ? (
          <Play color="#333" size="60px" />
        ) : (
          <Pause color="#333" size="60px" />
        )}
      </div>
      <div className={s.audio_player_next} onClick={goToNextTrack}>
        <Next color="#333" size={size} />
      </div>
      <div className={s.audio_player_order}>
        <Order color="#333" size="30px" />
      </div>
    </div>
  );
};

export default AudioPlayer;
