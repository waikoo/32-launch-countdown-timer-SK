<script>
	import DateInput from '../components/DateInput.svelte';
	import Countdown from '../components/Countdown.svelte';
	import { showDateInput, isCountdownNotInitialized } from '$lib/stores';
	import Header from '../components/Header.svelte';
	import Socials from '../components/Socials.svelte';
</script>

<section class="page">
	{#if $showDateInput}
		<DateInput />
	{/if}
	<section class="countdown-comp">
		<img class="bg-hills" src="src/assets/img/pattern-hills.svg" alt="" />
		<Header />

		{#if !$isCountdownNotInitialized}
			<Countdown />
		{/if}

		<Socials />
	</section>
</section>

<style lang="scss">
	.countdown-comp {
		display: grid;
		justify-items: center;
		grid-template-rows: 1.8fr 2fr 0.7fr;
		min-height: 100vh;
		background-color: $Charade;
		position: relative;
		overflow-x: hidden;
	}

	.bg-hills {
		z-index: 10;
		position: absolute;
		bottom: 0;
		right: -8rem;
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
