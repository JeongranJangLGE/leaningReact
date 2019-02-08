import React from 'react';
import { render } from 'react-dom';
import App from './component/App';
import './index.css';

import storeFactory from './store/store';
import { addCustomer, updateCustomer, deleteCustomer } from './actions';

const store = storeFactory();

//store.subscribe(() => console.log("length: " + store.getState().customers.length));
store.dispatch(addCustomer("apple", "apple@gmail.com", "010-1234-0000"));
store.dispatch(addCustomer("orange", "orange@gmail.com", "010-2345-2345"));
store.dispatch(updateCustomer(1, "orange", "010-9876-9876"));
store.dispatch(deleteCustomer("orange@gmail.com"));

window.React = React
window.store = store;

render(
	<App />,
	document.getElementById('root')
);
