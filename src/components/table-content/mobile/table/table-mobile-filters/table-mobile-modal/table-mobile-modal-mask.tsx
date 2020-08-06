import React, { CSSProperties } from 'react';

export interface ITableMobileModalMaskProps {
  style: CSSProperties;
}

export function TableMobileModalMask({ style }: ITableMobileModalMaskProps) {
  return (
    <>
      <style jsx>{`
        div.mask {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
      `}</style>
      <div style={style} className="mask" />
    </>
  );
}
