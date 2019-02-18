import storeFactory from './store';
import { addCustomer, updateCustomer, deleteCustomer } from '../actions';

export default function storeTest(store = storeFactory) {
	store.subscribe(() => console.log("length: " + store.getState().customers.length));
	store.dispatch(addCustomer("apple", "apple@gmail.com", "010-1234-0000"));
	store.dispatch(addCustomer("orange", "orange@gmail.com", "010-2345-2345"));
	store.dispatch(updateCustomer(1, "orange", "010-9876-9876"));
	store.dispatch(deleteCustomer(0));
}
