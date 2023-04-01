import { hasAllProps, areAllNumbers } from './countdownConditions';
import { handleProp, stopCountdown } from './countdownDecrements';
import { countdown, isTimeUp, intervalId } from '$lib/stores';
import { get } from 'svelte/store';

const runCountdown = () => {
	if (hasAllProps(get(countdown)) && areAllNumbers(get(countdown))) {
		const A_SECOND = 1000;

		let iId = setInterval(() => {
			handleProp('seconds');
			// if (get(countdown).seconds > 0) handleProp('seconds');
			if (get(countdown).seconds === 0) {
				setTimeout(() => {
					if (get(countdown).minutes > 0) handleProp('minutes');
					else if (get(countdown).minutes === 0) {
						if (get(countdown).hours > 0) handleProp('hours');
						else if (get(countdown).hours === 0) {
							if (get(countdown).days > 0) {
								handleProp('days');
								get(countdown).hours = 23;
							} else {
								stopCountdown(iId);
							}
						}
					}
				}, A_SECOND);
			}
		}, A_SECOND);
	}
};

export default runCountdown;
