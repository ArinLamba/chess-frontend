"use client";

import { Button } from '../../components/ui/button';
import { Modification } from './modification';

import { usePlaying } from '@/store/use-running';
import { socket } from '@/lib/socket';

import Link from 'next/link';

export const ControlsButton = () => {

  const setIsPlaying = usePlaying((state) => state.setIsPlaying);

  const handleNewGame = () => {
    socket.emit("findMatch");
    socket.on("waiting", (msg) => {
      console.log(msg);
    });
    
    socket.on("gameStarted", () => setIsPlaying(true));
  };
  

  return (
    <div className=' flex flex-col h-full items-center lg:w-[270px] justify-start py-3 px-4 gap-y-2 rounded border lg:border-0 border-white/15'>
      <div className='flex h-full lg:flex-col lg:items items-center justify-center w-full gap-2'>
        <Button 
          variant="main" 
          size={"lg"} 
          className="lg:text-md lg:w-full tracking-wide cursor-pointer"
          onClick={handleNewGame}
          >
          Start Game
        </Button>
        <Link href="/bot">
          <Button 
            variant="superOutline"
            size={"lg"} 
            className="lg:text-md lg:w-[240px] tracking-wide cursor-pointer"
            >
            Play Against Bot
          </Button>
        </Link>
        <Link href="/Analyze">
          <Button 
            variant="superOutline"
            size={"lg"} 
            className="lg:text-md lg:w-[240px] tracking-wide cursor-pointer"
            >
            Analyze
          </Button>
        </Link>
      </div>
      <div className='w-full'>
        <Modification />
      </div>
    </div>
  );
};