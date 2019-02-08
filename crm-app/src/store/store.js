import {createStore, combineReducers, applyMiddleware} from 'redux';
import { customers, displayedIndex } from './reducers';

const initialState = {
	customers: [
		{
			name: "apple",
			mail: "apple@gmail.com",
			phone: "010-8901-1234"
		},
		{
			name: "banana",
			mail: "banana@gmail.com",
			phone: "010-1234-1234"
		}
	],
	displayedIndex: -1
};

const logger = store => next => action => {
	let result;
	console.groupCollapsed("dispatching", action.type);
	console.log("previous status: ", store.getState());
	console.log("action: ", action);
	result = next(action);
	console.log("next status: ", store.getState());
	console.groupEnd();
}

const storeFactory = (initialState = []) =>
	applyMiddleware(logger)(createStore)(
	combineReducers({customers, displayedIndex}),
	(localStorage['customers']) ?
	JSON.parse(localStorage['customers']) :
	[]
);

export default storeFactory;
