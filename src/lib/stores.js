import { get, writable } from 'svelte/store';

export const countdown = writable({
	seconds: 41,
	minutes: 55,
	hours: 23,
	days: 8
});

export const target = writable({
	date: null,
	time: null
});

export let showDateInput = writable(true);

export let isPastDate = writable(false);

export let isCountdownFinished = writable(false);

export let isCountdownRunning = writable(false);

export let isCountdownNotInitialized = writable(true);

export let isCountdownRunningOnDefault = writable(false);
