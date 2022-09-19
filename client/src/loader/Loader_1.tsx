import React from 'react';
import { ILoader1Props } from './Loader_1.interface';
import classnames from 'classnames';
import s from './Loader_1.scss';

export const Loader_1 = ({ className }: ILoader1Props) => (
  <div className={classnames(s.loader_1, className)} />
);
