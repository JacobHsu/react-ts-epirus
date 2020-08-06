import React, { ChangeEvent } from 'react';

import { IHeaderItem, TSortAndFilterType } from 'models/models-data-general';
import { addToArrayIfNotThere, removeFromArrayIfThere } from 'utils/array';
import { removeSpaces } from 'utils/format';

import { CheckboxFilterOptions } from '../checkbox-filter/checkbox-filter-options';

export interface INextFilter {
  type: TSortAndFilterType;
  filterValue: string[];
}

export interface IMobileCheckboxFilterProps {
  item: IHeaderItem;
  selectedOptions: string[];
  onChange(nextFilter: INextFilter): void;
}

export function MobileCheckboxFilter(props: IMobileCheckboxFilterProps) {
  const { item, onChange, selectedOptions } = props;
  const { options, optionsLabelLookup, type } = item;

  return (
    <CheckboxFilterOptions
      optionsLabelLookup={optionsLabelLookup}
      options={options}
      selectedOptions={selectedOptions}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = e.currentTarget;

        if (checked) {
          onChange({
            type,
            filterValue: addToArrayIfNotThere(selectedOptions, removeSpaces(name)),
          });
        } else {
          onChange({
            type,
            filterValue: removeFromArrayIfThere(selectedOptions, removeSpaces(name)),
          });
        }
      }}
    />
  );
}
