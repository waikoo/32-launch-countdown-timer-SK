import { get, writable } from 'svelte/store';

export const countdown = writable({
	seconds: 41,
	minutes: 55,
	hours: 23,
	days: 8
});

export let isTimeUp = writable(false);

export let intervalId = writable(null);

export let showDateInput = writable(true);

export const target = writable({
	date: null,
	time: null
});
