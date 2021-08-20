import React, { forwardRef, useEffect, useState } from 'react';
import Previous from '../../components/Icons/AudioPlayer/Previous';
import Play from '../../components/Icons/AudioPlayer/Play';
import classnames from 'classnames';
import Next from '../../components/Icons/AudioPlayer/Next';
import Repeat from '../../components/Icons/AudioPlayer/Repeat';
import Order from '../../components/Icons/AudioPlayer/Order';
import Pause from '../../components/Icons/AudioPlayer/Pause';
import s from './AudioPlayer.scss';


const AudioPlayer = forwardRef(
  ({ isPlaying, setIsPlaying, goToNextTrack, goToPreviousTrack }, ref) => {
    const [isRepeat, setIsRepeat] = useState(ref.current.loop);

    useEffect(() => {
      ref.current.loop = isRepeat;
    }, [isRepeat]);

    const width = '50px';
    const height = '50px';
    const [nextTrackStyle, setNextTrackStyle] = useState(false);
    const nextClickStyle = nextTrackStyle ? s.nextStyleTrack : '';

    const [playTrackStyle, setPlayTrackStyle] = useState(false);
    const playClickStyle = playTrackStyle ? s.playStyleTrack : '';

    const [previousTrackStyle, setPreviuosTrackStyle] = useState(false);
    const previuosClickStyle = previousTrackStyle ? s.previousStyleTrack : '';

    return (
      <div className={s.audio_player}>
        <div
          className={s.audio_player_repeat}
          onClick={() => setIsRepeat(!isRepeat)}
        >
          <Repeat color="#333" width="30" height="30" />
          {isRepeat && <i className={s.audio_player_repeat_icon}> 1 </i>}
        </div>
        <div
          className={classnames(s.audio_player_play, previuosClickStyle)}
          onClick={goToPreviousTrack}
          onMouseDown={() => setPreviuosTrackStyle(!previousTrackStyle)}
          onMouseUp={() => setPreviuosTrackStyle(!previousTrackStyle)}
          onTouchStart={() => setPreviuosTrackStyle(!previousTrackStyle)}
          onTouchEnd={() => setPreviuosTrackStyle(!previousTrackStyle)}
        >
          <Previous color="#333" width={width} height={height} />
        </div>
        {!isPlaying ? (
          <div
            className={classnames(s.audio_player_play, playClickStyle)}
            onMouseDown={() => setPlayTrackStyle(!playTrackStyle)}
            onMouseUp={() => setPlayTrackStyle(!playTrackStyle)}
            onTouchStart={() => setPlayTrackStyle(!playTrackStyle)}
            onTouchEnd={() => setPlayTrackStyle(!playTrackStyle)}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play color="#333" width="60px" height="60px" />
          </div>
        ) : (
          <div
            className={classnames(s.audio_player_play, playClickStyle)}
            onClick={() => setIsPlaying(!isPlaying)}
            onMouseDown={() => setPlayTrackStyle(!playTrackStyle)}
            onMouseUp={() => setPlayTrackStyle(!playTrackStyle)}
            onTouchStart={() => setPlayTrackStyle(!playTrackStyle)}
            onTouchEnd={() => setPlayTrackStyle(!playTrackStyle)}
          >
            <Pause color="#333" width="60px" height="60px" />
          </div>
        )}
        <div
          className={classnames(s.audio_player_next, nextClickStyle)}
          onClick={goToNextTrack}
          onMouseDown={() => setNextTrackStyle(!nextTrackStyle)}
          onMouseUp={() => setNextTrackStyle(!nextTrackStyle)}
          onTouchStart={() => setNextTrackStyle(!nextTrackStyle)}
          onTouchEnd={() => setNextTrackStyle(!nextTrackStyle)}
        >
          <Next color="#333" width={width} height={height} />
        </div>
        <div className={s.audio_player_order}>
          <Order color="#333" width="30" height="30" />
        </div>
      </div>
    );
  }
);

export default AudioPlayer;
