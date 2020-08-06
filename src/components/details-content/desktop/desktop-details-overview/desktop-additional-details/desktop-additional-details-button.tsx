import React from 'react';

import { AdditionalDetailsDropdownArrow } from 'components/details-content/common/additional-details-dropdown-arrow';
import { DARK_PURPLE } from 'data/data-style';

export interface IDesktopAdditionalDetailsButtonProps {
  isAdditionalDetailsOpen: boolean;
  onClick(): void;
}

export function DesktopAdditionalDetailsButton(props: IDesktopAdditionalDetailsButtonProps) {
  const { isAdditionalDetailsOpen, onClick } = props;
  return (
    <>
      <style jsx>{`
        button.DesktopAdditionalDetailsButton {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 48px;
        }
        span.text {
          color: ${DARK_PURPLE};
          font-size: 12px;
          line-height: 20px;
          margin-right: 8px;
        }
      `}</style>
      <button onClick={onClick} className="DesktopAdditionalDetailsButton">
        <span className="text">Additional Details</span>
        <AdditionalDetailsDropdownArrow isOpen={isAdditionalDetailsOpen} />
      </button>
    </>
  );
}
