import React, { useEffect, useRef } from 'react';
import familyData from '../data/SimpleFamilyData.json';
import './style.css';

export default function SimpleTree() {
  const chartRef = useRef(null);
  const treeInstance = useRef(null);

  useEffect(() => {
    if (!window.FamilyTree || !chartRef.current) return;

    treeInstance.current = new window.FamilyTree(chartRef.current, {
      template: 'base', // or 'isla', 'ana', etc.
      nodeBinding: {
        field_0: 'name',
        img_0: 'photo', // Bind image field
      },
      nodes: familyData,
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

  return <div ref={chartRef} className="family-chart-container" />;
}
