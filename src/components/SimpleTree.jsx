import React, { useEffect, useRef } from 'react';

export default function SimpleTree() {
  const chartRef = useRef(null);
  const treeInstance = useRef(null);

  useEffect(() => {
    if (!window.FamilyTree || !chartRef.current) return;

    treeInstance.current = new window.FamilyTree(chartRef.current, {
      template: 'base',
      nodeBinding: {
        field_0: 'name',
      },
      nodes: [
        { id: 1, pids: [2], name: 'parent 1' },
        { id: 2, pids: [1], name: 'parent 2' },
        { id: 3, fid: 1, mid: 2, name: 'first child' },
        { id: 4, fid: 1, mid: 2, name: 'second child' },
      ],
    });

    return () => {
      if (treeInstance.current?.destroy) {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn('destroy error:', err);
        }
      }
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100vh', direction: 'rtl' }}
    />
  );
}
