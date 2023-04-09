const hasAllProps = (store) => {
	if (typeof store !== 'object') throw new Error('arg not an object');
	const arrOfProps = Object.keys(store);
	return arrOfProps.every((prop) => arrOfProps.includes(prop));
};

const areAllNumbers = (store) => {
	const areAllNumbers = Object.values(store).every((prop) => typeof prop === 'number');
	if (areAllNumbers) return areAllNumbers;
	else {
		return Object.values(store).filter((n) => typeof n !== 'number');
	}
};

const areAllZero = (store) => {
	return Object.values(store).every((prop) => prop === 0);
};

export { hasAllProps, areAllNumbers, areAllZero };
