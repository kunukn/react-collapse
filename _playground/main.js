import { Collapse } from "react-collapse";
import React from 'react';
import ReactDOM from 'react-dom';

console.log("main.js");

console.log(Collapse);

console.log(React);

console.log(ReactDOM);

const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
