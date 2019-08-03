import * as React from "react";

import Collapse from "@kunukn/react-collapse";

<Collapse
  isOpen
  excludeStateCSS
  transition="height 260ms cubic-bezier(0.4, 0, 0.2, 1)"
  className="CSS-class-name"
  elementType="article"
  collapseHeight="4rem"
  style={{ transitionDuration: "260ms" }}
  lazyEffect
>
  <div>this is some content</div>{" "}
</Collapse>;

<Collapse
  onInit={({ collapseState, isMoving, hasReversed, collapseStyle }) => {}}
  onChange={({ collapseState, isMoving, hasReversed, collapseStyle }) => {}}
>
  <div>this is some content</div>
</Collapse>;

<Collapse
  render={collapseState => <div>this is the state {collapseState}</div>}
></Collapse>;
