import { get, writable } from 'svelte/store';

export const countdown = writable({
	seconds: 0,
	minutes: 0,
	hours: 0,
	days: 0
});

export const target = writable({
	date: null,
	time: null
});

export let showDateInput = writable(false);

export let isPastDate = writable(false);

export let isCountdownFinished = writable(false);

export let isCountdownRunning = writable(false);

export let isCountdownInitialized = writable(false);

export let noDateTime = writable(false);

export let customText = writable('');
