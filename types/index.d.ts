import * as React from "react";

type callbackProps = {
  collapseState: string;
  isMoving: boolean;
  hasReversed: boolean;
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
  excludeStateCSS?: boolean;
  style?: Object;
}

declare const Collapse: React.FunctionComponent<CollapseProps>;

export default Collapse;
