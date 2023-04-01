import { countdown, isTimeUp } from '$lib/stores';
import { get } from 'svelte/store';

const handleProp = (prop) => {
	countdown.update((countdown) => {
		let value = countdown[prop];
		return value > 0 ? { ...countdown, [prop]: value - 1 } : resetTime(prop, countdown);
	});
};

const resetTime = (prop, countdown) => {
	let newCountdown;
	switch (prop) {
		case 'seconds':
			newCountdown = { ...countdown, [prop]: 59 };
			break;
		case 'minutes':
			newCountdown = { ...countdown, [prop]: 59 };
			break;
		case 'hours':
			newCountdown = { ...countdown, [prop]: 23 };
			break;
		case 'days':
			newCountdown = { ...countdown, [prop]: 0 };
			break;
		default:
			newCountdown = countdown;
			break;
	}
	return newCountdown;
};

const stopCountdown = (intervalId) => {
	isTimeUp.set(true);
	clearInterval(intervalId);
};

export { handleProp, stopCountdown };
