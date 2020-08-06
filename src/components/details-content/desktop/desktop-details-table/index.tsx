import React from 'react';

import { CardView } from 'components/card-view';

import { CARD_GAP } from '..';

export interface IDesktopDetailsTableProps {
  children: JSX.Element;
}

export function DesktopDetailsTable(props: IDesktopDetailsTableProps) {
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsTable {
          margin-top: ${CARD_GAP}px;
          padding-bottom: 60px;
        }
      `}</style>
      <div className="DesktopDetailsTable">
        <CardView style={{ padding: 0 }}>{props.children}</CardView>
      </div>
    </>
  );
}
