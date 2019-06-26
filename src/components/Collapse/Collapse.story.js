import React from 'react';
import Collapse from './Collapse';
import { storiesOf } from '@storybook/react';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
//import { linkTo } from '@storybook/addon-links';
//import { backgrounds } from '~/stories/addon-backgrounds';
import Component from '@reach/component-component';
import 'components/Base/base.scss';
import '~/stories/storybook.scss';

export default function CollapseStory() {

  storiesOf('Collapses', module)
    //.addDecorator(backgrounds)

    .add('default', () => (
      <Component initialState={{ isOpen: false }}>
        {({ state, setState }) => (
          <div className="box">
            <button className="btn" onClick={() => setState({ isOpen: !state.isOpen })}>
              toggle
            </button>
            <Collapse isOpen={state.isOpen}>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </Collapse>
            <p className="text">below content</p>
          </div>
        )}
      </Component>
    ))

    .add('multiple', () => (
      <Component initialState={{ isOpen1: false, isOpen2: false }}>
        {({ state, setState }) => (
          <>
            <div className="box">
              <button className="btn" onClick={() => setState({ isOpen1: !state.isOpen1 })}>
                toggle
              </button>
              <Collapse isOpen={state.isOpen1}>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </Collapse>
            </div>
            <div className="box">
              <button className="btn" onClick={() => setState({ isOpen2: !state.isOpen2 })}>
                toggle
              </button>
              <Collapse isOpen={state.isOpen2}>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </Collapse>
            </div>
          </>
        )}
      </Component>
    ));
}
