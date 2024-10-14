import { forwardRef } from 'react';
import type { FC } from 'react';

type FlowConnectorProps = {
  classes?: string;
};

// Stateless UI component for the socket/circles next input and output points of the cards
const FlowConnector: FC<FlowConnectorProps> = forwardRef<HTMLDivElement, FlowConnectorProps>(
  ({ classes = '' }, ref) => {
    return (
      <div className={`flex justify-center items-center ${classes}`}>
        <div className='h-4 w-4 rounded-full border-2 border-atlys-grey-100 flex items-center justify-center'>
          <div ref={ref} className='h-2 w-2 rounded-full bg-atlys-blue-300' />
        </div>
      </div>
    );
  }
);

export default FlowConnector;
