<script>
	import { getPropOf } from '$utils/countdown/pureHelpers';
	import { countdown } from '$lib/stores';
	import Dial from './Dial.svelte';
</script>

<div class="item countdown">
	<div class="countdown-wrapper">
		{#each Object.entries(getPropOf($countdown)) as [key, value], i}
			<div class="block {key}">
				<Dial {key} {value} {i} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.countdown,
	.countdown-wrapper {
		display: flex;
		gap: 1rem;
		justify-content: space-around;
		max-width: 600px;
		padding: 1rem 1.4rem;

		.block {
			display: flex;
			gap: 1rem;
			flex-direction: column;
			border-radius: 5px;
		}
	}

	@media (min-width: 1000px) {
		.countdown,
		.countdown-wrapper {
			gap: 2rem;
		}
	}

	.item {
		width: 100%;
		text-align: center;
	}
</style>
