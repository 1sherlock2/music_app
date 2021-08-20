const formatTimer = (time) => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - hours * 60;
  const secunds = Math.floor(time % 60);
  const changeTimer = (value) => value < 10 ? `0${value}` : value;
  const formatMinutes = changeTimer(minutes) 
  const formatSecunds = changeTimer(secunds) 
  return `${formatMinutes}:${formatSecunds}`;
};

export default formatTimer;
