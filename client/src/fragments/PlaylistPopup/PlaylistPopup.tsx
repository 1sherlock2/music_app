import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import AudioPayload from '../AudioPayload/AudioPayload';
import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';

const PlaylistPopup: React.FC<IAudioPayload> = ({
  allTracks,
  generalIndexTrack,
  setOpen,
  open
}) => {
  const [trackIndex, setTrackIndex] = useState(generalIndexTrack || 0);
  const currentTrack = allTracks[trackIndex];

  // Следующий трек
  const goToNextTrack = useCallback(() => {
    if (trackIndex >= allTracks.length - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex + 1);
    }
  }, [generalIndexTrack]);

  // Предыдущий трек
  const goToPreviousTrack = useCallback(() => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(allTracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  }, [generalIndexTrack]);

  if (currentTrack.audio) {
    return createPortal(
      <AudioPayload
        currentTrack={currentTrack}
        setOpen={setOpen}
        open={open}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        goToNextTrack={goToNextTrack}
        goToPreviousTrack={goToPreviousTrack}
      />,
      document.body
    );
  }
  return null;
};

export default PlaylistPopup;
