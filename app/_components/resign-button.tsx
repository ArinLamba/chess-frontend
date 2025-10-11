import { Flag } from "lucide-react";

import { useEffect, useState } from "react";

import { usePlaying } from "@/store/use-playing";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useSelectedSquare } from "@/store/use-selected-square";
import { useTurnStore } from "@/store/use-turn";
import { Button } from "../../components/ui/button";

export const ResignButton = () => {

  const [resignTrigger, setResignTrigger] = useState(false);
  
  const { isPlaying, setIsPlaying } = usePlaying();
  const clearHighlightedMoves = useHighlightedMoves(state => state.clearHighlightedMoves);
  const clearSelectedSquare  = useSelectedSquare(state => state.clearSelectedSquare); 
  const resetTurn = useTurnStore(state => state.resetTurn);

  useEffect(() => {
    setIsPlaying(false);
    clearHighlightedMoves();
    clearSelectedSquare();
    resetTurn();
    
  }, [resignTrigger]);

  return (
    <>
      {isPlaying && (
        <Button variant={"dangerOutline"}
          className="w-full text-md"
          onClick={() => setResignTrigger(prev => !prev)}
        >
          <Flag size={20}/>
          <h1>Resign</h1>
        </Button>
   
      )}
    </>
  );
};