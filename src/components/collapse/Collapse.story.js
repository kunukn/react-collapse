/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import Collapse from "./Collapse";
import { storiesOf } from "@storybook/react";
import Component from "@reach/component-component";
import "components/base/base.scss";
import "~/stories/storybook.scss";
import Down from "components/icons/Down";

const Container = styled.div`
  max-width: 500px;
  padding: 1rem;
`;

const BlockStyle = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Toggle = styled.button`
  font-size: inherit;
  width: 100%;
  font-size: 100%;
  background: transparent;
  box-shadow: none;
  width: 100%;
  margin: 0;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: purple;
`;

export default function CollapseStory() {
  storiesOf("Collapses", module)
    .add("default", () => (
      <Component initialState={{ isOpen: false }}>
        {({ state, setState }) => (
          <Container>
            <Toggle onClick={() => setState({ isOpen: !state.isOpen })}>
              toggle
            </Toggle>
            <Collapse isOpen={state.isOpen}>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </Collapse>
            <p className="text">below content</p>
          </Container>
        )}
      </Component>
    ))

    .add("multiple", () => (
      <Component initialState={{ isOpen1: false, isOpen2: false }}>
        {({ state, setState }) => (
          <>
            <Container>
              <Toggle onClick={() => setState({ isOpen1: !state.isOpen1 })}>
                toggle
              </Toggle>
              <Collapse isOpen={state.isOpen1}>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </Collapse>
            </Container>
            <Container>
              <Toggle onClick={() => setState({ isOpen2: !state.isOpen2 })}>
                Toggle
              </Toggle>
              <Collapse isOpen={state.isOpen2}>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </Collapse>
            </Container>
          </>
        )}
      </Component>
    ))

    .add("collapse-all", () => <CollapseAll />);
}

function Block({ isOpen, title, onToggle, children }) {
  return (
    <div className="block">
      <Toggle onClick={onToggle}>
        <span>{title}</span>
        <Down isOpen={isOpen} />
      </Toggle>
      <Collapse layoutEffect isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
}

function reducer(state, { type, index }) {
  switch (type) {
    case "expand-all":
      return [true, true, true];
    case "collapse-all":
      return [false, false, false];
    case "toggle":
      state[index] = !state[index];
      return [...state];

    default:
      throw new Error();
  }
}

function CollapseAll() {
  const [state, dispatch] = React.useReducer(reducer, [false, false, false]);

  return (
    <div className="collapse-all">
      <header>
        <button
          onClick={() => dispatch({ type: "expand-all" })}
          disabled={state.every(s => s === true)}
        >
          Expand all
        </button>
        <button
          onClick={() => dispatch({ type: "collapse-all" })}
          disabled={state.every(s => s === false)}
        >
          Collapse all
        </button>
      </header>

      <Block
        title="Cargo details"
        isOpen={state[0]}
        onToggle={() => dispatch({ type: "toggle", index: 0 })}
      >
        <div className="content">
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block>

      <Block
        title="Your details"
        isOpen={state[1]}
        onToggle={() => dispatch({ type: "toggle", index: 1 })}
      >
        <div className="content">
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block>

      <Block
        title="Handling instructions"
        isOpen={state[2]}
        onToggle={() => dispatch({ type: "toggle", index: 2 })}
      >
        <div className="content">
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block>

      <p>Some content below the collapsibles.</p>
    </div>
  );
}
