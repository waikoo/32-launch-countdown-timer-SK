<script>
	import { onDestroy } from 'svelte';
	import { showDateInput, target } from '$lib/stores';
	import runCountdown from '$utils/countdown/runCountdown';

	let dateRef, timeRef;

	const submitHandler = () => {
		if (dateRef.value) $target.date = dateRef.value;
		if (timeRef.value) $target.time = timeRef.value;
		runCountdown();
		$showDateInput = false;
	};

	onDestroy(() => {});
</script>

<section class="input-con">
	<form class="input-wrapper" on:submit={submitHandler}>
		<label for="date">
			Choose your end date
			<div class="input-button-con">
				<input type="date" name="date" id="date" bind:this={dateRef} />
				<input type="time" name="time" id="time" bind:this={timeRef} />
				<button>Start</button>
			</div>
		</label>
	</form>
</section>

<style lang="scss">
	.input-con {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		display: grid;
		place-items: center;
	}

	.input-wrapper {
		background: $SteelGray;
		border-radius: 5px;
		padding: 2rem 4rem;
		border: 3px solid $ShadowBlue;
	}

	.input-button-con {
		display: flex;
		gap: 2rem;
	}
	@media (max-width: 600px) {
		.input-button-con {
			flex-direction: column;
		}
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		color: $ShadowBlue;
		font-size: 1.5rem;
	}

	#date,
	#time {
		background: $SteelGray;
		color: $White;
		font-family: $ff;
		border: 2px solid $ShadowBlue;
		border-radius: 5px;
		padding: 1rem 1.5rem;
		font-size: 1.2rem;
		width: 105%;
		cursor: pointer;

		&::-webkit-calendar-picker-indicator {
			filter: invert(1);
			opacity: 0.7;
			@include size(30px);

			&:hover {
				filter: brightness(0) saturate(100%) invert(46%) sepia(81%) saturate(917%) hue-rotate(311deg) brightness(102%) contrast(97%);
				cursor: pointer;
			}
		}
	}

	button {
		color: $White;
		background: $Charade;
		border: none;
		padding: 0.4rem 0.8rem;
		min-width: 25%;
		border-radius: 5px;
		font-family: $ff;
		font-size: 1.2rem;
		display: block;
		border: 2px solid $Martinique;
		&:hover {
			cursor: pointer;
			color: $BrinkPink;
			border: 2px solid $BrinkPink;
		}
	}
</style>
