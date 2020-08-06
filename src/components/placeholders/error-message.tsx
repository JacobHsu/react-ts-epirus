import React, { CSSProperties } from 'react';

import { FAINT_GREY } from 'data/data-style';

export interface IErrorMessageProps {
  style?: CSSProperties;
  children: string;
}

export function ErrorMessage(props: IErrorMessageProps) {
  const { children, style } = props;
  return (
    <>
      <style jsx>{`
        div.ErrorMessage {
          color: ${FAINT_GREY};
          width: 100%;
          font-size: 22px;
          line-height: 26px;
          padding: 42px 0;
          text-align: center;
        }
      `}</style>
      <div style={style} className="ErrorMessage">
        {children}
      </div>
    </>
  );
}
