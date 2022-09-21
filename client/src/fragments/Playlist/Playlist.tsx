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
import { allTraksByUser, refreshState } from './state';

const Playlist: React.FC = () => {
  const allTracks = useRecoilValue(allTraksByUser);
  const setOrderTracks = useSetRecoilState(allTraksByUser);
  // const trackRefs: any = useRef(allTracks?.map(() => React.createRef()));
  const [generalIndexTrack, setTrackIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [refreshPage, setRefreshPage] = useRecoilState(refreshState);

  if (refreshPage) {
    setRefreshPage(!refreshPage);
  }

  const handleClick = useCallback((index: number) => {
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
              ref={provided.innerRef}
            >
              {allTracks?.map((track, index) => {
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
                          <div className={s.container_track__name}>{name}</div>
                          <div className={s.container_track__author}>
                            {artist}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
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
