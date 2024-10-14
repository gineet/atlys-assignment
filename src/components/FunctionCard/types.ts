import { InputOutputConnectorProps } from '../InputOutputConnector/types';

export type FunctionCardProps = {
  blockKey: number;
  title: string;
  updateEquation: (equation: string, blockKey: number) => void;
  connectorRefs: InputOutputConnectorProps['connectorRefs'];
}
