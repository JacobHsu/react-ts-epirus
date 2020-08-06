import React from 'react';

import { ITablePaginationProps, TablePagination } from 'components/table-content/table-pagination';

export type ITableFooterProps = ITablePaginationProps;

export function TableFooter(props: ITableFooterProps) {
  return (
    <>
      <style jsx>{`
        div.TableFooter {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 16px;
          margin-top: 36px;
        }
      `}</style>
      <div className="TableFooter">
        <TablePagination {...props} />
      </div>
    </>
  );
}
