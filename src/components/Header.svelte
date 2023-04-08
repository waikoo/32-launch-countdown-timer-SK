<script>
	import { isCountdownFinished, isCountdownNotInitialized, isCountdownRunningOnDefault } from '$lib/stores';
	import { getCountdownHeader } from '$utils/countdown/ui';

	$: headerText = getCountdownHeader($isCountdownFinished, $isCountdownNotInitialized, $isCountdownRunningOnDefault);

	let headerRef;
	if (headerText === 'Time left') {
		headerRef.style.maxWidth = 100;
	}
</script>

<div class="title">
	<h1 bind:this={headerRef} class="item">{headerText}</h1>
</div>

<style lang="scss">
	.title {
		display: grid;
		justify-content: center;
		align-items: end;
		min-width: 100%;
		margin-bottom: 5rem;
		text-align: center;
	}

	h1 {
		margin: 0;
		color: $White;
		font-size: 1.9rem;
		max-width: 95%;
		font-family: $ff;
		letter-spacing: 6px;
		font-weight: $fw-700;
		text-transform: uppercase;
	}
</style>
