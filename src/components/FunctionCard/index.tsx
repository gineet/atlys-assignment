import { useCallback, memo } from 'react';
import type { FC } from 'react';

import EquationInput from '../EquationInput';
import cardIcon from '../../assets/card-icon.svg';

import { FunctionCardProps } from './types';
import InputOutputConnector from '../InputOutputConnector';
import Select from '../Select';

// Represents one function card with the equation input in it
const FunctionCard: FC<FunctionCardProps> = ({
  title,
  blockKey,
  updateEquation,
  connectorRefs
}) => {
  const handleEquationUpdate = useCallback((equation: string) => {
    // Before sending it to the function manager through the callback, we replace
    // the exponentiation operator (^) with (**) so that we can eval it.
    const evalEquation = equation.replace(/\^/g, '**')
    updateEquation(evalEquation, blockKey);
  }, [blockKey, updateEquation]);

  return (
    <div className='w-[14.6875rem] border border-atlys-grey-300 rounded-2xl px-5 pt-4 pb-[1.125rem] shadow-function-card'>
      <div className='flex items-center gap-x-2 mb-5'>
        <img src={cardIcon} />
        <h3 className='text-atlys-white-200 font-semibold text-sm leading-atlys-regular'>{title}</h3>
      </div>
      <EquationInput handleEquationUpdate={handleEquationUpdate} />
      <div className='mt-[2px] mb-12 text-xs leading-atlys-regular font-medium text-atlys-grey-500'>
        <Select label='Next function' selected='Function' />
      </div>
      <InputOutputConnector connectorRefs={connectorRefs} />
    </div>
  )
};

export default memo(FunctionCard);
