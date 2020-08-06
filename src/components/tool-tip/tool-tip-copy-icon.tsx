import React from 'react';

import { ICON } from 'components/svg';
import { LIGHT_PURPLE_TEXT } from 'data/data-style';

export interface IToolTipCopyIconProps {
  isCopied: boolean;
}

export function ToolTipCopyIcon(props: IToolTipCopyIconProps) {
  return (
    <>
      <style jsx>{`
        div.icon {
          margin-right: 10px;
          color: ${LIGHT_PURPLE_TEXT};
          cursor: pointer;
        }
      `}</style>
      <div className="icon">{props.isCopied ? ICON.CheckToolTip : ICON.CopyToolTip}</div>
    </>
  );
}
