import React from 'react';

const AIManager = () => {
  const sdks = ["openai", "@google/generative-ai", "@anthropic-ai/sdk"];
  return (
    <div className="h-full bg-zinc-900 p-4">
      <h2 className="text-xl text-white mb-4">AI Agent Manager</h2>
      <div className="space-y-4">
        {sdks.map(sdk => (
          <div key={sdk} className="p-3 bg-zinc-800 rounded border border-zinc-700 flex justify-between items-center">
            <span className="text-gray-300">{sdk}</span>
            <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded">CONNECTED</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIManager;
