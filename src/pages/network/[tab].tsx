import React from 'react';

import AppShell from 'components/app-shell';
import { NodeDetails } from 'components/pages/node';

function Node() {
  return <AppShell render={() => <NodeDetails />} />;
}

export default Node;
