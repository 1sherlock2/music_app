const checkSupportLocalStorage = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      'localStorage' in window &&
      window.localStorage !== null
    );
  } catch (e) {
    return false;
  }
};

export default checkSupportLocalStorage;
