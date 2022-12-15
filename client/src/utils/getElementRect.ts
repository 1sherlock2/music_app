export default (element) => {
  const { y, x, width, height } = element?.getBoundingClientRect() || {};

  const halfWidth = width / 2;
  const { scrollY, scrollX } = window;
  const posYWithScroll = scrollY + y;
  const posXWithScroll = x + scrollX;

  return {
    y,
    posYWithScroll,
    x,
    posXWithScroll,
    width,
    height,
    halfWidth
  };
};
