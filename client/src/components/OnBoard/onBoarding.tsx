import React from 'react';
import { useRef } from 'react';
import useCombinedRef from '../../hooks/useCombinedRef';
import cloneChildren from '../../utils/cloneChildren';
import getLocalStorage from '../../utils/getLocalStorage';
import OnBoard from './OnBoard';

const OnBoarding = ({ children, name, repeatTime, ...restProps }) => {
  const localeStorage = getLocalStorage();
  const triggerRef = useRef(null);

  repeatTime = repeatTime ? repeatTime * 1000 : null;
  name = `${name}Onboarding`;

  const showLastTime = localeStorage?.getItem(name);
  const needShow =
    (localeStorage && !showLastTime) ||
    (repeatTime && Number(showLastTime) + repeatTime < Date.now());

  const trigger = cloneChildren(children, {
    ref: useCombinedRef(triggerRef, children.ref)
  });

  return (
    <>
      {trigger}
      {needShow && (
        <OnBoard name={name} triggerRef={triggerRef} {...restProps} />
      )}
    </>
  );
};

export default OnBoarding;
