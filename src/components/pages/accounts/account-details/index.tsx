import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { TRANSACTIONS_ACCOUNT_HEADER_ITEMS } from 'data/table-lookup/data-transactions';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { IAccountDetailsFetch } from 'models/models-details-accounts';
import { ITabItem } from 'models/models-table-general';
import { fetchData } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { containerHeight, useIsDesktop, useWindowSize } from 'utils/dimensions';
import { formatHash } from 'utils/format';

import { accountHighlightConfig, accountOverviewConfig } from './data';

export function AccountDetails() {
  const isDesktop = useIsDesktop();
  const windowSize = useWindowSize();
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<IAccountDetailsFetch, IError>(
    `/accounts/${detailsHash}`,
    fetchData,
  );

  const tabItems = useMemo((): ITabItem[] => {
    const transactionsConfig = {
      apiLink: '/accounts/[detailsHash]/[tab]',
      pathname: '/accounts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };

    return [
      {
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}
            headerItems={TRANSACTIONS_ACCOUNT_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this account."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];
  }, [detailsHash]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: containerHeight(windowSize) }} />;
  } else {
    const processedData = {
      ...data,
      display: data.links.find((i) => i.rel === 'contract')?.display || data.address,
    };

    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Accounts',
            value: null,
          },
          {
            name: formatHash(processedData.address),
            value: null,
          },
        ]}
        overviewConfig={accountOverviewConfig(processedData, isDesktop)}
        highlightConfig={accountHighlightConfig(processedData.ethBalance)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
