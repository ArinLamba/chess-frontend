
import { ResignButton } from "./resign-button";
import { SelectPieceTheme } from "./select-piece-theme";

export const Modification = () => {
  return (
    <div className="w-full">
      <div>
        <ResignButton />
      </div>
      <div className="mt-3 pt-4 border-t border-t-white/50">
        <SelectPieceTheme />
      </div>
    </div>
  );
};