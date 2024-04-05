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
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)

  const [spy3, setSpy3] = useState({})

  const toggle1 = () => setIsOpen1((s) => !s)
  const toggle2 = () => setIsOpen2((s) => !s)
  const toggle3 = () => setIsOpen3((s) => !s)

  return (
    <div className="app">
      <button
        className={cx('app__toggle', {
          'app__toggle--active': isOpen1,
        })}
        onClick={() => toggle1()}
      >
        <span className="app__toggle-text">toggle</span>
        <div className="rotate90">
          <svg
            className={cx('icon', { 'icon--expanded': isOpen1 })}
            viewBox="6 0 12 24"
          >
            <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
          </svg>
        </div>
      </button>
      <Collapse
        isOpen={isOpen1}
        className={
          'app__collapse app__collapse--gradient ' +
          (isOpen1 ? 'app__collapse--active' : '')
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
          <button onClick={() => toggle1()} className="app__button">
            close
          </button>
        </div>
      </Collapse>

      <button
        className={cx('app__toggle', {
          'app__toggle--active': isOpen2,
        })}
        onClick={() => toggle2()}
      >
        toggle
      </button>

      <Collapse
        isOpen={isOpen2}
        className={
          'app__collapse app__collapse--gradient ' +
          (isOpen2 ? 'app__collapse--active' : '')
        }
        transition="height 800ms cubic-bezier(0.4, 0, 0.2, 1)"
        aria-hidden={isOpen2 ? 'false' : 'true'}
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
              <button onClick={() => toggle2()} className="app__button">
                close
              </button>
            </div>
          </React.Fragment>
        )}
      />

      <button
        className={cx('app__toggle', {
          'app__toggle--active': isOpen3,
        })}
        onClick={() => toggle3()}
      >
        toggle
      </button>

      <pre style={{ fontSize: '10px', width: '100%' }}>
        {JSON.stringify(spy3, null, 1)}
      </pre>
      <Collapse
        isOpen={isOpen3}
        collapseHeight="60px"
        className={
          'app__collapse app__collapse--gradient ' +
          (isOpen3 ? 'app__collapse--active' : '')
        }
        onChange={(state) => setSpy3(state)}
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
