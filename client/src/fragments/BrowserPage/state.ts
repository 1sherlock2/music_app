import { atom, selector, selectorFamily } from 'recoil';
import keyState from '../../store/keyState';
import { dataByLinkDB, uploadFileByLinkDB } from '../../store/queries';

const linkText = atom<string>({ key: keyState.LINK_TEXT, default: '' });
const uploadStatus = atom<boolean>({
  key: keyState.UPLOAD_STATUS,
  default: false
});

const queryDataLink = selector({
  key: keyState.QUERY_DATA_LINK,
  get: async ({ get }) => {
    const link = get(linkText);
    if (link) {
      const response = await dataByLinkDB(link);
      return response.data;
    }
  }
});

const uploadFile = selectorFamily({
  key: keyState.UPLOAD_FILE,
  get: (data) => async () => {
    if (data) {
      const response = await uploadFileByLinkDB(data);
      return response.status;
    }
    return false;
  }
});

export { linkText, queryDataLink, uploadFile };
