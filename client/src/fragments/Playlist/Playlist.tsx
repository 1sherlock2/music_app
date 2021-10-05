import React from 'react';
import { useRecoilValue } from 'recoil';
import { allTraksByUser } from '../../store/index';
import s from './Playlist.scss';

const Playlist = () => {
  const allTracks = useRecoilValue(allTraksByUser)
  
  return <div> Playlist</div>;
};

export default Playlist;
