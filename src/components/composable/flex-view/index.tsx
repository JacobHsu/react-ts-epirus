import { FlexDirectionProperty } from 'csstype';
import React, { CSSProperties, ReactNode } from 'react';

export interface IColumnViewProps {
  children: ReactNode;
  flexDirection: FlexDirectionProperty;
  style?: CSSProperties;
}

export function FlexView(props: IColumnViewProps) {
  const { children, flexDirection, style } = props;

  return <div style={{ ...style, display: 'flex', flexDirection: flexDirection }}>{children}</div>;
}
