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
        { id: 1, pids: [2], name: 'پدر' },
        { id: 2, pids: [1], name: 'مادر' },
        { id: 3, fid: 1, mid: 2, name: 'فرزند اول' },
        { id: 4, fid: 1, mid: 2, name: 'فرزند دوم' },
      ],
    });

    return () => {
      if (treeInstance.current?.destroy) {
        try {
          treeInstance.current.destroy();
        } catch (err) {
          console.warn('خطا هنگام destroy:', err);
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
