<script>
	import DateInput from '../components/DateInput.svelte';
	import Countdown from '../components/Countdown.svelte';
	import { showDateInput } from '$lib/stores';
</script>

<section class="page">
	{#if $showDateInput}
		<DateInput />
	{/if}
	<Countdown />
</section>

<style lang="scss">
	section {
		/* position: relative; */
	}
</style>
