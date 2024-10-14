import type { FC } from 'react';

import FlowConnector from '../FlowConnector';
import { InputOutputConnectorProps } from './types';

// The bottom row/strip of each function card
// Contains the Input and Output text with the ports/connectors where lines meet
const InputOutputConnector: FC<InputOutputConnectorProps> = ({
  connectorRefs
}) => {
  return (
    <div className='flex justify-between text-atlys-grey-400 text-xxs'>
      <div className='flex gap-x-1 items-center'>
        <FlowConnector
          // @ts-expect-error --- Add ref callback function typing to props
          ref={connectorRefs.refInput}
        />
        <p>input</p>
      </div>

      <div className='flex gap-x-1 items-center'>
        <p>output</p>
        <FlowConnector
          // @ts-expect-error --- Add ref callback function typing to props
          ref={connectorRefs.refOutput}
        />
      </div>
    </div>
  )
};

export default InputOutputConnector;
