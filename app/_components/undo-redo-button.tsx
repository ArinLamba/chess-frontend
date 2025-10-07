"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const UndoRedoButtons = () => {

  const moveBackward = () => {
    
  }

  const moveForward = () => {

  }

  return (
    <div className="w-full mt-2 flex justify-around transition-colors">
      <Button onClick={moveBackward} variant="superOutline" >
        <ChevronLeft className="size-7"/>
      </Button>
      <Button onClick={moveForward} variant="superOutline">
        <ChevronRight className="size-7"/>
      </Button>
    </div>
  );
};