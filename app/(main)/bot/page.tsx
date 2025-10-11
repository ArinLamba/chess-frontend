import { Controls } from "@/app/_components/controls";
import { ChessBoardBot } from "./chess-board-bot";
import { ControlsButtonBot } from "./controls-button-bot";
import { Modification } from "@/app/_components/modification";

const PlayBot = () => {

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <ChessBoardBot/>
      <div className="flex flex-col lg:flex-row-reverse gap-5">
        <Controls>
          <ControlsButtonBot />
        </Controls>
        <Modification />
      </div>
    </div>
  )
}

export default PlayBot;