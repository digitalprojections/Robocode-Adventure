
import React from 'react';
import { BlockType } from '../types';
import Block from './Block';

interface CodePaletteProps {
  onAddBlock: (type: BlockType) => void;
}

const CodePalette: React.FC<CodePaletteProps> = ({ onAddBlock }) => {
  return (
    <div className="bg-white p-4 pb-10 z-40 border-t border-slate-200 flex justify-center items-center gap-3 sm:gap-6">
        {[
          BlockType.MOVE_FORWARD, 
          BlockType.TURN_LEFT, 
          BlockType.TURN_RIGHT, 
          BlockType.COLLECT, 
          BlockType.REPEAT
        ].map(type => (
            <div key={type} className="w-16 h-16 sm:w-20 sm:h-20">
                <Block type={type} isTemplate onAdd={(t) => onAddBlock(t)} />
            </div>
        ))}
    </div>
  );
};

export default CodePalette;
