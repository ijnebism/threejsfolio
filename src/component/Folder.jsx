import React, { useRef, useState, useEffect } from "react";
import DraggableApp from "./DraggableApp";

function Folder({ apps }) {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[600px] h-[400px] bg-slate-900/70  overflow-hidden"
    >
      {bounds.width > 0 &&
        apps.map((app) => (
          <DraggableApp
            key={app.id}
            label={app.label}
            image={app.image}
            initialX={app.initialX}
            initialY={app.initialY}
            maxX={600 - 48}
            maxY={400 - 68}
            onOpen={() => {
              // Hook this up to open a DraggableWindow if you want
              console.log("Open inside folder:", app.label);
            }}
          />
        ))}
    </div>
  );
}

export default Folder;
