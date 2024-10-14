import type { MutableRefObject } from 'react';

export type InputOutputConnectorProps = {
  connectorRefs: {
    refInput: MutableRefObject<HTMLDivElement>;
    refOutput: MutableRefObject<HTMLDivElement>;
  }
}