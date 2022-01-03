import React, { useCallback, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import PlaylistPopup from '../PlaylistPopup/PlaylistPopup';
import { allTracksByUserAtom, allTraksByUser } from '../../store/index';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import classnames from 'classnames';
import Img from '../../components/Img/Img';
import s from './Playlist.scss';

const Playlist = () => {
  const allTracks = useRecoilValue(allTracksByUserAtom);
  const setOrderTracks = useSetRecoilState(allTraksByUser);
  console.log('render');
  // const trackRefs: any = useRef(allTracks?.map(() => React.createRef()));
  const [generalIndexTrack, setTrackIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  console.log(`allTracks`, allTracks);

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

  return (
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
                        <Img
                          src={img}
                          altSrc="https://res.cloudinary.com/drypohi9s/image/upload/v1633723468/music_app/alt_src_img/audio-wave-svgrepo-com_trpgkx.svg"
                        />
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
                open={open}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Playlist;
