import { Flag } from "lucide-react";

import { usePlaying } from "@/store/use-playing";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useSelectedSquare } from "@/store/use-selected-square";
import { Button } from "../../components/ui/button";


export const ResignButton = () => {
  
  const { isPlaying, setIsPlaying } = usePlaying();
  const clearHighlightedMoves = useHighlightedMoves(state => state.clearHighlightedMoves);
  const clearSelectedSquare  = useSelectedSquare(state => state.clearSelectedSquare); 

  
  const handleResign = () => {
    setIsPlaying(false);
    clearHighlightedMoves();
    clearSelectedSquare();

  }


  return (
    <>
      {isPlaying && (
        <Button variant={"dangerOutline"}
          className="w-full text-md"
          onClick={handleResign}
        >
          <Flag size={20}/>
          <h1>Resign</h1>
        </Button>
   
      )}
    </>
  );
};