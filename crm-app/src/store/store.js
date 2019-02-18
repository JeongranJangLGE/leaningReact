import {createStore, combineReducers, applyMiddleware} from 'redux';
import { customers, displayedIndex } from './reducers';
import storage from '../utils/localStorage';

const initialiseData =() => {

	const initialData = {
		customers: [],
		displayedIndex: -1
	};
	if (storage.hasData())
		initialData['customers'] = storage.getCustomers();

	return initialData;
}

const logger = store => next => action => {
	let result;
	console.groupCollapsed("dispatching", action.type);
	console.log("previous status: ", store.getState());
	console.log("action: ", action);
	result = next(action);
	console.log("next status: ", store.getState());
	console.groupEnd();
}

const storeFactory = (initialise = initialiseData) =>
	applyMiddleware(logger)(createStore)(
	combineReducers({customers, displayedIndex}),
		initialise()
);

export default storeFactory;
