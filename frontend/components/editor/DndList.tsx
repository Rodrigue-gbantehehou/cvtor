"use client"
import React, { useRef } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export type Item = { index: number; id: string; label: string; type: string }

function Row({ item, move, selected, onSelect }: { item: Item; move: (from: number, to: number) => void; selected: boolean; onSelect: (i: number) => void }) {
  const ref = useRef<HTMLDivElement | null>(null)

  const [, drop] = useDrop<{ index: number }>(() => ({
    accept: 'SECTION',
    hover(dragItem) {
      if (!ref.current) return
      const from = dragItem.index
      const to = item.index
      if (from === to) return
      move(from, to)
      dragItem.index = to
    }
  }), [item.index])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SECTION',
    item: { index: item.index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }), [item.index])

  drag(drop(ref))

  return (
    <div ref={ref} onClick={() => onSelect(item.index)} className={`flex items-center justify-between rounded px-2 py-1 border cursor-pointer ${selected ? 'border-indigo-500 bg-slate-800/80' : 'border-slate-800 bg-slate-800/50'} ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-2">
        <span className="cursor-grab select-none text-slate-400">⋮⋮</span>
        <span>{item.label} <span className="opacity-50">({item.type})</span></span>
      </div>
    </div>
  )
}

export default function DndList({ sections, onMove, selectedIndex, onSelect }: { sections: { label: string; type: string }[]; onMove: (from: number, to: number) => void; selectedIndex?: number | null; onSelect?: (i: number) => void }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-1">
        {sections.map((s, idx) => (
          <Row key={`${s.label}-${idx}`} item={{ index: idx, id: `${idx}`, label: s.label, type: s.type }} move={onMove} selected={selectedIndex===idx} onSelect={(i)=>onSelect && onSelect(i)} />
        ))}
      </div>
    </DndProvider>
  )
}
