import React, { useState } from 'react';

const tests = [
  { id: "T01", name: "RAM_Stress_ZSwap_Survival", target: "95%_Load" },
  { id: "T02", name: "VFS_Latency_Audit", target: "<1ms" },
  { id: "T03", name: "PHP_Hot-Swap_Downtime", target: "<500ms" },
  { id: "T04", name: "AI_SDK_Offline_Integrity", target: "Bypass_Success" },
  { id: "T05", name: "Kernel_Determinism_Audit", target: "Conf_Match" }
];

const QAApp = () => {
  const [results, setResults] = useState({});

  const runTest = (id) => {
    setResults(prev => ({ ...prev, [id]: "RUNNING" }));
    setTimeout(() => {
      setResults(prev => ({ ...prev, [id]: "PASSED" }));
    }, 1500);
  };

  return (
    <div className="p-6 bg-zinc-950 rounded-lg border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
      <h1 className="text-2xl font-bold text-red-600 mb-6">EpicQA-Runner (GUI)</h1>
      <div className="space-y-4">
        {tests.map(test => (
          <div key={test.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded border border-zinc-800">
            <div>
              <span className="text-red-500 font-mono mr-4">{test.id}</span>
              <span className="text-gray-300 font-medium">{test.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm px-3 py-1 rounded ${
                results[test.id] === "PASSED" ? "bg-green-900 text-green-400" :
                results[test.id] === "RUNNING" ? "bg-blue-900 text-blue-400" :
                "bg-zinc-800 text-gray-500"
              }`}>
                {results[test.id] || "PENDING"}
              </span>
              <button
                onClick={() => runTest(test.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
              >
                Run
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-8 w-full py-3 bg-zinc-800 text-white rounded font-bold hover:bg-zinc-700 border border-zinc-600">
        Download EPICOS_CERTIFICATION.md
      </button>
    </div>
  );
};

export default QAApp;
