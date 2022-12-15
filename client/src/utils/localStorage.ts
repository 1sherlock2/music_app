const localAuth = process.env.LOCAL_AUTH as string;

export const authLocalStorage = {
  setStorage: (token: string | undefined, nickname: string | undefined) =>
    localStorage.setItem(localAuth, JSON.stringify({ token, nickname })),
  getStorage: (): string | null => localStorage.getItem(localAuth),
  removeStorage: () => localStorage.removeItem(localAuth),
  getToken: () => {
    const storage: string | null = localStorage.getItem(localAuth);
    if (storage) {
      const { token } = JSON.parse(storage);
      return `Bearer ${token}`;
    }
    return null;
  }
};
