import React from "react";

const Shell = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white border-4 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
      {/* Explorer Panel */}
      <div className="w-1/4 border-r border-zinc-800 p-4">
        <h2 className="text-red-600 font-bold mb-4">Explorer</h2>
        <div id="ram-index-tree"></div>
      </div>

      {/* Editor Panel */}
      <div className="flex-1 border-r border-zinc-800 p-4">
        <h2 className="text-red-600 font-bold mb-4">EpicEditor</h2>
        <textarea className="w-full h-full bg-zinc-900 text-zinc-300 p-4 font-mono outline-none border border-zinc-700"></textarea>
      </div>

      {/* AI Manager Panel */}
      <div className="w-1/4 p-4">
        <h2 className="text-red-600 font-bold mb-4">AI Manager</h2>
        <div className="space-y-4">
          <div className="bg-zinc-800 p-2 rounded">Status: Deterministic</div>
          <button className="w-full bg-red-600 hover:bg-red-700 p-2 rounded">New AI Instance</button>
        </div>
      </div>
    </div>
  );
};

export default Shell;
