import { isCountdownFinished, isCountdownRunning, isCountdownRunningOnDefault, countdown, showDateInput } from '$lib/stores';

export const getCount = (num) => {
	if (typeof num === 'number') {
		const str = num.toString();
		return str.length < 2 ? str.padStart(2, '0') : str;
	} else {
		throw new Error('received: ' + typeof num + ' expected: number');
	}
};

export const getCountdownHeader = (...args) => {
	let [isCountdownFinished, isCountdownNotInitialized, isCountdownRunningOnDefault] = args;
	if (args.length !== 3) throw new Error(`Expected 3 args, got ${args.length}`);
	if (args.some((arg) => arg === undefined)) throw new Error(`Arg ${args.indexOf(undefined) + 1} is undefined`);

	let headerText;

	if (isCountdownNotInitialized) headerText = '';
	else if (isCountdownFinished) headerText = 'COUNTDOWN OVER';
	else if (!isCountdownNotInitialized) {
		headerText = isCountdownRunningOnDefault ? "We're launching soon" : 'Time left';
	}

	return headerText;
};

export const resetStoreValues = () => {
	isCountdownRunningOnDefault.set(false);
	isCountdownFinished.set(true);
	isCountdownRunning.set(false);
	countdown.set({
		seconds: 41,
		minutes: 55,
		hours: 23,
		days: 8
	});
	showDateInput.set(true);
};
