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
  excludeStateCSS?: boolean;
  transition?: string;
  className?: string;
  elementType?: string;
  collapseHeight?: string;
  onChange?: (props: callbackProps) => void;
  onInit?: (props: callbackProps) => void;
}

declare const Collapse: React.FunctionComponent<CollapseProps>;

export default Collapse;
