export const formatNumber = (num) => {
	if (typeof num === 'number') {
		const str = num.toString();
		return str.length < 2 ? str.padStart(2, '0') : str;
	} else {
		throw new Error('formatNumber expects a number');
	}
};
