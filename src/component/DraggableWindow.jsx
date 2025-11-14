import React, { useState, useRef, useEffect } from "react";

function DraggableWindow({
  title,
  maxX,
  maxY,
  initialX,
  initialY,
  onClose,
  children,
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

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col items-center text-white text-xs select-none"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="bg-gray-800 w-full cursor-move px-2 py-1 text-2xl"
        onMouseDown={handleMouseDown}
      >
        <div>{title}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className=" absolute top-0 right-0 m-1 text-white font-bold hover:text-red-500"
        >
          ×
        </button>
      </div>
      <div className="bg-white text-black p-2">{children}</div>
    </div>
  );
}

export default DraggableWindow;
