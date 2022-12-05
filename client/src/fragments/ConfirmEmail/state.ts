import { selectorFamily } from 'recoil';
import keyState from '../../store/keyState';
import { sendTokenByConfirmDB } from '../../store/queries';

const sendToken = selectorFamily({
  key: keyState.SEND_TOKEN,
  get: (token?: string) => async () => {
    if (!token) return;
    const result = await sendTokenByConfirmDB(token);
    if (result.status === 200) {
      return { success: true };
    }
    const { data } = result;
    return data;
  }
});

export { sendToken };
