const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

export const resetTime = (oldCd, prop) => {
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

export const calculateTimeLeft = (timeDiff, units = ['days', 'hours', 'minutes', 'seconds']) => {
	if (typeof timeDiff !== 'number') throw new Error('1st param expected: number, got: ' + typeof timeDiff);
	const [unit, ...restUnits] = units;
	if (unit) {
		const factor = getFactorForUnit(unit);
		return {
			[unit]: Math.floor(timeDiff / factor),
			...calculateTimeLeft(timeDiff % factor, restUnits)
		};
	}
};

export const getFactorForUnit = (unit) => {
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

export const stringToMs = (str) => {
	if (typeof str === 'string') {
		const [hour, minute] = str.split(':');
		const inputMs = hour * MS_PER_HOUR + minute * MS_PER_MINUTE;
		return inputMs;
	} else {
		throw new Error(`Expected string, got: ${typeof str}`);
	}
};

export const getDateTimeString = (presentDate, date, time) => {
	const year = presentDate.getFullYear();
	let dateTimeString;

	if (time && !date) {
		dateTimeString = `${year}-${getPadded('month', presentDate)}-${getPadded('date', presentDate, time)}T${time}:${getPadded('seconds', presentDate)}`;
	} else if (time && date) {
		dateTimeString = `${date}T${time}:${getPadded('seconds', presentDate)}`;
	} else if (!time && date) {
		dateTimeString = `${date}T${getPadded('hours', presentDate)}:${getPadded('minutes', presentDate)}:${getPadded('seconds', presentDate)}`;
	} else {
		throw new Error('unknown error');
	}

	return dateTimeString;
};

const getPadded = (unit, presentDate, time = null) => {
	let number;
	switch (unit) {
		case 'month':
			number = presentDate.getMonth() + 1;
			break;
		case 'date':
			const isTargetTimeTomorrow = presentDate.getTime() + stringToMs(time) > MS_PER_DAY;
			number = isTargetTimeTomorrow ? presentDate.getDate() + 1 : presentDate.getDate();
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

export const getMsFromFloatString = (str) => {
	if (typeof str !== 'string') throw new Error(`Expected string, received ${typeof str}`);
	if (str.at(-1) === 's') return str.slice(0, -1) * 1000;
	else throw new Error('Does not end on "s"');
};

const getCount = (num) => {
	if (typeof num === 'number') {
		const str = num.toString();
		return str.length < 2 ? str.padStart(2, '0') : str;
	} else {
		throw new Error('received: ' + typeof num + ' expected: number');
	}
};

export const getPropOf = (countdownStore) => {
	const { seconds, minutes, hours, days } = countdownStore;
	return [getCount(seconds), getCount(minutes), getCount(hours), getCount(days)];
};
