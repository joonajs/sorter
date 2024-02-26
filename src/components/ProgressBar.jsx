// ProgressBar.jsx
function ProgressBar({ completed }) {
    return (
      <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-600 mt-2">
        <div className="bg-zinc-500 h-2.5 rounded-full shadow shadow-zinc-500/50 transition-width duration-700 ease-out" style={{ width: `${completed}%` }}></div>
      </div>
    );
}
  
export default ProgressBar;
