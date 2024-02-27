
import React from 'react';
import { useState } from 'react';
import FileUploader from './utils/FileUploader';
import TextSorter from './utils/TextSorter';

function App() {
  const [text, setText] = useState('');

  const handleFileLoad = (fileText) => {
    setText(fileText); // This updates the text state with the file's content
  };

  return (
    <div>
    <div className='app-container min-h-screen min-w-full bg-zinc-900  items-center'>
      <div className=' min-w-full mx-auto p-6 '>
        <TextSorter text={text} setText={setText} />
        <FileUploader  onFileLoad={handleFileLoad} />
        
      </div>
    </div>
    </div>
  );
}

export default App;
