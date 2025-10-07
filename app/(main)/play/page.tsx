import React from 'react'
import { ChessBoard } from './chess-board';
import { Controls } from '@/app/_components/controls';

const PlayOnline = () => {
  return (
    <div className='flex flex-col items-center gap-y-2'>
      <div className='flex justify-center '>
        <ChessBoard />
      </div>
      <div className=''>
        <Controls className='lg:hidden block'/> 
      </div>
    </div>
  );
};

export default PlayOnline;