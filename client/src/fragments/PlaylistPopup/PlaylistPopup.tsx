import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import AudioPayload from '../AudioPayload/AudioPayload';
import {
  IAudioPayload,
  IPlaylistPopup
} from '../AudioPayload/AudioPayload.interface';

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
  console.log('trackIndex', trackIndex);

  // Следующий трек
  const goToNextTrack = useCallback(
    () => setTrackIndex((prev) => prev + 1),
    []
  );

  // Предыдущий трек
  const goToPreviousTrack = useCallback(
    () => setTrackIndex((prev) => prev - 1),
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

  if (currentTrack?.audio) {
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
  }
  return null;
};

export default PlaylistPopup;
