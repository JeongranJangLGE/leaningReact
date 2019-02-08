import C from '../constants'

export const customer = (state= {}, action) => {
	switch (action.type) {
		case C.ADD_CUSTOMER:
			return {
				name: action.name,
				mail: action.mail,
				phone: action.phone
			};
		case C.UPDATE_CUSTOMER: {
			const cus = {
					...state,
					name: action.name,
					phone: action.phone
			}
			console.log("update customer: " + cus);
			return cus;
		}
		default:
			return state;
	}
}

export const customers = (state = [], action) => {
	switch (action.type) {
		case C.ADD_CUSTOMER:
			return [
				...state,
				customer({}, action)
				].sort(compareByName);
		case C.UPDATE_CUSTOMER: {
			const shouldUpdated = state[action.index].name !== action.name ||
								  state[action.index].phone !== action.phone;
			if (!shouldUpdated) return state;
			else {
				const customers = state.slice();
				customers.splice(action.index, 1, customer(state[action.index], action));
				customers.sort(compareByName);
				return customers;
			}
		}
		case C.DELETE_CUSTOMER: {
			const customers = state.slice();
			customers.splice(state.map(c => c.mail).indexOf(action.key));
			return customers;
		}
		default:
			return state;
	}
}

export const displayedIndex = (state = -1, action) => {
	switch (action.type) {
		case C.DISPLAY_CUSTOMER :
			return action.index;
		case C.CLEAR_FORM :
		default:
			 return state;
	}
}

const compareByName = (a, b)  => {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();

    return (aName < bName && -1) || (aName > bName && 1) || 0;
}
