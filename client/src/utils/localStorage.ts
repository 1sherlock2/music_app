const localAuth: string = 'userData';

export const authLocalStorage = {
  setStorage: (token: string | undefined, nickname: string | undefined) =>
    localStorage.setItem(localAuth, JSON.stringify({ token, nickname })),
  getStorage: (): string | null => localStorage.getItem(localAuth),
  removeStorage: () => localStorage.removeItem(localAuth),
  getToken: () => {
    const storage: any = localStorage.getItem(localAuth);
    const { token } = JSON.parse(storage);
    return token;
  }
};
