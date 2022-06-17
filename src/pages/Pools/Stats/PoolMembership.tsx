// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useActivePool } from 'contexts/Pools/ActivePool';
import { usePoolMemberships } from 'contexts/Pools/PoolMemberships';
import { Text } from 'library/StatBoxList/Text';
import {
  ActivePoolContextState,
  PoolMembershipsContextState,
} from 'types/pools';

const PoolMembership = () => {
  const { membership } = usePoolMemberships() as PoolMembershipsContextState;
  const { isOwner } = useActivePool() as ActivePoolContextState;

  const params = {
    label: 'Pool Membership',
    value:
      membership === null
        ? 'Not in Pool'
        : isOwner()
        ? `Owner of Pool ${membership.poolId}`
        : `In Pool ${membership.poolId}`,
    unit: '',
    assistant: {
      page: 'pools',
      key: 'Nomination Pools',
    },
  };
  return <Text {...params} />;
};

export default PoolMembership;
