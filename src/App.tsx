import './App.scss'

import React, { useState } from 'react'

import { Collapse } from '../lib/Collapse'
import cx from 'classnames'

/*
 import { Collapse } from '../lib/Collapse' // From library source
 import { Collapse } from '../dist/react-collapse.es.js' // From dist folder
 import { Collapse } from '../dist/react-collapse.umd.js' // From dist folder
 import { Collapse } from '../' // From dist folder
*/

export default function App() {
  const [isOpen, setIsOpen] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
  })
  function toggle(index: string) {
    setIsOpen((s) => ({ ...s, [index]: !s[index] }))
  }

  const [spy, setSpy] = useState({ a: {}, b: {}, c: {}, d: {}, e: {} })
  function onSpy(index: string, state) {
    setSpy((s) => ({ ...s, [index]: state }))
  }

  return (
    <div className="app">
      <button
        className={cx('app__toggle', {
          'app__toggle--active': isOpen.a,
        })}
        onClick={() => toggle('a')}
      >
        <span className="app__toggle-text">toggle</span>
        <div className="rotate90">
          <svg
            className={cx('icon', { 'icon--expanded': isOpen.a })}
            viewBox="6 0 12 24"
          >
            <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
          </svg>
        </div>
      </button>
      <Collapse
        isOpen={isOpen.a}
        className={
          'app__collapse app__collapse--gradient ' +
          (isOpen.a ? 'app__collapse--active' : '')
        }
      >
        <div className="app__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <img
            className="image"
            alt="random"
            src="https://source.unsplash.com/user/erondu/500x200"
          />
          <button onClick={() => toggle('a')} className="app__button">
            close
          </button>
        </div>
      </Collapse>

      <button
        className={cx('app__toggle', {
          'app__toggle--active': isOpen.b,
        })}
        onClick={() => toggle('b')}
      >
        toggle
      </button>

      <Collapse
        isOpen={isOpen.b}
        className={
          'app__collapse app__collapse--gradient ' +
          (isOpen.b ? 'app__collapse--active' : '')
        }
        transition="height 800ms cubic-bezier(0.4, 0, 0.2, 1)"
        aria-hidden={isOpen.b ? 'false' : 'true'}
        elementType="article"
        render={(collapseState) => (
          <React.Fragment>
            <div className="app__content">
              <div>{collapseState}</div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              <img
                className="image"
                alt="random"
                src="https://source.unsplash.com/user/erondu/500x200"
              />
              <button onClick={() => toggle('b')} className="app__button">
                close
              </button>
            </div>
          </React.Fragment>
        )}
      />

      <button
        className={cx('app__toggle', {
          'app__toggle--active': isOpen.c,
        })}
        onClick={() => toggle('c')}
      >
        toggle
      </button>

      <pre style={{ fontSize: '10px', width: '100%' }}>
        {JSON.stringify(spy.c, null, 1)}
      </pre>
      <Collapse
        isOpen={isOpen.c}
        collapseHeight="60px"
        className={
          'app__collapse app__collapse--gradient ' +
          (isOpen.c ? 'app__collapse--active' : '')
        }
        onChange={(state) => onSpy('c', state)}
        render={(collapseState) => (
          <div className="app__content">
            <div>{collapseState}</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        )}
      />

      <p className="app__text">Some content below</p>
    </div>
  )
}
