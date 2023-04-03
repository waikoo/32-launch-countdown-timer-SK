import { hasAllProps, areAllNumbers, areAllZero } from './conditions';
import { handleProp, stopCountdown, initStore } from './modify';
import { countdown, isTimeUp, intervalId } from '$lib/stores';
import { get } from 'svelte/store';

const runCountdown = () => {
	initStore();
	if (hasAllProps(get(countdown)) && areAllNumbers(get(countdown))) {
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

export default runCountdown;
