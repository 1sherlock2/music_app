import React, { ChangeEventHandler } from 'react';
import { IHlsLoad } from '../../hooks/types/useHlsLoad.interface';
import { IallTraksByUser } from '../../store/index';

// export type IChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => void;

export type INameAndArtistAudio = {
  artist?: string;
  name: string;
};

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
  setBlockSwipe: (prevState: boolean) => void;
  changeCurrentTime: (time: number) => void;
  goToNextTrack: () => void;
  goToPreviousTrack: () => void;
  handleClickRep: () => void;
  setIsPlaying: (prevState: boolean) => void;
  setVolume: (prevState: number) => void;
};
