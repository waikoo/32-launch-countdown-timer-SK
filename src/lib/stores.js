import { writable } from 'svelte/store';

export const countdown = writable({
	seconds: 41,
	minutes: 55,
	hours: 23,
	days: 8
	// testing:
	// seconds: 2,
	// minutes: 1,
	// hours: 0,
	// days: 0
});

export let isTimeUp = writable(false);

export let intervalId = writable(null);
