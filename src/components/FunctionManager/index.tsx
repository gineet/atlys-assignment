// Library imports
import { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react';

// TS Types
import type { FC, ChangeEvent } from 'react';
import type { FunctionCardProps } from '../FunctionCard/types';
import type { FunctionManagerProps, FunctionBlockState } from './types';

// Hooks
import useLineDrawer from '../../hooks/useLineDrawer';

// Components
import FunctionCard from '../FunctionCard';
import FlowConnector from '../FlowConnector';

// Utils
import { getInitialFunctionBlockState } from '../../utils/equation';


const FunctionManager: FC<FunctionManagerProps> = ({
  blockConfig
}) => {
  const [initialUserValue, setInitialUserValue] = useState<number>(1);
  const [finalValue, setFinalValue] = useState<number>();
  const [blocks, setBlocks] = useState<FunctionBlockState[]>(
    () => getInitialFunctionBlockState(blockConfig)
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParentRef = useRef<HTMLDivElement | null>(null);
  const { allRefs, drawLine, clearCanvas } = useLineDrawer({
    pairCount: (blockConfig.length + 1),
    canvasRef: canvasRef,
    canvasParentRef: canvasParentRef
  });

  // The function picks the refs from the array and figures out which 
  // input and output slots to connect through a line and draws it.
  const generatePairsAndDrawLines = useCallback(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) {
      return;
    }

    // Clear canvas before drawing
    clearCanvas();

    // Line from user input to Function 1
    drawLine(canvasEl, allRefs.current[0], allRefs.current[1]);

    // Line between all intermediate blocks
    let prevBlockIndex = 0;
    while (true) {
      const currentBlockIndex = blocks[prevBlockIndex].nextBlockIndex;

      // Break when we reach the last block
      if (currentBlockIndex === -1) {
        break;
      }

      drawLine(canvasEl, allRefs.current[(prevBlockIndex * 2) + 2], allRefs.current[(currentBlockIndex * 2) + 1]);
      prevBlockIndex = currentBlockIndex;
    }

    // Line between the last block to the final output value
    drawLine(canvasEl, allRefs.current[(prevBlockIndex * 2) + 2], allRefs.current[allRefs.current.length - 1]);
    // setHasDrawn(true);
  }, [allRefs, blocks, clearCanvas, drawLine]);

  // This function gets called whenever there's a change in equation to do recalculation
  const recalculate = useCallback(() => {
    let currentBlock = blocks[0];
    let result = initialUserValue;

    while (true) {
      if (currentBlock.equation) {
        const replacedEquation = currentBlock.equation.replace(/x/g, String(result));
        // TODO: Can replace with a safer implementation using math.js or something if needed
        result = eval(replacedEquation);
      }

      // If this is the last block, break out
      if (currentBlock.nextBlockIndex === -1) {
        break;
      }
      
      // Otherwise, move to the next block in order
      currentBlock = blocks[currentBlock.nextBlockIndex];
    }
    setFinalValue(result);
  }, [blocks, initialUserValue]);

  // Handles the onChange event for the initial value user input field
  const handleUserValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const numVal = Number(value);
    setInitialUserValue(Number.isNaN(numVal) ? 0 : numVal);
  };

  // Handles the updation of equations in the state, passed as callback to individual 
  // function cards. This is called whenever a valid equation is entered.
  const handleEquationUpdate: FunctionCardProps['updateEquation'] = useCallback(
    (updatedEquation, blockKey) => {
      setBlocks(prevConfig => prevConfig.map(block => {
        if (block.key !== blockKey) return block;

        return {
          key: block.key,
          title: block.title,
          equation: updatedEquation,
          nextBlockIndex: block.nextBlockIndex,
        };
      }));
    },
    []
  );

  useLayoutEffect(() => {
    generatePairsAndDrawLines();
  }, [generatePairsAndDrawLines]);

  useEffect(() => {
    recalculate();
  }, [blocks, initialUserValue, recalculate]);


  return (
    <div
      ref={canvasParentRef}
      className='w-3/4 mx-auto mt-40 grid grid-cols-[auto_1fr_auto] gap-x-[9px] relative'
    >
      {/* Initial Value Input */}
      <div className='justify-self-end relative top-[10.625rem]'>
        <p className='font-semibold text-white text-xs leading-atlys-regular py-1 px-3 text-center bg-atlys-yellow-800 rounded-[14px]'>
          Initial value of x
        </p>
        <div className='grid grid-cols-[1fr_max-content] border-2 rounded-2xl border-atlys-yellow-200 mt-2'>
          <input
            className='min-w-[4.5rem] max-w-[4.5rem] py-[0.875rem] pl-[1.25rem] rounded-2xl focus:border-0 outline-0 font-bold text-lg leading-atlys-regular'
            value={initialUserValue}
            onChange={handleUserValueChange}
          />
          <FlowConnector
            classes='px-[13.5px] border-l border-atlys-yellow-100'
            // @ts-expect-error --- Add ref callback function typing to props
            ref={el => (allRefs.current[0] = el)}
          />
        </div>
      </div>

      {/* Function Blocks */}
      <div className='flex flex-wrap justify-around gap-x-[calc((100%-45rem)/2)] gap-y-28'>
        {blocks.map((block, index) => (
          <FunctionCard
            key={block.key}
            title={block.title}
            blockKey={block.key}
            updateEquation={handleEquationUpdate}
            connectorRefs={{
              // @ts-expect-error // TODO: Update prop types to take a callback ref function
              refInput: el => allRefs.current[(index* 2 ) + 1] = el,
              // @ts-expect-error // TODO: Update prop types to take a callback ref function
              refOutput: el => allRefs.current[(index * 2) + 2] = el,
            }}
          />
        ))}
      </div>

      {/* Final Value Output */}
      <div className='justify-self-start relative top-[10.875rem]'>
        <p className='inline-block font-semibold text-white text-xs leading-tight px-4 py-1 bg-atlys-green-800 rounded-[14px]'>
          Final Output y
        </p>
        <div className='grid grid-cols-[max-content_1fr] border-2 rounded-2xl border-atlys-green-200 w-28 mt-2'>
          <FlowConnector
            classes='px-[13.5px] border-r border-atlys-green-100'
            // @ts-expect-error --- Add ref callback function typing to props
            ref={el => allRefs.current[allRefs.current.length - 1] = el}
          />
          <p className='py-2 pr-4 flex-grow rounded-2xl font-bold text-lg leading-tight text-center'>
            {finalValue}
          </p>
        </div>
      </div>
      <canvas ref={canvasRef} className='-z-10 absolute top-0 left-0' width='10' height='10'></canvas>
    </div>
  );
};

export default FunctionManager;