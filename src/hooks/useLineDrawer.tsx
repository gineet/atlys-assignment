import { useRef, useLayoutEffect } from 'react';
import type { MutableRefObject } from 'react';

type UseLineDrawerProps = {
  pairCount: number;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  canvasParentRef: MutableRefObject<HTMLDivElement | null>;
};

type DrawLine = (
  c: HTMLCanvasElement | null,
  e1: HTMLDivElement | null,
  e2: HTMLDivElement | null
) => void;

const useLineDrawer = ({ pairCount, canvasRef, canvasParentRef }: UseLineDrawerProps) => {
  const allRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: (pairCount * 2) }, () => null)
  );

  // Receives the canvas element to draw on, and the two elements between which
  // a line has to be drawn and draws the line.
  const drawLine: DrawLine = (canvasEl, element1, element2) => {
    if (!canvasEl || !element1 || !element2) {
      return false;
    }

    const context = canvasEl.getContext('2d');
    const { x: canvasX, y: canvasY } = canvasEl.getBoundingClientRect();
    const { x: x1, y: y1, height: h1, width: w1 } = element1.getBoundingClientRect();
    const { x: x2, y: y2, height: h2, width: w2 } = element2.getBoundingClientRect();

    // Safety guard checks, just in case
    if (!canvasX || !canvasY || !context) {
      return;
    }
    if (!x1 || !y1 || !h1 || !w1) {
      return;
    }
    if (!x2 || !y2 || !h2 || !w2) {
      return;
    }

    context.strokeStyle = '#0066FF4D';
    context.lineWidth = 8;
    context.lineCap = 'round'; // to round the corners of line

    // Draw a line from previous output to current input
    context.beginPath();
    context.moveTo(x1 - canvasX + (w1/2), y1 - canvasY + (h1/2));
    context.lineTo(x2 - canvasX + (w2/2), y2 - canvasY + (h2/2));
    context.stroke();
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Resizes the canvas element to match the parent element's height and width
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvasParentRef.current;

    if (canvas && parent) {
      canvas.height = parent.clientHeight;
      canvas.width = parent.clientWidth;
    }
  }, [canvasParentRef, canvasRef]);

  return { allRefs, drawLine, clearCanvas };
};

export default useLineDrawer;
