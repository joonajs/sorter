
import React from 'react';
import { useState } from 'react';
import FileUploader from './utils/FileUploader';
import TextSorter from './utils/TextSorter';
import Footer from './components/Footer';


function App() {
  const [text, setText] = useState('');

  const handleFileLoad = (fileText) => {
    setText(fileText); // This updates the text state with the file's content
  };

  return (
    <div>
    <div className='app-container min-h-screen min-w-full flex bg-white  items-center'>
      <div className=' min-w-full mx-auto p-6 '>
        <TextSorter text={text} setText={setText} />
        <FileUploader  onFileLoad={handleFileLoad} />
        
      </div>
    </div>
      <Footer />
    </div>
  );
}

export default App;
