export default (f, ms?: number) => {
  let timer:  = null;
  let savedArgs;

  const wrapper = (...args) => {
    if (timer) {
      savedArgs = args;
      return;
    }

    f(...args);

    timer = setTimeout(() => {
      timer = null;
      if (savedArgs) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, ms);
  };

  return wrapper;
};
