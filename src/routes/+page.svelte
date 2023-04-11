<script>
	import DateInput from '../components/DateInput.svelte';
	import Countdown from '../components/Countdown.svelte';
	import { showDateInput, isCountdownInitialized } from '$lib/stores';
	import Header from '../components/Header.svelte';
	import Socials from '../components/Socials.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		$showDateInput = true;
	});
</script>

<section class="page">
	{#if $showDateInput}
		<DateInput />
	{/if}
	<section class="countdown-comp">
		<img class="bg-hills" src="src/assets/img/pattern-hills.svg" alt="" />
		<Header />

		{#if $isCountdownInitialized}
			<Countdown />
			<Socials />
		{/if}
	</section>
</section>

<style lang="scss">
	.page {
		min-width: 100%;
	}

	.countdown-comp {
		display: grid;
		justify-items: center;
		grid-template-rows: 1.8fr 2fr 0.7fr;
		min-height: 100vh;
		min-width: 100%;
		background-color: $Charade;
		position: relative;
		overflow-x: hidden;
	}

	.bg-hills {
		z-index: 10;
		position: absolute;
		bottom: 0;
		min-height: 240px;
		left: -60rem;
	}

	@media (min-width: 700px) {
		.bg-hills {
			width: 100vw;
			min-height: 160px;
			height: auto;
			left: 0;
		}
	}

	@media (min-width: 1000px) {
		.bg-hills {
			min-height: 0;
		}
	}

	.countdown-comp::before {
		background-image: url('src/assets/img/bg-stars.svg');
		content: '';
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
