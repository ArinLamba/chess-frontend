"use client";

import { Button } from '@/components/ui/button';

import { usePlaying } from '@/store/use-playing';

import Link from 'next/link';
import { useReset } from '@/store/use-reset';
import { useGameHistory } from '@/store/use-history';
import { BotDifficulty } from './bot-difficulty';
import { ResignButton } from '@/app/_components/resign-button';
import { useGame } from '@/store/use-game';
import { useTurnStore } from '@/store/use-turn';


export const ControlsButtonBot = () => {

  const { isPlaying, setIsPlaying } = usePlaying();

  const setResetTrigger  = useReset(state => state.setResetTrigger);
  const clearHistory = useGameHistory(state => state.clearHistory);
  const resetTurn = useTurnStore(state => state.resetTurn);
  const resetGame = useGame(state => state.resetGame);

  const handleNewGame = () => {
    setResetTrigger();
    clearHistory();
    setIsPlaying(true);
    resetTurn();
    resetGame();
  };
  

  return (
    <div className=' flex flex-col h-full items-center lg:w-[270px] py-3 px-4 gap-y-2 rounded'>
      <div className='flex flex-col-reverse lg:flex-col w-full '>
        <BotDifficulty/>
        <div className='flex h-full lg:flex-col lg:items items-center justify-center w-full gap-2 bg-amber-30'>
          <Button 
            variant="main" 
            size={"lg"} 
            className="lg:text-md lg:w-full tracking-wide uppercase cursor-pointer"
            onClick={handleNewGame}
            disabled={isPlaying}
            >
            Play Bot
          </Button>
          <Link href="/play">
            <Button 
              size={"lg"} 
              variant="superOutline"
              className="lg:text-md lg:w-[240px] tracking-wide cursor-pointer"
              >
              Play Online
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
      </div>
      <ResignButton />
    </div>
  );
};