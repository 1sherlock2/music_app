import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface ILineAndNameProps {
  setTopPosition: Dispatch<SetStateAction<number>>;
  differentValue: number;
  setTransformByCloseY: Dispatch<SetStateAction<boolean>>;
  setOpen: (value: boolean) => void;
}
