import React, { useEffect } from 'react';

import { childrenWithProps } from 'utils/react';

export interface IDropdownWrapperProps {
  onClose?(): void;
  children: any;
}

export function DropdownWrapper(props: IDropdownWrapperProps) {
  const { children, onClose } = props;

  useEffect(() => {
    const handleWindowClick = () => {
      onClose();
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [onClose]);

  return <div onClick={(e) => e.stopPropagation()}>{childrenWithProps(children, { onClose })}</div>;
}
