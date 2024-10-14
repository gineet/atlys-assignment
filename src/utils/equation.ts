import type { BlockConfig, FunctionBlockState } from '../components/FunctionManager/types';

type ValidateEquationReturnType = {
  isValidEquation: boolean;
  error: string | null;
}

export const validateEquation = (equationInput: string): ValidateEquationReturnType => {
  // The regex to test the entered equation against
  // This checks whether there are at least two operands (a digit and the variable x) with
  // an operator in between, and that all operands have an operand on each side
  const VALID_EQUATION = /^\s*(\d+(\.\d+)?|x)\s*([+\-*/^]\s*(\d+(\.\d+)?|x)\s*)+$/;

  const result: ValidateEquationReturnType = {
    isValidEquation: true,
    error: null,
  };

  if (equationInput !== '' && !VALID_EQUATION.test(equationInput)) {
    result.isValidEquation = false;
    result.error = 'Please enter a valid equation';
  } 

  return result;
};

export const getInitialFunctionBlockState = (config: BlockConfig[]): FunctionBlockState[] => {
  return config.map((item, index) => ({
    equation: '',
    key: index,
    title: item.title,
    nextBlockIndex: item.nextBlock,
  }));
};
