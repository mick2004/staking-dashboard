// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useApi } from 'contexts/Api';
import { useValidators } from 'contexts/Validators';
import { useTooltip } from 'contexts/Tooltip';
import { OversubscribedProps } from '../types';
import { TooltipPosition, TooltipTrigger } from '../Wrappers';

export const Oversubscribed = (props: OversubscribedProps) => {
  const { consts, network } = useApi();
  const { meta } = useValidators();
  const { setTooltipPosition, setTooltipMeta, open } = useTooltip();

  const { batchIndex, batchKey } = props;

  const identities = meta[batchKey]?.identities ?? [];
  const supers = meta[batchKey]?.supers ?? [];
  const stake = meta[batchKey]?.stake ?? [];

  // aggregate synced status
  const identitiesSynced = identities.length > 0 ?? false;
  const supersSynced = supers.length > 0 ?? false;

  const synced = {
    identities: identitiesSynced && supersSynced,
    stake: stake.length > 0 ?? false,
  };

  const eraStakers = stake[batchIndex];

  const total_nominations = eraStakers?.total_nominations ?? 0;
  const lowestReward = eraStakers?.lowestReward ?? 0;

  const displayOversubscribed =
    synced.stake &&
    total_nominations >= consts.maxNominatorRewardedPerValidator;

  const posRef = useRef(null);

  const toggleTooltip = () => {
    if (!open) {
      setTooltipMeta(
        `Over subscribed: Minimum reward bond is ${lowestReward} ${network.unit}`
      );
      setTooltipPosition(posRef);
    }
  };

  return (
    <>
      {displayOversubscribed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div className="label warning">
            <TooltipTrigger
              className="tooltip-trigger-element"
              onMouseOver={() => toggleTooltip()}
            />
            <TooltipPosition ref={posRef} />
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              transform="shrink-2"
            />
            &nbsp;
            {lowestReward} {network.unit}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Oversubscribed;
