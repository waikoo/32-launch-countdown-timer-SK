import { countdown, showDateInput, isCountdownFinished, isPastDate, target, isCountdownRunning, isCountdownRunningOnDefault } from '$lib/stores';
import { hasAllProps, areAllNumbers, areAllZero } from './pureConditions';

import { resetTime, getFactorForUnit, stringToMs, getDateTimeString, calculateTimeLeft } from './pureHelpers';
import { get } from 'svelte/store';

export const runCountdown = () => {
	if (hasAllProps(get(countdown)) && areAllNumbers(get(countdown))) {
		isCountdownRunning.set(true);
		let iId = setInterval(() => {
			const { seconds, minutes, hours, days } = get(countdown);
			handleProp('seconds');
			if (areAllZero(get(countdown))) stopCountdown(iId);
			else if (seconds === 1) {
				setTimeout(() => {
					const { minutes, hours, days } = get(countdown);
					if (minutes > 0) handleProp('minutes');
					else if (hours > 0) handleProp('hours');
					else if (days > 0) {
						handleProp('days');
						handleProp('hours');
					}
				}, 1000);
			}
		}, 1000);
	} else {
		throw new Error(`hasAllProps(): ${hasAllProps(get(countdown))} \n areAllNumbers(): ${areAllNumbers(get(countdown))}`);
	}
};

export const stopCountdown = (intervalId) => {
	resetStoreValues();
	clearInterval(intervalId);
};

const resetStoreValues = () => {
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

export const initStore = (dateValue, timeValue) => {
	setDateTime(dateValue, timeValue);

	if (!dateValue && !timeValue) {
		isCountdownRunningOnDefault.set(true);
		return;
	}
	countdown.update(() => getTimeLeft(dateValue, timeValue));
};

export const getTimeLeft = (date, time) => {
	const presentDate = new Date();
	const targetDate = new Date(getDateTimeString(presentDate, date, time));
	const dateDiff = targetDate.getTime() - presentDate.getTime();

	if (dateDiff < 0 && date) {
		isPastDate.set(true);
		showDateInput.set(true);
	} else {
		return calculateTimeLeft(dateDiff);
	}
};

const setDateTime = (dateValue, timeValue) => {
	target.set({
		date: dateValue,
		time: timeValue
	});
};

const handleProp = (prop) => {
	countdown.update((countdown) => {
		let value = countdown[prop];
		return value > 0 ? { ...countdown, [prop]: value - 1 } : resetTime(countdown, prop);
	});
};
