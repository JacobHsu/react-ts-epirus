import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { EventsTable } from 'components/pages/events/events-table';
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
import { TransfersTable } from 'components/pages/transfers/transfers-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { EVENTS_TOKENS_HEADER_ITEMS } from 'data/table-lookup/data-events-contracts';
import { TRANSACTIONS_TOKENS_HEADER_ITEMS } from 'data/table-lookup/data-transactions';
import {
  TRANSFERS_HEADER_ITEMS_ERC20,
  TRANSFERS_HEADER_ITEMS_ERC721,
} from 'data/table-lookup/data-transfers';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { ITokenDetailsFetch } from 'models/models-details-tokens';
import { EPageType } from 'models/models-general';
import { ITabItem } from 'models/models-table-general';
import { fetchData } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { formatHash } from 'utils/format';
import { resolveTokenName } from 'utils/tokens';

import { tokenHighlightConfig, tokenOverviewConfig } from './data';

export function TokenDetails() {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<ITokenDetailsFetch, IError>(`/tokens/${detailsHash}`, fetchData);

  const tabItems = useMemo((): ITabItem[] => {
    if (!data) {
      return;
    }

    const transfersHeaderItems =
      data.contractType === 'ERC20' ? TRANSFERS_HEADER_ITEMS_ERC20 : TRANSFERS_HEADER_ITEMS_ERC721;

    const transactionsConfig = {
      apiLink: '/tokens/[detailsHash]/[tab]',
      pathname: '/tokens/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };

    const eventsConfig = {
      apiLink: '/tokens/[detailsHash]/[tab]',
      pathname: '/tokens/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'events' },
    };

    const transfersConfig = {
      apiLink: `/tokens/[detailsHash]/[contractType]/[tab]`,
      pathname: '/tokens/[detailsHash]/[tab]',
      params: {
        detailsHash,
        tab: 'transfers',
        contractType: data.contractType.toLowerCase(),
      },
    };

    return [
      {
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}
            headerItems={TRANSACTIONS_TOKENS_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this token."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
      {
        name: 'Events',
        link: getLink(eventsConfig),
        element: (
          <EventsTable
            tablePageType={isDesktop ? EPageType.eventsContracts : EPageType.eventsContractsMobile}
            fetchConfig={eventsConfig}
            headerItems={EVENTS_TOKENS_HEADER_ITEMS}
            noElementsMessage="There are no events for this token."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
      {
        name: 'Transfers',
        link: getLink(transfersConfig),
        element: (
          <TransfersTable
            fetchConfig={transfersConfig}
            headerItems={transfersHeaderItems}
            noElementsMessage="There are no transfers to show."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];
  }, [data, detailsHash, isDesktop]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: 298 }} />;
  } else {
    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Tokens',
            value: '/tokens',
          },
          {
            name: resolveTokenName({
              ...data,
              address: formatHash(data.address),
            }),
            value: null,
          },
        ]}
        overviewConfig={tokenOverviewConfig(data)}
        highlightConfig={tokenHighlightConfig(data.totalSupply)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
