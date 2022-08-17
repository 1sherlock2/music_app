import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import Previous from '../../components/Icons/AudioPlayer/Previous';
import Play from '../../components/Icons/AudioPlayer/Play';
import classnames from 'classnames';
import Next from '../../components/Icons/AudioPlayer/Next';
import Repeat from '../../components/Icons/AudioPlayer/Repeat';
import Order from '../../components/Icons/AudioPlayer/Order';
import Pause from '../../components/Icons/AudioPlayer/Pause';
import s from './AudioPlayer.scss';
import { IAudioPayload, IRepeat } from '../AudioPayload/AudioPayload.interface';
import { IAudioPlayer } from './AudioPlayer.interface';

const width = '50px';
const height = '50px';
const repeatValue: IRepeat = {
  oneLoop: 'allLoop',
  allLoop: 'noLoop',
  noLoop: 'oneLoop'
};
const AudioPlayer = ({
  isPlaying,
  setIsPlaying,
  goToNextTrack,
  goToPreviousTrack,
  setRepeat,
  repeat
}: IAudioPayload & IAudioPlayer) => {
  const handleClickRep = (val: keyof IRepeat) => setRepeat(repeatValue[val]);

  return (
    <div className={s.audio_player}>
      <div
        className={s.audio_player_repeat}
        onClick={() => handleClickRep(repeat)}
      >
        <div>{repeat === 'allLoop' ? 1 : repeat === 'noLoop' ? 2 : 3}</div>
        {/* <Repeat color="#333" width="30" height="30" /> */}
        {/* {repeat && <i className={s.audio_player_repeat_icon}> 1 </i>} */}
      </div>
      <div className={s.audio_player_prev} onClick={goToPreviousTrack}>
        <Previous color="#333" width={width} height={height} />
      </div>
      <div
        className={s.audio_player_play}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {!isPlaying ? (
          <Play color="#333" width="60px" height="60px" />
        ) : (
          <Pause color="#333" width="60px" height="60px" />
        )}
      </div>
      <div className={s.audio_player_next} onClick={goToNextTrack}>
        <Next color="#333" width={width} height={height} />
      </div>
      <div className={s.audio_player_order}>
        <Order color="#333" width="30" height="30" />
      </div>
    </div>
  );
};

export default AudioPlayer;
