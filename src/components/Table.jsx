import React from 'react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import RowCard from './RowCard';

const Table = ({ videos }) => {
  const [list, setList] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'row',

    drop: (item) => moveRow(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveRow = (id) => {
    console.log(id);
  };

  return (
    <div
      ref={drop}
      className="relative max-w-[1216px] mx-auto overflow-x-auto lg:overflow-visible"
    >
      {videos?.list?.map((video) => {
        return <RowCard video={video} key={video.id} />;
      })}
    </div>
  );
};

export default Table;
