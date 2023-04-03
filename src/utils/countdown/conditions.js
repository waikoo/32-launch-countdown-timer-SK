import { get } from 'svelte/store';
import { countdown } from '$lib/stores';

const hasAllProps = (store) => {
	console.log(get(countdown));
	const arrOfProps = Object.keys(store);
	return arrOfProps.every((prop) => arrOfProps.includes(prop));
};

const areAllNumbers = (store) => {
	const areAllNumbers = Object.values(store).every((prop) => typeof prop === 'number');
	if (areAllNumbers) return areAllNumbers;
	else {
		// console.log(Object.values(get(store)));
		return Object.values(get(store)).filter((n) => typeof n !== 'number');
	}
};

const areAllZero = (store) => {
	return Object.values(store).every((prop) => prop === 0);
};

export { hasAllProps, areAllNumbers, areAllZero };
