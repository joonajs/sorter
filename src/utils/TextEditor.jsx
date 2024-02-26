import React from 'react';
import { FixedSizeList as List } from 'react-window';

function TextEditor({ text, onTextChange }) {
  const lines = text ? text.split('\n') : [];
  const totalLines = text ? (text.endsWith('\n') ? lines.length - 1 : lines.length) : 0;
  const Row = ({ index, style }) => (
      <div style={style} className="text-row">
          {lines[index]}
      </div>
  );

  return (
    <div className="overflow-hidden max-w-full bg-zinc-800  text-white">
      <div className='px-2'>
      <List
        height={600}
        itemCount={lines.length}
        itemSize={24}
        width={'100%'}
        className='whitespace-nowrap overflow-x-auto'
      >
        {Row}
      </List>
      </div>
      <div className="px-4 py-2 bg-zinc-800 text-right">
        <p className='text-zinc-500 border-zinc-500 text-sm'>
          Total Lines: {totalLines}
        </p>
      </div>
    </div>
  );
}



export default TextEditor;
