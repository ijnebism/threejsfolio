import React, { useState, useRef, useEffect } from "react";

function DraggableApp({
  label,
  initialX,
  initialY,
  maxX,
  maxY,
  image,
  onOpen,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const dragData = useRef({ scaleX: 1, scaleY: 1, dragging: false });
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragData.current.dragging) return;
      setPosition((pos) => {
        let newX = pos.x + e.movementX / (dragData.current.scaleX || 1);
        let newY = pos.y + e.movementY / (dragData.current.scaleY || 1);
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        return { x: newX, y: newY };
      });
    };

    const handleMouseUp = () => {
      dragData.current.dragging = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    const scaleX = rect.width / windowRef.current.offsetWidth || 1;
    const scaleY = rect.height / windowRef.current.offsetHeight || 1;

    dragData.current.scaleX = scaleX;
    dragData.current.scaleY = scaleY;
    dragData.current.dragging = true;
  };

  const handleDoubleClick = () => {
    onOpen(position);
  };

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col items-center text-white text-xs select-none"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-12 h-12 rounded-md bg-slate-900/80 border border-slate-600 flex items-center justify-center">
        {image && <img src={image} alt={label} className="w-10 h-10" />}
      </div>
      <span className="mt-1 max-w-20 text-center drop-shadow">{label}</span>
    </div>
  );
}

export default DraggableApp;
