import React, { useState, useEffect } from 'react';
import { Task } from '../../../api/apiService';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';
import AssignModal from './AssignModal'; // Import AssignModal component
import { Socket } from 'socket.io-client';

interface ColumnProps {
  status: string;
  items: Task[];
  handleDrop: (itemId: string, targetStatus: string) => void;
  socket: Socket | null
}

const Column: React.FC<ColumnProps> = ({ status, items, handleDrop, socket }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; status: string }) => handleDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const priorityOrder: { [key: string]: number } = {
    highest: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  const sortedItems = items
    .filter((item) => item.status === status)
    .sort((a, b) => priorityOrder[a.prio] - priorityOrder[b.prio]);

  // Function to update task within the column
  
  useEffect(() => {
    // This effect will run whenever the items prop changes
    console.log("Items prop changed. Re-rendering Column component...");
  }, [items]);

  return (
    <div
      ref={drop}
      className={`border border-border_color dark:border-dark_border mt-1 ${
        isOver ? 'border-black' : 'border-transparent'
      } rounded p-3`}
    >
      <p className="text-2xl m-3">{status}</p>
      {sortedItems.map((item) => (
        <div key={item.id.toString()}>
          <DraggableItem
            item={item}
            handleDrop={handleDrop}
            socket={socket}
          />
        </div>
      ))}
    </div>
  );
};

export default Column;
