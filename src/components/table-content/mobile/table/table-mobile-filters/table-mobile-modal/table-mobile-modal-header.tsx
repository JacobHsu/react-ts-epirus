import React from 'react';

import { DARK_PURPLE, FONT_WEIGHT_TITLE } from 'data/data-style';

import { TableMobileModalCross } from './table-mobile-modal-cross';

export interface ITableMobileModalHeaderProps {
  onCloseModal(): void;
  children: string;
}

export function TableMobileModalHeader({ children, onCloseModal }: ITableMobileModalHeaderProps) {
  return (
    <>
      <style jsx>{`
        div.header {
          color: ${DARK_PURPLE};
        }
        h2.title {
          font-size: 24px;
          line-height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
        }
      `}</style>
      <div className="header">
        <h2 className="title">{children}</h2>
        <TableMobileModalCross onClick={onCloseModal} />
      </div>
    </>
  );
}
