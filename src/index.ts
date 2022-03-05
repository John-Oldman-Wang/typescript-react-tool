import React from 'react';
import { render } from 'react-dom';

const appEle = document.getElementById('app');

render(React.createElement('div', {}, 'hello world!'), appEle);
