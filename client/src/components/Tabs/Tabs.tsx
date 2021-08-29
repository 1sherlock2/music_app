import React, { useMemo } from 'react';
import { ITabs } from './Tabs.interface';
import classnames from 'classnames';
import s from './Tabs.scss';

const Tabs: React.FC<ITabs> = ({
  tabs,
  size = 'm',
  color = 'pink',
  active,
  onClick,
  ...restProps
}) => {
  const colorTab: { [x: string]: string } = {
    pink: s.pink
  };
  return (
    <div className={s.tabs} {...restProps}>
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={classnames(
                s.tabItem,
                { [s.active]: active },
                s[size],
                colorTab[color],
                {
                  [s.underline]: index === active
                }
              )}
              onClick={() => onClick(index)}
            >
              {tab}
            </div>
          );
        })}
    </div>
  );
};

export default Tabs;
