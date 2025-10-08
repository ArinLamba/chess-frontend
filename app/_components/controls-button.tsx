"use client";

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { Modification } from './modification';

import { usePlaying } from '@/store/use-running';
import { usePlayerColor } from '@/store/use-player-color';

import { initSocket, disconnectSocket } from '@/lib/socket';
import { SOCKET_EVENTS } from '@/lib/events';

import Link from 'next/link';

import { useEffect } from 'react';

export const ControlsButton = () => {

  const setIsPlaying = usePlaying((state) => state.setIsPlaying);
  const setPlayerColor = usePlayerColor(s => s.setPlayerColor);

  const handleNewGame = () => {
    const socket = initSocket();

    socket.emit(SOCKET_EVENTS.FIND_MATCH);
        
    socket.on(SOCKET_EVENTS.WAITING, () => {
      toast("waiting for player to join...");
    });

    socket.on(SOCKET_EVENTS.GAME_STARTED, (data) => {
      const myColor = data.colors[socket.id!];
      setPlayerColor(myColor);

      toast("Match Started");
      setIsPlaying(true);
    });
  };
  
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

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