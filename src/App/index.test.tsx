import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './index';

jest.mock('./WebWorker')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
