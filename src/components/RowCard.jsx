import React from 'react';
import { useDrag } from 'react-dnd';

import Photo from '../images/photo.jpg';
import user from '../images/user.png';
import arrow from '../images/arrow.png';

const RowCard = ({ video, index, row, onDropRow }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'row',
    item: { id: video.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <div
        key={video.id}
        className="video flex mx-auto mb-4 items-center px-4 gap-4 text-white"
        ref={dragRef}
      >
        <span className="w-4%] opacity-40">{video.user_id}</span>
        <span className="w-[10%]">
          <img
            src={Photo}
            alt={video.username}
            className="w-[118px] h-[64px] rounded-[8px]"
          />
        </span>

        <span className="w-[36%] opacity-40">{video.title}</span>
        <span className=" w-[15%] flex items-center space-x-2">
          <span>
            <img src={user} alt="user avatar" />
          </span>
          <span className="text-[#DBFD51] opacity-40">{video.username}</span>
        </span>
        <span className="w-[10%] flex items-center space-x-3 absolute -right-10">
          <span className="opacity-40">{video.like}</span>
          <span>
            <img src={arrow} alt="" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default RowCard;
