
import { SelectPieceTheme } from "./select-piece-theme";

export const Modification = () => {
  return (
    <div className="controls flex max-w-[650px] p-2 ">
      <div className="flex lg:flex-col flex-row mr-auto gap-4">
        <SelectPieceTheme />
      </div>
    </div>
  );
};