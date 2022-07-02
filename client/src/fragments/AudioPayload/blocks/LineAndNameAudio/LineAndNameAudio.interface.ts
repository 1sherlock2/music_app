import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface ILineAndNameProps {
  setTopPosition: Dispatch<SetStateAction<number>>;
  differentValue: number;
  defaultTopPosition: number;
  setTransformByCloseY: Dispatch<SetStateAction<boolean>>;
  setOpen: (value: boolean) => void;
}
