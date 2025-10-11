import { Controls } from "@/app/_components/controls";
import { ChessBoardBot } from "./chess-board-bot";
import { ControlsButtonBot } from "./controls-button-bot";

const PlayBot = () => {

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <ChessBoardBot/>
      <Controls>
        <ControlsButtonBot />
      </Controls>
    </div>
  )
}

export default PlayBot;