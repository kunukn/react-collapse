import * as React from "react";

import Collapse from "@kunukn/react-collapse";

<Collapse
  isOpen
  excludeStateCSS={false}
  transition="height 290ms cubic-bezier(0.4, 0, 0.2, 1)"
  className="CSS-class-name"
  elementType="article"
  collapseHeight="20px"
  layoutEffect={false}
>
  <div>this is some content</div>{" "}
</Collapse>;

<Collapse
  onInit={({ collapseState, isMoving, hasReversed, collapseStyle }) => {}}
  onChange={({ collapseState, isMoving, hasReversed, collapseStyle }) => {}}
>
  <div>this is some content</div>{" "}
</Collapse>;

<Collapse
  render={collapseState => <div>this is the state {collapseState}</div>}
></Collapse>;
