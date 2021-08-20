import { IApp } from "~/App.interface";

export interface IintervalRef<T> {
  current: T
}
export interface IDurationTarget {
  target: {
    duration: React.SetStateAction<number>,
  }
}
export interface IAppContainer {
  musics: IApp
}


