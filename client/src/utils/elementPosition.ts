import getElementRect from './getElementRect';

const getPosValue = (num: number) => `${Math.round(num)}px`;

export default ({ trigger, helper, maxWidth, fixed, paddingFromViewport }) => {
  // Позиция и размеры тригера, при наведении на который срабатывает тултип
  const {
    y: trY,
    x: trX,
    posYWithScroll,
    posXWithScroll,
    width: trWidth,
    height: trHeight,
    halfWidth: trHalfWidth
  } = getElementRect(trigger);
  const triggerPosY = fixed ? trY : posYWithScroll;
  const triggerPosX = fixed ? trX : posXWithScroll;

  // Позиция и размеры тултипа
  const {
    width: hWidth,
    height: hHeight,
    halfWidth: hHalfWidth
  } = getElementRect(helper);

  const scrollbarHeight =
    window.innerHeight - document.documentElement.clientHeight;
  const trigerCenterPosX = triggerPosX + trHalfWidth;
  const style = {};

  // Положение тултипа по вертикали
  if (trY < hHeight) {
    style.top = triggerPosY + trHeight;
    style.elClass = 'bottom';
    delete style.bottom;
  } else {
    style.bottom = document.documentElement.clientHeight - triggerPosY;
    delete style.top;
    style.elClass = 'top';
  }

  // Положение тултипа по горизонтали
  style.left = trigerCenterPosX - hHalfWidth;

  // Выход за левый кран экрана
  if (
    trigerCenterPosX - paddingFromViewport < hHalfWidth &&
    hWidth >= trWidth
  ) {
    style.left = paddingFromViewport;
  }

  //  Выход за правый край экрана
  if (
    trigerCenterPosX + hHalfWidth + paddingFromViewport >
    document.documentElement.clientWidth
  ) {
    style.left =
      document.documentElement.clientWidth - hWidth - paddingFromViewport;
    style.bottom =
      document.documentElement.clientHeight - triggerPosY + scrollbarHeight;
  }

  style.arrowX = trigerCenterPosX - style.left - 10;

  if (
    maxWidth + paddingFromViewport * 2 >=
    document.documentElement.clientWidth
  ) {
    style.left = paddingFromViewport;
    style.right = paddingFromViewport;
  }

  Object.keys(style).forEach((key) => getPosValue(style[key]));

  return style;
};
