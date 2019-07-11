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

declare class Collapse<CollapseProps> {}

export default Collapse;
