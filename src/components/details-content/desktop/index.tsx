import React from 'react';

import { BreadcrumbsView } from 'components/app-shell/breadcrumbs-view';
import { defined } from 'utils/variable-evaluation';

import { DesktopDetailsHighlight } from './desktop-details-highlight';
import { DesktopDetailsOverview } from './desktop-details-overview';
import { DesktopDetailsTable } from './desktop-details-table';

import { IDetailsContentProps } from '..';

export const CARD_GAP = 24;

export type IDetailsDesktopProps = IDetailsContentProps;

export function DetailsDesktop(props: IDetailsDesktopProps) {
  const { breadcrumbs, highlightConfig, overviewConfig, table } = props;
  const isHighlight = defined(highlightConfig);
  return (
    <>
      <style jsx>{`
        div.DetailsDesktop {
          width: 100%;
          padding-bottom: 10px;
        }
        div.row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      `}</style>
      <BreadcrumbsView breadcrumbs={breadcrumbs}>
        <div className="DetailsDesktop">
          <div className="row">
            <DesktopDetailsOverview isHighlight={isHighlight} config={overviewConfig} />
            {isHighlight && <DesktopDetailsHighlight {...highlightConfig} />}
          </div>
          {table && <DesktopDetailsTable>{table}</DesktopDetailsTable>}
        </div>
      </BreadcrumbsView>
    </>
  );
}
