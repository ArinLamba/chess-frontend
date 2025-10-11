"use client";

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


import { usePlaying } from '@/store/use-playing';
import { usePlayerColor } from '@/store/use-player-color';

import { initSocket, disconnectSocket } from '@/lib/socket';
import { SOCKET_EVENTS } from '@/lib/events';

import Link from 'next/link';

import { useEffect } from 'react';
import { ResignButton } from '@/app/_components/resign-button';

export const ControlsButtonOnline = () => {

  const { isPlaying, setIsPlaying } = usePlaying();
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
    <div className=' flex flex-col h-full items-center lg:w-[270px] justify-start py-3 px-4 gap-y-2 rounded'>
      <div className='flex h-full lg:flex-col items-center justify-center w-full gap-2'>
        <Button 
          variant="main" 
          size={"lg"} 
          className="lg:text-md lg:w-full uppercase cursor-pointer"
          onClick={handleNewGame}
          disabled={isPlaying}
          >
          Start Game
        </Button>
        <Link href="/bot">
          <Button 
            size={"lg"} 
            variant="superOutline"
            className="lg:text-md lg:w-[240px] cursor-pointer "
            >
            Play Against Bot
          </Button>
        </Link>
        <Link href="/Analyze">
          <Button 
            variant="superOutline"
            size={"lg"} 
            className="lg:text-md lg:w-[240px]  cursor-pointer"
            >
            Analyze
          </Button>
        </Link>
      </div>
      <ResignButton />
    </div>
  );
};