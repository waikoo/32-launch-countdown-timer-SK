import { writable } from 'svelte/store';

export const countdown = writable({
	seconds: 2,
	minutes: 24,
	hours: 21,
	days: 8
});

export let isTimeUp = writable(false);

export let intervalId = writable(null);
