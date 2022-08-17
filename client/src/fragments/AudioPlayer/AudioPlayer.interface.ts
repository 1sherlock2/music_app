export interface IAudioPlayer {
  isPlaying: boolean;
  setIsPlaying: (prev: boolean) => void;
}
