"use client";
import { Moves } from '@/app/_components/moves';

import React from 'react'

type Props = {
  children: React.ReactNode;
}

export const Controls = ({ children }: Props) => {

  return (
    <div className="controls max-w-[650px] lg:w-[300px] h-full flex flex-col items-center py-2">
      <div className="hidden lg:block w-[270px] px-3 py-2 my-2 max-h-full border-b  relative" >
        <Moves />
      </div>
      <div className="lg:w-[270px] w-full">
        {children}
      </div>
    </div>
  );
};