// This type is what gets stored in the state for FunctionManager
// We need these keys to map over and generate our function cards
export type FunctionBlockState = {
  key: number;
  equation: string;
  nextBlockIndex: number;
  title: string;
}

// This type is the config expected for a single block (function card)
// title - the title of the Function Card (displayed on top)
// nextBlock - 0 based index of which card to point next to 
//   the first card has index 0, so start with 1 onwards
//   the last card which should yeild its output to the output value field should have nextBlock = -1
export type BlockConfig = {
  title: string;
  nextBlock: number;
};

// The props that FunctionManager takes
export type FunctionManagerProps = {
  blockConfig: BlockConfig[]
};