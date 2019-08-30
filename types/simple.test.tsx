import * as React from "react";

import Collapse from "@kunukn/react-collapse";

<Collapse
  isOpen
  transition="height 260ms cubic-bezier(0.4, 0, 0.2, 1)"
  className="CSS-class-name"
  elementType="article"
  collapseHeight="4rem"
  addState
  noAnim
  overflowOnExpanded
  style={{ transitionDuration: "260ms" }}
>
  <div>this is some content</div>{" "}
</Collapse>;

<Collapse
  onInit={({ state, style, node }) => {}}
  onChange={({ state, style }) => {}}
>
  <div>this is some content</div>
</Collapse>;

<Collapse
  render={collapseState => <div>this is the state {collapseState}</div>}
/>;

<Collapse>
  {collapseState => <div>this is the state {collapseState}</div>}
</Collapse>;
