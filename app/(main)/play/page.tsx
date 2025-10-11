import React from 'react'
import { ChessBoardOnline } from './chess-board-online';
import { Controls } from '@/app/_components/controls';
import { ControlsButtonOnline } from '@/app/(main)/play/controls-button-online';
import { Modification } from '@/app/_components/modification';

const PlayOnline = () => {
  return (

    <div className='flex lg:flex-row flex-col gap-5'>
      <ChessBoardOnline />
      <div className='flex flex-col lg:flex-row-reverse gap-5'>
        <Controls>
          <ControlsButtonOnline />
        </Controls> 
        <Modification />
      </div>
    </div>
     
    
  );
};

export default PlayOnline;