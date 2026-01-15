
import React from 'react';
import { BlockType, CodeBlock } from '../types';
import { ArrowUp, RotateCcw, RotateCw, Target, Repeat, Plus } from 'lucide-react';

interface BlockProps {
  block?: CodeBlock;
  type: BlockType;
  isTemplate?: boolean;
  onAdd?: (type: BlockType) => void;
  onRemove?: () => void;
  onUpdateValue?: (value: number) => void;
  isActive?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  isMini?: boolean;
}

const getBlockStyles = (type: BlockType) => {
  switch (type) {
    case BlockType.MOVE_FORWARD: return 'bg-blue-500 border-blue-600';
    case BlockType.TURN_LEFT: return 'bg-purple-500 border-purple-600';
    case BlockType.TURN_RIGHT: return 'bg-indigo-500 border-indigo-600';
    case BlockType.COLLECT: return 'bg-emerald-500 border-emerald-600';
    case BlockType.REPEAT: return 'bg-orange-500 border-orange-600';
    default: return 'bg-gray-500 border-gray-600';
  }
};

const BlockIcon: React.FC<{ type: BlockType; className?: string }> = ({ type, className = "w-1/2 h-1/2" }) => {
  const iconProps = { strokeWidth: 3, className: "w-full h-full" };
  const wrapperClass = `flex items-center justify-center ${className}`;
  switch (type) {
    case BlockType.MOVE_FORWARD: return <div className={wrapperClass}><ArrowUp {...iconProps} /></div>;
    case BlockType.TURN_LEFT: return <div className={wrapperClass}><RotateCcw {...iconProps} /></div>;
    case BlockType.TURN_RIGHT: return <div className={wrapperClass}><RotateCw {...iconProps} /></div>;
    case BlockType.COLLECT: return <div className={wrapperClass}><Target {...iconProps} /></div>;
    case BlockType.REPEAT: return <div className={wrapperClass}><Repeat {...iconProps} /></div>;
    default: return <div className={wrapperClass}>?</div>;
  }
};

const Block: React.FC<BlockProps> = ({ 
  block, 
  type, 
  isTemplate, 
  onAdd, 
  onRemove, 
  onUpdateValue,
  isActive,
  isSelected,
  onSelect,
  isMini = false
}) => {
  const styles = getBlockStyles(type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTemplate) {
      onAdd?.(type);
    } else if (type === BlockType.REPEAT) {
      onSelect?.();
    }
  };

  const isRepeat = type === BlockType.REPEAT;

  return (
    <div 
      className={`
        ${styles} text-white rounded-md shadow-sm flex flex-col items-center justify-center 
        transition-all active:scale-95 relative border-b-2 w-full h-full
        ${isActive ? 'ring-2 ring-yellow-400 z-10 scale-105 shadow-md' : ''}
        ${isSelected ? 'ring-2 ring-white/60 z-10 scale-105 brightness-110 shadow-md' : ''}
        ${isTemplate ? 'cursor-pointer hover:brightness-105 rounded-xl border-b-4' : 'cursor-pointer'}
        ${isMini ? 'rounded-lg border-b-2 shadow-sm' : ''}
      `}
      onClick={handleClick}
    >
      {/* Icon Area */}
      <div className={`flex items-center justify-center ${isRepeat && !isTemplate ? 'w-full h-1/3 mt-0.5' : 'w-full h-full'}`}>
        <BlockIcon type={type} className={isRepeat && !isTemplate ? "w-3 h-3" : isTemplate ? "w-1/2 h-1/2" : "w-2/3 h-2/3"} />
      </div>

      {/* Internal Repeat Logic */}
      {isRepeat && !isTemplate && (
        <>
          <div className="flex-1 w-full px-0.5 pb-0.5 flex flex-col justify-end overflow-hidden">
            {/* Sub-block Preview Icons */}
            <div className="flex gap-0.5 justify-center mb-0.5">
              {block?.subBlocks?.map((sb) => (
                <div key={sb.id} className={`${getBlockStyles(sb.type)} w-2.5 h-2.5 rounded-sm border-b shadow-xs flex items-center justify-center`}>
                  <BlockIcon type={sb.type} className="w-1.5 h-1.5" />
                </div>
              ))}
              {(!block?.subBlocks || block.subBlocks.length < 3) && isSelected && (
                <div className="w-2.5 h-2.5 rounded-sm bg-white/20 border border-dashed border-white/40 flex items-center justify-center animate-pulse">
                  <Plus size={6} strokeWidth={4} />
                </div>
              )}
            </div>
            
            {/* Repeat Counter */}
            <div className="bg-black/20 rounded-sm px-0.5 py-0 flex items-center justify-center h-2.5">
               <select 
                  value={block?.value || 2}
                  onChange={(e) => { e.stopPropagation(); onUpdateValue?.(parseInt(e.target.value)); }}
                  className="bg-transparent text-[6px] font-bold text-white border-none p-0 h-2 leading-none focus:ring-0 appearance-none text-center w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {[2, 3, 4, 5].map(v => <option key={v} value={v} className="text-black">{v}x</option>)}
                </select>
            </div>
          </div>
        </>
      )}

      {/* Remove Button - Scaled down for tiny blocks */}
      {!isTemplate && onRemove && (
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[7px] font-bold shadow-sm border border-white transition-transform hover:scale-110 active:scale-125 z-20"
        >
          ✕
        </button>
      )}

      {/* Selected Indicator for Repeat - Scaled down */}
      {isSelected && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-[5px] font-bold px-1 py-0.5 rounded-full shadow-sm border border-orange-100 whitespace-nowrap animate-bounce">
          LOOP
        </div>
      )}
    </div>
  );
};

export default Block;
