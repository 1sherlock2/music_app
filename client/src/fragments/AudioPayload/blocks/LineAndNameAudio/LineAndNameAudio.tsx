import React, {
  forwardRef,
  TouchEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { ILineAndNameProps } from './LineAndNameAudio.interface';
import s from './LineAndNameAudio.scss';

const LineAndNameAudio: React.FC<ILineAndNameProps> = ({
  name,
  artist,
  setTopPosition,
  setTransformByCloseY,
  defaultTopPosition,
  fullHeight
}) => {
  const [startPositionY, setStartPositionY] = useState<number>();
  const differentValue = 30;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { top } = containerRef.current?.getBoundingClientRect() as DOMRect;
    setStartPositionY(top);
  }, [containerRef.current]);

  const handleTouchEvent: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientY } = e.touches[0];
    setTopPosition(Math.floor((clientY * 100) / fullHeight));
  };
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientY } = e.changedTouches[0];
    if (startPositionY) {
      const differentPosY = Math.floor(
        ((clientY - startPositionY) * 100) / fullHeight
      );
      if (differentPosY >= differentValue) {
        setTransformByCloseY(true);
      } else {
        setTopPosition(defaultTopPosition);
      }
    }
  };

  return (
    <div
      className={s.audioName}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEvent}
      ref={containerRef}
    >
      <div className={s.audioName_line} />
      <div className={s.audioName_title}>{`${name} - ${artist}`}</div>
    </div>
  );
};

export default LineAndNameAudio;
