import { atom, selector, selectorFamily } from 'recoil';
import keyState from '../../store/keyState';
import { dataByLinkDB, uploadFileByLinkDB } from '../../store/queries';

const linkText = atom({ key: keyState.LINK_TEXT, default: '' });
console.log({ linkText });

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

const dataByUploadClick = atom({ key: keyState.DATA_BY_UPLOAD, default: '' });
const uploadFile = selector({
  key: keyState.UPLOAD_FILE,
  get: async ({ get }) => {
    const data = get(dataByUploadClick);
    if (data) {
      return await uploadFileByLinkDB(data);
    }
  }
});

export { linkText, queryDataLink, uploadFile, dataByUploadClick };
