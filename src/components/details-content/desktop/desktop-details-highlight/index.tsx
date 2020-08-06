import React from 'react';

import { CardView } from 'components/card-view';
import { DetailsHighlightValue } from 'components/details-content/common/details-highlight-value';
import { CARD_PURPLE, MAIN_TABLE_PADDING, WHITE } from 'data/data-style';
import { IDetailsHighlightProps } from 'models/models-details-general';

import { CARD_GAP } from '..';

export function DesktopDetailsHighlight(props: IDetailsHighlightProps) {
  const { style, title, tooltipContentToCopy, unit, value } = props;
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsHighlight {
          width: calc(40% - ${CARD_GAP * 0.5}px);
        }
        div.title {
          color: ${WHITE};
          font-size: 22px;
          line-height: 26px;
        }
        div.line {
          height: 2px;
          width: 100%;
          margin-top: 48px;
          background-color: ${WHITE};
          opacity: 0.2;
        }
      `}</style>
      <div className="DesktopDetailsHighlight">
        <CardView
          style={{
            backgroundColor: CARD_PURPLE,
            height: `calc(100% - ${MAIN_TABLE_PADDING * 2}px)`,
            ...style,
          }}
        >
          <div className="title">{title}</div>
          <DetailsHighlightValue
            tooltipContentToCopy={tooltipContentToCopy}
            value={value}
            unit={unit}
          />
          <div className="line" />
        </CardView>
      </div>
    </>
  );
}
