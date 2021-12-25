type IParametrsByOutNum = {
  startValue: {
    current: number;
  };
  endValue: number;
};
const outNum = ({ startValue, endValue }: IParametrsByOutNum) => {
  let time = Math.round(5000 / endValue);
  let interval = setInterval(() => {
    startValue.current = startValue.current + 1;
    if (startValue.current === endValue) {
      clearInterval(interval);
    }
  }, time);
};

export default outNum;
