import { useState, memo } from 'react';
import type { FC, ChangeEvent } from 'react';

import { validateEquation } from '../../utils/equation';
import type { EquationInputProps } from './types';

const EquationInput: FC<EquationInputProps> = ({
  handleEquationUpdate,
}) => {
  const [equation, setEquation] = useState<string>('');
  const [equationError, setEquationError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const equationInput = value.trim();
    setEquation(equationInput);
    
    const { isValidEquation, error } = validateEquation(equationInput);
    setEquationError(error);

    // Trigger recalculation if a valid equation was entered
    if (isValidEquation) {
      handleEquationUpdate(equationInput);
    }
  }

  return (
    <div className='text-atlys-grey-500 text-xs font-medium leading-atlys-regular'>
      <label className='block mb-1'>Equation</label>
      <input
        className='block w-full border border-atlys-grey-200 rounded-lg py-[9px] px-3'
        value={equation}
        onChange={handleChange}
      />
      {equationError ? (
         <p className='text-[8px] text-red-500'>{equationError || ''}</p>
      ) : (
        <p className='text-[8px] text-red-500'>&nbsp;</p>
      )}
     
    </div>
  )
};

export default memo(EquationInput);
