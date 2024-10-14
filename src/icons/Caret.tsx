import type { FC } from 'react';

type CaretProps = {
  stroke?: string;
};

const Caret: FC<CaretProps> = ({
  stroke = '#2F384C',
}) => {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.25L5 4.75L8.5 1.25" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export default Caret;
