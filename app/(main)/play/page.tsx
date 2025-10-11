import React from 'react'
import { ChessBoardOnline } from './chess-board-online';
import { Controls } from '@/app/_components/controls';
import { ControlsButtonOnline } from '@/app/(main)/play/controls-button-online';

const PlayOnline = () => {
  return (

    <div className='flex lg:flex-row flex-col justify-center gap-5'>
      <ChessBoardOnline />
      <Controls>
        <ControlsButtonOnline />
      </Controls> 
    </div>
     
    
  );
};

export default PlayOnline;