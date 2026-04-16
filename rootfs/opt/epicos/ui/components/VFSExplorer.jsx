import React, { useState, useEffect } from 'react';

const VFSExplorer = () => {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await fetch('/dev/shm/epicos_tree.json');
        const data = await response.json();
        setTree(data);
      } catch (e) {
        console.error("VFS Load Error", e);
      }
    };
    fetchTree();
    const interval = setInterval(fetchTree, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderNode = (node) => (
    <div key={node.path} className="ml-4">
      <div className={node.is_dir ? "font-bold text-blue-400" : "text-gray-300"}>
        {node.is_dir ? "📁" : "📄"} {node.name}
      </div>
      {node.children && Object.values(node.children).map(renderNode)}
    </div>
  );

  return (
    <div className="h-full bg-zinc-900 p-4 overflow-auto border-r border-zinc-700">
      <h2 className="text-xl text-white mb-4">VFS Explorer (RAM Index)</h2>
      {tree ? renderNode(tree) : <div className="text-gray-500">Loading Index...</div>}
    </div>
  );
};

export default VFSExplorer;
