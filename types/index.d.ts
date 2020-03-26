import * as React from "react";

interface onChangeProps {
  state: string;
  style: React.CSSProperties;
}
interface onInitProps {
  state: string;
  style: React.CSSProperties;
  node: HTMLElement;
}

export interface CollapseProps {
  isOpen?: boolean;
  render?: (collapseState: string) => void;
  className?: string;
  transition?: string;
  collapseHeight?: string;
  onChange?: (props: onChangeProps) => void;
  onInit?: (props: onInitProps) => void;
  elementType?: string;
  style?: React.CSSProperties;
  addState?: boolean;
  noAnim?: boolean;
  overflowOnExpanded?: boolean;
  children?: React.ReactNode | ((collapseState: string) => void);
}

declare const Collapse: React.FunctionComponent<CollapseProps>;

export default Collapse;
