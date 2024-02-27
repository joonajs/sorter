import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';

function FileUploader({ onFileLoad }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const processChunk = (chunk) => {
    return chunk;
  };

  const readAndProcessFile = (file) => {
    setIsLoading(true);
    setSelectedFile(file.name);
    setProgress(0);

    const chunkSize = 1024 * 1024; // 1MB
    let offset = 0;
    let processedText = '';

    const reader = new FileReader();
    reader.onload = (e) => {
      const textChunk = processChunk(e.target.result);
      processedText += textChunk;

      const percentage = Math.min(100, (offset / file.size) * 100);
      setProgress(percentage);

      offset += chunkSize;
      if (offset < file.size) {
        const nextChunk = file.slice(offset, offset + chunkSize);
        reader.readAsText(nextChunk);
      } else {
        setIsLoading(false);
        onFileLoad(processedText);
      }
    };

    const firstChunk = file.slice(0, chunkSize);
    reader.readAsText(firstChunk);
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;
    readAndProcessFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      readAndProcessFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragOver) setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dragOver) setDragOver(false);
  };

  return (
    <div className={` mx-auto p-6  w-full bg-zinc-900  min-w-3.5 float-right text-white  duration-300 ease-in-out ${dragOver ? ' border-green-500' : 'bg-gray-200'} transition-all`}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}>
      <div className={`p-6 mt-2 hover:p-10 hover:border-green-500 hover:border-4 ${dragOver ? 'border-green-500 bg-green-500 border-4' : 'border-gray-500'} bg-zinc-800 cursor-pointer transition-all duration-300 ease-in-out rounded-3xl`}
           onClick={() => document.getElementById('fileInput').click()}>
        <input 
          id="fileInput"
          type="file" 
          onChange={handleFileChange} 
          className="hidden"
          disabled={isLoading}
        />
        <p className="text-center text-sm transition-all duration-700">{dragOver ? "Release drag to select the file" : "Drag and drop a file here or click to select a file"}</p>
      </div>
      {isLoading && <ProgressBar completed={progress} />}
      {!isLoading && selectedFile && <div className="mt-4 text-sm text-center">File uploaded: <span className="font-bold">{selectedFile}</span></div>}
    </div>
  );
}

export default FileUploader;
