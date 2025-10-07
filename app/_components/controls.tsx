import { Moves } from '@/app/(main)/play/moves';
import { cn } from '@/lib/utils';
import React from 'react'
import { ControlsButton } from './controls-button';
import { UndoRedoButtons } from './undo-redo-button';

type Props = {
  className?: string;
};

export const Controls = ({ className }: Props) => {
  return (
    <div className={cn(
      "max-w-[650px] lg:w-[300px] max-h-full bg-neutral-900 ",
      className
    )}>
      <div className='hidden lg:block w-[270px] px-3 py-2 my-2 max-h-full border-white/50 border-b rounded relative'>
        <Moves />
        <UndoRedoButtons />
      </div>
      <div className=' lg:w-[270px] w-full'>
        <ControlsButton />
      </div>
    </div>
  );
};