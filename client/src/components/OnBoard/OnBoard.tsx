import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useCalculatePosFromTrigger from '../../hooks/useCalculatePosFromTrigger';
import throttle from '../../utils/throttle';
import cssVariables from '../../styles/variables.scss';
import s from './OnBoard.scss';
import useCreateMountNode from '../../utils/useCreateMounNode';
import TopRightTipIcon from '../Icons/Tooltip';
import Button from '../Button/Button';
import Close from '../Icons/Close';

const mountId = 'uiHelperComponents';

const OnBoard = ({
  name,
  triggerRef,
  maxWidth = 300,
  onClose,
  content,
  backgroundColor = 'pink-200',
  closeIcon,
  panelId
}) => {
  useCreateMountNode(mountId);

  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null);

  const { updatePos, style, posClass } = useCalculatePosFromTrigger({
    triggerRef,
    tooltipRef,
    maxWidth
  });

  const setInLocalStorage = useCallback(
    (): void => localStorage.setItem(name, String(Date.now())),
    [name]
  );

  const onClickClose = () => {
    setShow(false);
    setInLocalStorage();
    onClose?.();
  };
  const isPanelUsed = localStorage.getItem(panelId);
  useEffect(() => {
    if (!isPanelUsed) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    show && updatePos();
  }, [show, updatePos]);
  console.log({ show });
  useEffect(() => {
    if (!show) {
      return;
    }

    const throttleUpdatePos = throttle(updatePos);

    // ResizeObserver не поддерживается старыми браузерами
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', throttleUpdatePos);

      return () => {
        window.removeEventListener('resize', throttleUpdatePos);
      };
    }

    const resizeObserver = new ResizeObserver(throttleUpdatePos);

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.unobserve(document.documentElement);
    };
  }, [show, updatePos]);

  return (
    <>
      {show &&
        content &&
        createPortal(
          <div
            style={{
              ...style.element,
              ...{ maxWidth: `${maxWidth}px` }
            }}
            className={s.positioner}
            ref={tooltipRef}
            area-describedby={name}
          >
            <div
              style={{
                backgroundColor:
                  cssVariables[backgroundColor] || backgroundColor
              }}
              className={classNames(s.onboarding, s[posClass])}
            >
              <TopRightTipIcon
                className={s.arrow}
                style={{
                  ...style.arrow,
                  color: cssVariables[backgroundColor] || backgroundColor
                }}
              />
              <div className={s.onboardingInner}>
                {closeIcon && (
                  <div className={s.closeButton}>
                    <Button
                      variant="pink"
                      size="s"
                      onClick={onClickClose}
                      className={s.close}
                    >
                      <Close size="30px" />
                    </Button>
                  </div>
                )}
                <div className={s.content}>{content}</div>
              </div>
            </div>
          </div>,
          document.getElementById(mountId)
        )}
    </>
  );
};

export default OnBoard;
