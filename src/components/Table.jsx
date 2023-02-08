import React from 'react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import RowCard from './RowCard';

const Table = ({ videos }) => {
  const [list, setList] = useState(videos.list);
  const [collectedProps, drop] = useDrop(() => ({
    accept: 'row',
    drop: (item, monitor) => {
      const result = monitor.isOver();
      console.log(result);
    },
  }));

  return (
    <div
      ref={drop}
      className="relative max-w-[1216px] mx-auto overflow-x-auto lg:overflow-visible"
    >
      {videos.list.map((video, index) => {
        return <RowCard video={video} key={video.id} index={index} />;
      })}
    </div>
  );
};

export default Table;
