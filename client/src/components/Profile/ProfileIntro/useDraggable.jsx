import { useState, useCallback } from "react";

const useDraggable = (ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(null);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setLastX(e.clientX);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setLastX(null);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) {
        return;
      }

      const delta = e.clientX - lastX;
      ref.current.scrollLeft += delta;
      setLastX(e.clientX);
    },
    [isDragging, lastX, ref]
  );

  return [isDragging, handleMouseDown, handleMouseUp, handleMouseMove];
};

export default useDraggable;
