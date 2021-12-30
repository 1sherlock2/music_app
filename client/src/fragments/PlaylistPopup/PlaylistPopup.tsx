import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import AudioPayload from '../AudioPayload/AudioPayload';
import { IPlaylistPopup } from '../AudioPayload/AudioPayload.interface';
import s from './PlaylistPopup.scss';

const PlaylistPopup: React.FC<IPlaylistPopup> = ({
  allTracks,
  generalIndexTrack,
  setOpen,
  open
}) => {
  const [trackIndex, setTrackIndex] = useState(generalIndexTrack || 0);
  const currentTrack = useMemo(
    () => allTracks && allTracks[trackIndex],
    [allTracks, trackIndex]
  );

  useEffect(() => {
    const rootEl = document.getElementById('root');
    const firstChild = rootEl?.firstElementChild;
    firstChild?.classList.add(s.hidden);
  }, []);

  // Следующий трек
  const goToNextTrack = useCallback(() => setTrackIndex((prev) => ++prev), []);

  // Предыдущий трек
  const goToPreviousTrack = useCallback(
    () => setTrackIndex((prev) => --prev),
    []
  );

  useEffect(() => {
    if (allTracks) {
      if (trackIndex > allTracks?.length - 1) {
        setTrackIndex(0);
      }
      if (trackIndex < 0) {
        setTrackIndex(allTracks?.length - 1);
      }
    }
  }, [trackIndex]);

  if (!currentTrack?.audio) {
    return null;
  }
  return createPortal(
    <AudioPayload
      setOpen={setOpen}
      open={open}
      goToNextTrack={goToNextTrack}
      goToPreviousTrack={goToPreviousTrack}
      trackIndex={trackIndex}
      currentTrack={currentTrack}
    />,
    document.body
  );
};

export default PlaylistPopup;
