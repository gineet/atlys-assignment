// import { useState } from 'react';
import type { FC } from 'react';

import CaretIcon from '../../icons/Caret';

type SelectProps = {
  label?: string;
  isDisabled?: boolean;
  selected: string; // TODO: This will be the whole selected option object instead
};

// TODO: Haven't implemented custom Select since it's not needed at the moment for the assignment
const Select: FC<SelectProps> = ({
  label = 'Label',
  selected = 'Function',
  // isDisabled = false,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <label className='block mb-1'>{label}</label>
      <div className='relative'>
        <div className='flex justify-between items-center bg-atlys-white text-atlys-grey-200 py-[9px] px-3 border border-atlys-grey-200 rounded-lg'>
          <p>{selected}</p>
          <CaretIcon stroke='currentColor' />
        </div>
      </div>
    </>
  )
};

export default Select;
