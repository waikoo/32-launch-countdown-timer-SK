import { get, writable } from 'svelte/store';

export const countdown = writable({
	seconds: null,
	minutes: null,
	hours: null,
	days: null
});

export const target = writable({
	date: null,
	time: null
});

export let showDateInput = writable(true);

export let isPastDate = writable(false);

export let isCountdownFinished = writable(false);

export let isCountdownRunning = writable(false);

export let isCountdownInitialized = writable(true);

export let noDateTime = writable(false);

export let customText = writable('');
