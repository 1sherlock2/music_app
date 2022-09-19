import React, { ChangeEventHandler } from 'react';
import { IHlsLoad } from '../../hooks/types/useHlsLoad.interface';
import { IallTraksByUser } from '../../store/index';

export type IRepeat = {
  oneLoop: 'allLoop';
  allLoop: 'noLoop';
  noLoop: 'oneLoop';
};

export type IAudioPayload = {
  isPlaying: boolean;
  repeat: keyof IRepeat;
  currentTrack: IallTraksByUser;
  hlsLoad: IHlsLoad;
  trackProgress: number;
  duration: number;
  volume: number;
  defaultTopPosition: number;
  fullHeight: number;
  setTopPosition: (prevState: number) => void;
  setTransformByCloseY: (prevState: boolean) => void;
  setBlockSwipe: (prevState: boolean) => void;
  changeCurrentTime: (time: number) => void;
  goToNextTrack: () => void;
  goToPreviousTrack: () => void;
  handleClickRep: () => void;
  setIsPlaying: (prevState: boolean) => void;
  setVolume: (prevState: number) => void;
};
