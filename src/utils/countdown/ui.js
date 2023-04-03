export const getCount = (num) => {
	if (typeof num === 'number') {
		const str = num.toString();
		return str.length < 2 ? str.padStart(2, '0') : str;
	} else {
		throw new Error('received: ' + typeof num + ' expected: number');
	}
};
