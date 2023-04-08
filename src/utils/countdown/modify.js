import { countdown, showDateInput, isCountdownFinished, isPastDate, target } from '$lib/stores';
import { get } from 'svelte/store';
import { isCountdownRunningOnDefault } from '../../lib/stores';
import { resetStoreValues } from '$utils/countdown/ui';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const presentDate = new Date();

const stopCountdown = (intervalId) => {
	resetStoreValues();
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

	if (!date && !time) {
		isCountdownRunningOnDefault.set(true);
		return;
	}
	countdown.update(getTimeLeft);
};

const getTimeLeft = () => {
	const { date, time } = get(target);

	const targetDate = new Date(getDateTimeString());
	const dateDiff = targetDate.getTime() - presentDate.getTime();
	if (dateDiff < 0) {
		isPastDate.set(true);
		showDateInput.set(true);
	} else {
		return calculateTimeLeft(dateDiff);
	}
};

const getPadded = (unit) => {
	let number;
	switch (unit) {
		case 'month':
			number = presentDate.getMonth() + 1;
			break;
		case 'date':
			number = presentDate.getTime() > stringToMs(time) ? presentDate.getDate() : presentDate.getDate() + 1;
			break;
		case 'hours':
			number = presentDate.getHours();
			break;
		case 'minutes':
			number = presentDate.getMinutes();
			break;
		case 'seconds':
			number = presentDate.getSeconds();
			break;

		default:
			throw new Error('unknown unit: ' + typeof unit, unit);
	}
	return number.toString().padStart(2, '0');
};

const getDateTimeString = () => {
	const { date, time } = get(target);
	const year = presentDate.getFullYear();

	if (time && !date) {
		return `${year}-${getPadded('month')}-${getPadded('date')}T${time}:${getPadded('seconds')}`;
	} else if (time && date) {
		return `${date}T${time}:${getPadded('seconds')}`;
	} else if (!time && date) {
		return `${date}T${getPadded('hours')}:${getPadded('minutes')}:${getPadded('seconds')}`;
	} else {
		throw new Error('unknown error');
	}
};

const stringToMs = (str) => {
	if (typeof str === 'string') {
		const [hour, minute] = str.split(':');
		const inputMs = hour * MS_PER_HOUR + minute * MS_PER_MINUTE;
		return inputMs;
	} else {
		throw new Error('1st param needs to be a string');
	}
};

const calculateTimeLeft = (timeDiff, units = ['days', 'hours', 'minutes', 'seconds']) => {
	if (typeof timeDiff !== 'number') throw new Error('1st param needs a data type of number, got ' + typeof timeDiff);
	if (typeof timeDiff === 'NaN') console.warn('shit');
	const [unit, ...restUnits] = units;
	if (unit) {
		const factor = getFactorForUnit(unit);
		return {
			[unit]: Math.floor(timeDiff / factor),
			...calculateTimeLeft(timeDiff % factor, restUnits)
		};
	}
};

const getFactorForUnit = (unit) => {
	switch (unit) {
		case 'days':
			return MS_PER_DAY;
		case 'hours':
			return MS_PER_HOUR;
		case 'minutes':
			return MS_PER_MINUTE;
		case 'seconds':
			return MS_PER_SECOND;
		default:
			throw new Error(`Invalid unit: ${(typeof unit, unit)}`);
	}
};

export { handleProp, stopCountdown, initStore };
