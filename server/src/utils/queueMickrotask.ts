export default (func) =>
  (...args) =>
    new Promise((resolve) => {
      setImmediate(() => {
        resolve(func(...args));
      });
    });
