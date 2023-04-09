import { countdown, showDateInput, isCountdownFinished, isCountdownInitialized, isPastDate, target, isCountdownRunning, customText, noDateTime } from '$lib/stores';
import { hasAllProps, areAllNumbers, areAllZero } from './pureConditions';
import { resetTime, getFactorForUnit, stringToMs, getDateTimeString, calculateTimeLeft } from './pureHelpers';
import { get } from 'svelte/store';
import JSConfetti from 'js-confetti';

export const areInputsValid = (getScssVar) => {
	const scssVar = getScssVar('--animation-duration');

	if (get(noDateTime)) {
		setTimeout(() => noDateTime.set(false), scssVar);
		return;
	}

	if (get(isPastDate)) {
		setTimeout(() => isPastDate.set(false), scssVar);
	} else {
		isCountdownInitialized.set(true);
		showDateInput.set(false);

		return true;
	}
};

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

const runConfetti = () => {
	const jsConfettiEmojis = {
		confettiRadius: 7,
		confettiNumber: 100,
		confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
		emojis: ['⏲️', '⌛', '⏰', '⏱️', '📅', '⌚']
	};

	const jsConfettiEmojis2 = {
		confettiRadius: 18,
		confettiNumber: 80,
		confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
		emojis: ['⏲️', '⌛', '⏰', '⏱️', '📅', '⌚']
	};

	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti(jsConfettiEmojis);

	const jsConfetti2 = new JSConfetti();
	setTimeout(
		() =>
			jsConfetti2.addConfetti({
				confettiRadius: 13,
				confettiNumber: 250,
				confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
			}),
		500
	);

	const jsConfetti3 = new JSConfetti();
	setTimeout(() => jsConfetti3.addConfetti(jsConfettiEmojis2), 2000);

	const jsConfetti4 = new JSConfetti();
	setTimeout(
		() =>
			jsConfetti4.addConfetti({
				confettiRadius: 20,
				confettiNumber: 450,
				confettiColors: ['#f9154f', '#fa2e61', '#fa4774', '#fc799a', '#fc92ad', '#fff']
			}),
		1200
	);

	setTimeout(() => jsConfetti.clearCanvas(), 5000);
	setTimeout(() => jsConfetti2.clearCanvas(), 7000);
	setTimeout(() => jsConfetti4.clearCanvas(), 7500);
	setTimeout(() => jsConfetti3.clearCanvas(), 8000);
};

export const stopCountdown = (intervalId) => {
	isCountdownInitialized.set(false);
	runConfetti();
	resetStoreValues();
	clearInterval(intervalId);
};

const resetStoreValues = () => {
	isCountdownFinished.set(true);
	isCountdownRunning.set(false);
	setTimeout(() => showDateInput.set(true), 3000);
};

export const initStores = (dateValue, timeValue, customTextValue) => {
	if (!dateValue && !timeValue) {
		noDateTime.set(true);
		return;
	}

	setDateTime(dateValue, timeValue);
	setHeader(customTextValue);

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

const setHeader = (customInput) => {
	let finalText;

	if (!customInput) {
		finalText = get(isCountdownFinished) ? 'COUNTDOWN OVER' : '';
	} else {
		finalText = customInput;
	}

	customText.set(finalText);
};

const handleProp = (prop) => {
	countdown.update((countdown) => {
		let value = countdown[prop];
		return value > 0 ? { ...countdown, [prop]: value - 1 } : resetTime(countdown, prop);
	});
};

export const testCountdownOverIn = (seconds) => {
	countdown.update((countdownValues) => {
		return {
			...countdownValues,
			seconds: seconds
		};
	});
	isCountdownInitialized.set(true);
	showDateInput.set(false);
	runCountdown();
};
