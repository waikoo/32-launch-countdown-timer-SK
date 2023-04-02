import { countdown, isTimeUp } from '$lib/stores';
import { get } from 'svelte/store';

const stopCountdown = (intervalId) => {
	isTimeUp.set(true);
	clearInterval(intervalId);
};

const handleProp = (prop) => {
	countdown.update((countdown) => {
		let value = countdown[prop];
		return value > 0 ? { ...countdown, [prop]: value - 1 } : resetTime(prop);
	});
};

const resetTime = (prop) => {
	const oldCd = get(countdown);
	let newCountdown;
	switch (prop) {
		case 'seconds' || 'minutes':
			newCountdown = { ...oldCd, [prop]: 59 };
			break;
		case 'hours':
			newCountdown = { ...oldCd, [prop]: 23 };
			break;
		default:
			newCountdown = countdown;
			break;
	}
	return newCountdown;
};

export { handleProp, stopCountdown };
