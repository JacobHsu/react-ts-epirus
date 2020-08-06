import React, { CSSProperties } from 'react';

import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { MOBILE_TEXT_VALUE } from 'data/data-style';
import { IBasicParameter, INameElementValue } from 'models/models-general';
import { formatWithEllipsis } from 'utils/format';
import { isHash } from 'utils/variable-evaluation';

export function parametersToInfo(
  parameters: IBasicParameter[],
  isMobile?: boolean,
  isFunctionMeta?: boolean,
  withEllipsis = true,
): INameElementValue[] {
  return parameters.map((parameter: IBasicParameter) => {
    const { name, type, value } = parameter;
    let textStyle: CSSProperties = {};

    if (isFunctionMeta) {
      textStyle = {
        ...textStyle,
        lineHeight: '12px',
        fontSize: 10,
        height: 12,
      };
    } else if (isMobile) {
      textStyle = {
        ...textStyle,
        color: MOBILE_TEXT_VALUE,
        lineHeight: '16px',
        fontSize: 12,
        height: 16,
      };
    }

    let transformedValue: JSX.Element = <TextOnly style={textStyle}>{value}</TextOnly>;

    if (isHash(value)) {
      transformedValue = (
        <TextOnly style={textStyle}>
          {parseValue(withEllipsis ? formatWithEllipsis(value) : value)}
        </TextOnly>
      );
      // Keep this code block because it will be useful later
      // if (isMobile) {
      //   transformedValue = (
      //     <ToolTipContentInline
      //       style={{ top: 0 }}
      //       contentToCopy={value}
      //       // linkConfig={{ href: `/accounts/[detailsHash]`, as: `/accounts/${value}` }} TODO: Broken, add later
      //     >
      //       {formatHash(value)}
      //     </ToolTipContentInline>
      //   );
      // } else {
      //   transformedValue = (
      //     <ToolTipCellCopy
      //       textStyle={textStyle}
      //       style={{top: 0, transform: 'none'}}
      //       contentToCopy={value}
      //       // linkConfig={{ href: `/accounts/[detailsHash]`, as: `/accounts/${value}` }} TODO: Broken, add later
      //     >
      //       {formatHash(value)}
      //     </ToolTipCellCopy>
      //   );
      // }
    } else if (type === 'uint256') {
      try {
        transformedValue = (
          <TextOnly style={textStyle}>
            {parseValue(withEllipsis ? formatWithEllipsis(value) : value)}
          </TextOnly>
        );
      } catch (err) {
        // I wonder why this may fail...
      }
    } else {
      transformedValue = (
        <TextOnly style={textStyle}>
          {parseValue(withEllipsis ? formatWithEllipsis(value) : value)}
        </TextOnly>
      );
    }

    const fullValue = typeof value === 'boolean' ? String(value) : value;

    return { name, value: transformedValue, fullValue };
  });

  function parseValue(value) {
    if (parameters[0].value.length === 1 || ['bytes32[]', 'address'].includes(parameters[0].type)) {
      return value;
    } else {
      return '[' + value + ']';
    }
  }
}
