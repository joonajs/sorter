import React, { useState } from 'react';
import TextEditor from './TextEditor';
import { MdOutlineTextRotateVertical, MdOutlineAutoAwesome, MdOutlineFileDownload, MdOutlinePlaylistRemove } from "react-icons/md";
import { CSSTransition, TransitionGroup } from 'react-transition-group';



function TextSorter({ text: initialText, handleTextChange }) {
  const [text, setText] = useState(initialText);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const addToast = (message, type = 'info') => {
    const newToast = { id: Date.now(), message, type };
    setToasts((currentToasts) => [...currentToasts, newToast]);
    setTimeout(() => {
        removeToast(newToast.id);
    }, 3000);
};


const removeToast = (id) => {
  setToasts((currentToasts) => currentToasts.filter(toast => toast.id !== id));
};



const sortText = () => {
  let lines = text.split('\n');
  if (removeEmptyLines) {
    lines = lines.filter(line => line.trim() !== '');
  }
  const sortedText = lines.sort().join('\n');
  setText(sortedText);
  addToast('Sorted text successfully!');
  setShowToast(true); // Show the toast
  setTimeout(() => setShowToast(false), 3000); 
};

  const toggleRemoveEmptyLines = () => {
    setRemoveEmptyLines(!removeEmptyLines);
    addToast('Removed empty lines successfully!');
    setShowToast(true); // Show the toast
    setTimeout(() => setShowToast(false), 3000);
  };

  React.useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
        addToast('Text copied successfully!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
};

  
  const updateText = () => {
    let lines = text.split('\n');
    if (removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }
    setText(lines.join('\n'));
  };
  
  React.useEffect(() => {
    updateText();
  }, [removeEmptyLines]);
  

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Generate a random string
    const randomString = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
    link.download = 'sorted-' + randomString + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Document downloaded successfully!');
    setShowToast(true); // Show the toast
    setTimeout(() => setShowToast(false), 3000); 
  };

 

  return (
    <div>
<div className="fixed bottom-10 right-10 space-y-2 z-50 gap-5">
    <TransitionGroup>
    {toasts.map((toast) => (
    <CSSTransition key={toast.id} timeout={300} classNames="toast">
        <div className="bg-zinc-800 text-white py-2 px-4 flex items-center z-50 mb-1">
            {toast.type === 'info' && <MdOutlineAutoAwesome className="mr-2" />}
            {toast.type === 'error' && <MdOutlinePlaylistRemove className="mr-2" />}
            {toast.message}
        </div>
    </CSSTransition>
))}

    </TransitionGroup>
</div>
    <div className='max-w-full mx-auto bg-zinc-800'>
      <div className="flex items-center p-1 bg-zinc-900">
        <button 
          onClick={sortText} 
          className="px-4 py-2 bg-zinc-900 text-white active:px-6 border-b-2 active:border-b-2 hover:bg-zinc-800 focus:outline-none focus:ring-0 focus:ring-gray-700 transition-all duration-300 ease-in-out font-medium text-sm"
        >
          <MdOutlineTextRotateVertical /> Sort Text
        </button>
        <button 
          onClick={toggleRemoveEmptyLines}
          className="ml-2 px-4 py-2 bg-zinc-900 text-white active:px-6 border-b-2 active:border-b-2 hover:bg-zinc-800 focus:outline-none focus:ring-0 focus:ring-green-400 transition-all duration-300 ease-in-out font-medium text-sm"
        >
         <MdOutlinePlaylistRemove /> Remove Empty Lines
        </button>
        <button 
          onClick={handleCopy}
          className="ml-2 px-4 py-2 bg-zinc-900 text-white active:px-6 border-b-2 active:border-b-2 hover:bg-zinc-800 focus:outline-none focus:ring-0 focus:ring-blue-400 transition-all duration-300 ease-in-out font-medium text-sm"
        >
          <MdOutlineAutoAwesome /> Copy Text
        </button>
        <button 
          onClick={handleDownload}
          className="ml-2 px-4 py-2 bg-zinc-900 text-white active:px-6 border-b-2 active:border-b-2 hover:bg-zinc-800 focus:outline-none focus:ring-0 focus:ring-green-400 transition-all duration-300 ease-in-out font-medium text-sm"
        >
          <MdOutlineFileDownload /> Download Text
        </button>
      </div>
      
      <TextEditor text={text} onTextChange={handleTextChange} />
    </div>
    </div>
  );
}



export default TextSorter;