import React, { Suspense, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import Button from '../../components/Button/Button';
import Search from '../../components/Icons/Search';
import Input from '../../components/Input/Input';
import { Loader_1 } from '../../loader/Loader_1';
import BottomPanel from '../BottomPanel/BottomPanel';
import s from './BrowserPage.scss';
import MediaResult from './MediaResult/MediaResult';
import { dataByUploadClick, linkText } from './state';
import { useTranslation } from 'react-i18next';

const BrowserPage = () => {
  const [linkValue, setLinkValue] = useState<string>('');
  const { t } = useTranslation();

  const handleClick = useRecoilCallback(({ set, reset }) => () => {
    reset(dataByUploadClick);
    set(linkText, linkValue);
  });
  return (
    <>
      <div className={s.search}>
        <Input
          value={linkValue}
          onChange={setLinkValue}
          closeSize
          size="l"
          placeholder={t('pasteLink')}
        />
        <Button onClick={handleClick} className={s.search_button} type="submit">
          <Search size="30px" color="#fff" />{' '}
        </Button>
      </div>
      <Suspense fallback={<Loader_1 />}>
        <MediaResult />
      </Suspense>
      <BottomPanel />
    </>
  );
};

export default BrowserPage;
