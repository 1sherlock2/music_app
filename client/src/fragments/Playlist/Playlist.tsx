import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from 'recoil';
import PlaylistPopup from '../PlaylistPopup/PlaylistPopup';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import classnames from 'classnames';
import Img from '../../components/Img/Img';
import s from './Playlist.scss';
import { altImageSrc } from '../../store/altrImageSrc';
import BottomPanel from '../BottomPanel/BottomPanel';
import { allTracksByUserAtom, allTraksByUser, tracksCount } from './state';
import { allTracksByUserDB, checkTrackCountDB } from '../../store/queries';
import OnBoard from '../../components/OnBoard/OnBoard';
import useCombinedRef from '../../hooks/useCombinedRef';

const Playlist = () => {
  const [allTracks, setAllTracks] = useRecoilState(allTracksByUserAtom);
  const setOrderTracks = useSetRecoilState(allTraksByUser);
  // const [allTracksCount, setAllTrackCount] = useRecoilState(tracksCount);
  const [allTracksCount, setAllTrackCount] = useState(allTracks.length);
  // const trackRefs: any = useRef(allTracks?.map(() => React.createRef()));
  const [generalIndexTrack, setTrackIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const playlistRef = useRef(null);
  useEffect(() => {
    (async () => {
      const { data } = await checkTrackCountDB();
      if (data !== allTracksCount) {
        setAllTrackCount(data);
        const result = await allTracksByUserDB();
        setAllTracks(result.data);
      }
    })();
  });

  const handleClick = useCallback((index: number) => {
    console.log('CLICK');
    setTrackIndex(index);
    setOpen(true);
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...allTracks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrderTracks(items);
  };

  useEffect(() => {
    setOrderTracks(allTracks);
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div
              className={classnames(s.playList, 'characters')}
              {...provided.droppableProps}
              ref={useCombinedRef(provided.innerRef, playlistRef)}
            >
              {allTracks?.length > 0 ? (
                allTracks.map((track, index) => {
                  const { id, img, artist, name } = track;
                  return (
                    <Draggable key={id} draggableId={`${id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={`${id}_${index}`}
                          // ref={trackRefs.current[index]}
                          className={s.container}
                          onClick={() => handleClick(index)}
                        >
                          <div className={s.container_img}>
                            <Img src={img} altSrc={altImageSrc} />
                          </div>
                          <div className={s.container_track}>
                            <div className={s.container_track__name}>
                              {name}
                            </div>
                            <div className={s.container_track__author}>
                              {artist}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })
              ) : (
                <OnBoard name="playlist">
                  <div className={s.empty}>
                    Download content by going to link on browser
                  </div>
                </OnBoard>
              )}
              {open && !!allTracks.length && (
                <PlaylistPopup
                  allTracks={allTracks}
                  generalIndexTrack={generalIndexTrack}
                  setOpen={setOpen}
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <BottomPanel />
    </>
  );
};

export default Playlist;
