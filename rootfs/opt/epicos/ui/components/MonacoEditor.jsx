import React from 'react';

const MonacoEditor = () => {
  return (
    <div className="h-full bg-zinc-950 flex flex-col border-r border-zinc-700">
      <div className="bg-zinc-800 p-2 text-xs text-gray-400 flex justify-between">
        <span>editor.js</span>
        <span>Auto-Snapshot: ENABLED</span>
      </div>
      <div className="flex-1 p-4 font-mono text-green-500">
        <pre>// Monaco Editor Simulation
function epicOS() {
  console.log("Welcome to EpicOS");
}
        </pre>
      </div>
    </div>
  );
};

export default MonacoEditor;
