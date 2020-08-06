import React from 'react';
import useSWR from 'swr';

import { ESyncStatus, ISyncStatus } from 'models/models-data-general';
import { fetchData } from 'utils/api/queries';

interface StatusConnectRenderProps {
  status: ESyncStatus;
}

interface StatusConnectProps {
  render(props: StatusConnectRenderProps): JSX.Element;
}

export function StatusConnect(props: StatusConnectProps) {
  const { data } = useSWR<ISyncStatus>('/actuator/health', fetchData);
  const legacyStatus = data?.status;
  const nodeStatus = data?.components?.node.status;

  return <div>{props.render({ status: nodeStatus ?? legacyStatus })}</div>;
}
