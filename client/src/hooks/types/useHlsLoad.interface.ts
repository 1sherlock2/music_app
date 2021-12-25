export type IGetDuration = {
  hlsSetDuration?: any;
};

export type IHlsSetDuration = {
  details: {
    totalduration: number;
  };
};

export type IHlsBufferDurations = {
  targetBufferTime: number;
};

export type IHlsSideEffect = {
  fragLoading?: () => void;
};
