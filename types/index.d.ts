import * as React from "react";

type onChangeProps = {
  state: string;
  style: Object;
};
type onInitProps = {
  state: string;
  style: Object;
  node: HTMLElement;
};

interface CollapseProps {
  isOpen?: boolean;
  render?: (collapseState: string) => void;
  className?: string;
  transition?: string;
  collapseHeight?: string;
  onChange?: (props: onChangeProps) => void;
  onInit?: (props: onInitProps) => void;
  elementType?: string;
  style?: Object;
  addState?: boolean;
  noAnim?: boolean;
  overflowOnExpanded?: boolean;
  children?: React.ReactNode | ((collapseState: string) => void);
}

declare const Collapse: React.FunctionComponent<CollapseProps>;

export default Collapse;
