import * as React from "react";

interface CollapseProps {
  isOpen?: boolean;
  render?: () => void;
  excludeStateCSS?: boolean;
  transition?: string;
  className?: string;
  elementType?: string;
  collapseHeight?: string;
  onChange?: () => void;
  onInit?: () => void;
}

//declare function Collapse(props: CollapseProps): void;
declare const Collapse: React.FunctionComponent<CollapseProps>;

export default Collapse;
