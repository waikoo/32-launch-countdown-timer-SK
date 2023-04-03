import { countdown, isTimeUp, target } from '$lib/stores';
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

const initStore = () => {
	const { date, time } = get(target);

	countdown.update((cd) => {
		if (!date && !time) {
			// use default values
			return {
				seconds: 41,
				minutes: 55,
				hours: 23,
				days: 8
			};
		} else if ((date && !time) || (date && time)) return getTimeLeft();
		else throw new Error("Can't run initStore()");
	});
};

const getTimeLeft = () => {
	const { date, time } = get(target);

	if (date) {
		const presentDate = new Date();
		const targetDate = new Date(date ? date : `${date}T${time}:${presentDate.getSeconds()}`);
		const dateDiff = targetDate.getTime() - presentDate.getTime();

		const MS = {
			DAYS: 1000 * 60 * 60 * 24,
			HOURS: 1000 * 60 * 60,
			MINUTES: 1000 * 60,
			SECONDS: 1000
		};

		const withoutDays = dateDiff - getTimeUnit(dateDiff, 'days') * MS.DAYS;
		const withoutHours = withoutDays - getTimeUnit(withoutDays, 'hours') * MS.HOURS;
		const withoutMinutes = withoutHours - getTimeUnit(withoutHours, 'minutes') * MS.MINUTES;

		return {
			days: getTimeUnit(dateDiff, 'days'),
			hours: getTimeUnit(withoutDays, 'hours'),
			minutes: getTimeUnit(withoutHours, 'minutes'),
			seconds: getTimeUnit(withoutMinutes, 'seconds')
		};
	}
};

const getTimeUnit = (timeDiff, unit) => {
	let factor;
	switch (unit) {
		case 'days':
			factor = 1000 * 60 * 60 * 24;
			break;
		case 'hours':
			factor = 1000 * 60 * 60;
			break;
		case 'minutes':
			factor = 1000 * 60;
			break;
		case 'seconds':
			factor = 1000;
			break;
		default:
			throw new Error(`Invalid unit: ${unit}`);
	}
	return Math.floor(timeDiff / factor);
};

export { handleProp, stopCountdown, initStore };
