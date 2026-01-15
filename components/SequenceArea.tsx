
import React from 'react';
import { BlockType, CodeBlock } from '../types';
import Block from './Block';
import { Undo2, Play, RotateCcw, Trash2 } from 'lucide-react';

interface SequenceAreaProps {
  program: CodeBlock[];
  maxSlots: number;
  activeBlockId: string | null;
  selectedRepeatId: string | null;
  isExecuting: boolean;
  historyLength: number;
  onRemoveBlock: (id: string, parentId?: string) => void;
  onUpdateRepeatValue: (id: string, value: number) => void;
  onToggleSelectRepeat: (id: string) => void;
  onUndo: () => void;
  onRun: () => void;
  onReset: (clear?: boolean) => void;
}

const SequenceArea: React.FC<SequenceAreaProps> = ({
  program,
  maxSlots,
  activeBlockId,
  selectedRepeatId,
  isExecuting,
  historyLength,
  onRemoveBlock,
  onUpdateRepeatValue,
  onToggleSelectRepeat,
  onUndo,
  onRun,
  onReset
}) => {
  return (
    <div className="flex-1 bg-slate-50/30 p-2 overflow-hidden flex flex-col gap-2 relative">
      {/* Scrollable Container */}
      <div className="flex-1 bg-white/60 rounded-2xl border border-slate-200/50 p-2 shadow-inner overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-16 gap-1.5 content-start">
            {Array.from({ length: maxSlots }).map((_, i) => {
                const block = program[i];
                return (
                    <div key={block?.id || i} className="relative aspect-square">
                        {block ? (
                            <Block 
                                block={block}
                                type={block.type} 
                                onRemove={() => onRemoveBlock(block.id)} 
                                onUpdateValue={(val) => onUpdateRepeatValue(block.id, val)}
                                isActive={activeBlockId === block.id}
                                isSelected={selectedRepeatId === block.id}
                                onSelect={() => onToggleSelectRepeat(block.id)}
                            />
                        ) : (
                            <div className="w-full h-full border border-dashed border-slate-200/60 rounded-lg flex items-center justify-center text-[8px] font-bold text-slate-300 transition-colors">
                                {i+1}
                            </div>
                        )}
                    </div>
                );
            })}
          </div>
      </div>

      {/* Control Strip */}
      <div className="flex gap-2 h-14 shrink-0 px-1">
            <button 
              onClick={onUndo} 
              disabled={historyLength === 0 || isExecuting} 
              className={`w-14 h-full flex items-center justify-center rounded-2xl shadow-sm border transition-all active:scale-95 ${historyLength === 0 || isExecuting ? 'bg-slate-100 border-slate-200 text-slate-300 opacity-50' : 'bg-white border-sky-100 text-sky-500 hover:bg-sky-50'}`}
              title="Undo last action"
            >
                <Undo2 size={24} strokeWidth={3} />
            </button>
            
            <button 
              onClick={onRun} 
              disabled={isExecuting || program.length === 0} 
              className={`flex-1 font-game text-white rounded-2xl shadow-lg transition-all text-sm tracking-widest flex items-center justify-center gap-2 ${isExecuting || program.length === 0 ? 'bg-slate-300 border-b-4 border-slate-400 opacity-80 cursor-not-allowed' : 'bg-green-500 border-b-4 border-green-700 hover:bg-green-600 active:border-b-0 active:translate-y-1'}`}
              title="Run code"
            >
                <Play size={22} fill="currentColor" /> {isExecuting ? 'RUNNING...' : 'RUN PROGRAM'}
            </button>
            
            <button 
              onClick={() => onReset(false)} 
              className="bg-sky-400 border-b-4 border-sky-600 text-white rounded-2xl w-14 h-full flex items-center justify-center shadow transition-all active:border-b-0 active:translate-y-1"
              title="Restart Level"
            >
                <RotateCcw size={24} strokeWidth={3} />
            </button>
            
            <button 
              onClick={() => onReset(true)} 
              className="bg-rose-400 border-b-4 border-rose-600 text-white rounded-2xl w-14 h-full flex items-center justify-center shadow transition-all active:border-b-0 active:translate-y-1"
              title="Clear All Code"
            >
                <Trash2 size={24} strokeWidth={3} />
            </button>
      </div>
    </div>
  );
};

export default SequenceArea;
