const localAuth: string = 'userData';

export const authLocalStorage = {
  setStorage: (token: string | undefined, nickname: string | undefined) =>
    localStorage.setItem(localAuth, JSON.stringify({ token, nickname })),
  getStorage: () => localStorage.getItem(localAuth),
  removeStorage: () => localStorage.removeItem(localAuth)
};
