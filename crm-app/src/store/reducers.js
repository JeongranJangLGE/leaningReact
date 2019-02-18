import C from '../constants';
import storage  from '../utils/localStorage';

export const customer = (state= {}, action) => {
	switch (action.type) {
		case C.ADD_CUSTOMER: {
			return {
				name: action.name,
				mail: action.mail,
				phone: action.phone
			};
		}
		case C.UPDATE_CUSTOMER: {
			return {
					...state,
					name: action.name,
					phone: action.phone
			};
		}
		default:
			return state;
	}
}

export const customers = (state = [], action) => {
	switch (action.type) {
		case C.ADD_CUSTOMER:
			const newCustomers = [
				...state,
				customer({}, action)
			].sort(compareByName);
			storage.setCustomers(newCustomers);
			return newCustomers;
		case C.UPDATE_CUSTOMER: {
			if (action.index < 0) return state;

			const shouldUpdated = state[action.index].name !== action.name ||
								  state[action.index].phone !== action.phone;
			if (shouldUpdated) {
				const newCustomers = state.slice();
				newCustomers.splice(action.index, 1, customer(state[action.index], action))
							.sort(compareByName);
				storage.setCustomers(newCustomers);
				return newCustomers;
			} else {
				return state;
			}
		}
		case C.DELETE_CUSTOMER: {
			const newCustomers = state.slice();
			newCustomers.splice(action.index, 1);
			// newCustomers.splice(state.map(c => c.mail).indexOf(action.key));
			storage.setCustomers(newCustomers);
			return newCustomers;
		}
		default:
			return state;
	}
}

export const displayedIndex = (state = -1, action) => {
	const RESET = -1;
	switch (action.type) {
		case C.DISPLAY_CUSTOMER :
			return action.index;
		case C.DELETE_CUSTOMER:
		case C.RESET_CUSTOMER :
		default:
			 return RESET;
	}
}

const compareByName = (a, b)  => {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();

    return (aName < bName && -1) || (aName > bName && 1) || 0;
}
