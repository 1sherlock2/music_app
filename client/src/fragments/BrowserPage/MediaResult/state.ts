import { AxiosResponse } from 'axios';
import { selector } from 'recoil';
import keyState from '../../../store/keyState';
import { dataByLinkDB } from '../../../store/queries';
import { linkText } from '../state';
import { IDownloadByLink } from './MediaResult.interface';

const queryDataLink = selector({
  key: keyState.QUERY_DATA_LINK,
  get: async ({ get }) => {
    const link = get(linkText);
    if (link) {
      const response: AxiosResponse<IDownloadByLink> = await dataByLinkDB(link);
      return response.data;
    }
  }
});

export { queryDataLink };
