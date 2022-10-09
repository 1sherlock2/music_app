import { atom, selector } from 'recoil';
import keyState from '../../store/keyState';
import { uploadFileByLinkDB } from '../../store/queries';
import { IDataByQuery } from './MediaResult/DownloadedUrl/DownloadedUrl.interface';

const linkText = atom({ key: keyState.LINK_TEXT, default: '' });

const dataByUploadClick = atom<IDataByQuery | string>({
  key: keyState.DATA_BY_UPLOAD,
  default: ''
});
const uploadFile = selector({
  key: keyState.UPLOAD_FILE,
  get: async ({ get }) => {
    const data = get(dataByUploadClick);
    if (data) {
      return await uploadFileByLinkDB(data);
    }
  }
});

export { linkText, uploadFile, dataByUploadClick };
