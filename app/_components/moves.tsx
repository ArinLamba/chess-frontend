"use client";

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useGameHistory } from '@/store/use-history';
import React from 'react';

export const Moves = () => {
  const moveHistory = useGameHistory(state => state.moveHistory);

  return (
    <div className="flex flex-col w-full h-full ">
      {/* Header */}
      <div className="flex justify-evenly gap-8 font-semibold mb-2 px-4">
        <span>White</span>
        <span>Black</span>
      </div>

      {/* Scrollable area */}
      <ScrollArea className="w-full h-80 rounded-md  bg-[var(--bg-light)] ">
        <div className="grid grid-cols-2 ml-10 text-start w-full text-sm p-2 gap-y-1">
          {moveHistory.map((move, i) => (        
            <div key={i}>
              {move} 
            </div>         
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
