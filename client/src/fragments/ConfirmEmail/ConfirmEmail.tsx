import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sendToken } from './state';
import s from './ConfirmEmail.scss';

const ConfirmEmail: React.FC = () => {
  const { token } = useParams();
  const statusConfirmToken = useRecoilValue(sendToken(token));
  console.log({ statusConfirmToken });
  return (
    <div className={s.container}>
      <div className={s.container_title}>Email was confirmed</div>
      <div className={s.container_subTitle}>
        You can return home page by link:
      </div>
      <div className={s.container_link}>
        <div className={s.container_link_text}>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
