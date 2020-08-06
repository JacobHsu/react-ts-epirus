import React from 'react';

import { TypeTag } from 'components/type-tags';
import { IOverviewContentProps } from 'models/models-details-general';
import { defined } from 'utils/variable-evaluation';

import { MobileAdditionalDetailsButton } from '../mobile-additional-details/mobile-additional-details-button';
import { MobileOverviewInfo } from '../mobile-overview-info';

import { MobileOverviewContentTitle } from './mobile-overview-content-title';

export function MobileOverviewContent(props: IOverviewContentProps) {
  const {
    additionalDetails,
    info,
    isAdditionalDetailsOpen,
    onAdditionalDetailsClick,
    subtitleConfig,
    titleConfig,
  } = props;

  const { tag } = titleConfig;
  return (
    <>
      <style jsx>{`
        div.tag {
          margin-top: 8px;
        }
        div.top {
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="top">
        <MobileOverviewContentTitle
          zIndex={info ? info.length + 2 : 1}
          subtitleConfig={subtitleConfig}
        />
        {defined(tag) && (
          <div className="tag">
            <TypeTag tagType={tag} />
          </div>
        )}
      </div>
      {defined(info) && <MobileOverviewInfo info={info} />}
      {additionalDetails && (
        <MobileAdditionalDetailsButton
          isAdditionalDetailsOpen={isAdditionalDetailsOpen}
          onClick={onAdditionalDetailsClick}
        />
      )}
    </>
  );
}
