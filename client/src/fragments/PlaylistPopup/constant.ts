import { IRepeat } from '../AudioPayload/AudioPayload.interface';

export const repeatValue: IRepeat = {
  oneLoop: 'allLoop',
  allLoop: 'noLoop',
  noLoop: 'oneLoop'
};
