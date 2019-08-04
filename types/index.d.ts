import * as React from "react";

type callbackProps = {
  collapseState: string;
  collapseStyle: Object;
};

interface CollapseProps {
  isOpen?: boolean;
  render?: (collapseState: string) => void;
  className?: string;
  transition?: string;
  collapseHeight?: string;
  onChange?: (props: callbackProps) => void;
  onInit?: (props: callbackProps) => void;
  elementType?: string;
  style?: Object;
  lazyEffect?: boolean;
  children?: React.ReactNode | ((collapseState: string) => void);
}

declare const Collapse: React.FunctionComponent<CollapseProps>;

export default Collapse;
