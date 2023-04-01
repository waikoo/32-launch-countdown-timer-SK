import { get } from 'svelte/store';

const hasAllProps = (store) => {
	const arrOfProps = Object.keys(store);
	return arrOfProps.every((prop) => arrOfProps.includes(prop));
};

const areAllNumbers = (store) => {
	const areAllNumbers = Object.values(store).every((prop) => typeof prop === 'number');
	if (areAllNumbers) return areAllNumbers;
	else {
		console.log(Object.values(get(store)));
		return Object.values(get(store)).filter((n) => typeof n !== 'number');
	}
};

export { hasAllProps, areAllNumbers };
