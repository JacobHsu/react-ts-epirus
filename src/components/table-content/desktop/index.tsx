import { useRouter } from 'next/router';
import React from 'react';

import { ErrorMessage } from 'components/placeholders/error-message';
import { defined } from 'utils/variable-evaluation';

import { Table } from './table';
import { TableDesktopWrapper } from './table/table-wrapper';

import { ITableContentProps } from '..';

export type ITableDesktopProps = ITableContentProps;

export function TableDesktop({
  breadcrumbs,
  data,
  displayTitleType,
  headerItems,
  isFilterSet,
  loading,
  noElementsMessage,
  skipCardView,
  tableFetchConfig,
  title,
  topRightCornerContent,
  type,
}: ITableDesktopProps) {
  const router = useRouter();

  const rows =
    defined(router) && router.query['detailsHash']
      ? (data.data as any[]).map((dataObj) => ({
          ...dataObj,
          detailsHash: router.query['detailsHash'],
        }))
      : data.data;

  const isZeroElements = data.paging ? data.paging.totalElements === 0 : data.data.length === 0;
  const isZeroElementsAndNoFilter = !isFilterSet && isZeroElements;

  const content = (
    <>
      {isZeroElementsAndNoFilter ? (
        <ErrorMessage>{noElementsMessage}</ErrorMessage>
      ) : (
        <Table
          displayTitleType={displayTitleType}
          isZeroElements={isZeroElements}
          type={type}
          headerItems={headerItems}
          dataRows={rows}
        />
      )}
    </>
  );

  return (
    <TableDesktopWrapper
      isZeroElements={isZeroElements}
      breadcrumbs={breadcrumbs}
      displayTitleType={displayTitleType}
      type={type}
      paging={data.paging}
      headerItems={headerItems}
      loading={loading}
      topRightCornerContent={topRightCornerContent}
      title={title}
      skipCardView={skipCardView}
      {...tableFetchConfig}
    >
      {content}
    </TableDesktopWrapper>
  );
}
