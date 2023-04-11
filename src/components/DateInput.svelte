<script>
	import { isPastDate, noDateTime, countdown, showDateInput, isCountdownInitialized } from '$lib/stores';
	import { runCountdown, initStores, areInputsValid, testCountdownOverIn } from '$utils/countdown/storeActions';
	import { getMsFromFloatString } from '$utils/countdown/pureHelpers';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let dateRef, timeRef, customTextRef;

	const getScssVar = (variable) => getMsFromFloatString(getComputedStyle(document.documentElement).getPropertyValue(variable));

	const submitHandler = () => {
		initStores(dateRef.value, timeRef.value, customTextRef.value);
		if (areInputsValid(getScssVar)) {
			runCountdown();
		}
	};
</script>

<section in:fade class="input-con">
	<form class="input-wrapper" on:submit={submitHandler}>
		<label for="date">
			<span class="future" class:error={$isPastDate || $noDateTime}>Choose a future date</span>
			<div class="input-button-con">
				<input class:error={$noDateTime} type="date" name="date" id="date" bind:this={dateRef} />
				<input class:error={$noDateTime} type="time" name="time" id="time" bind:this={timeRef} />
				<input type="text" name="text" id="text" bind:this={customTextRef} placeholder="Countdown text..." autocomplete="off" spellcheck="false" />
				<button>Start</button>
			</div>
		</label>
	</form>
</section>

<style lang="scss">
	.error {
		animation: shake-it $animationDuration ease-in-out;
	}

	.input-con {
		position: absolute;
		z-index: 12;
		display: grid;
		place-items: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
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
		flex-direction: column;
	}

	.future {
		text-align: center;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		color: $ShadowBlue;
		font-size: 1.5rem;
	}

	#text::placeholder {
		color: $ShadowBlue;
		opacity: 0.5;
	}

	#date,
	#time {
		cursor: pointer;
	}

	#date,
	#time,
	#text {
		background: $SteelGray;
		color: $White;
		font-family: $ff;
		border: 2px solid $ShadowBlue;
		border-radius: 5px;
		padding: 1rem 1.5rem;
		font-size: 1.2rem;
		width: 105%;

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
		transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;

		&:hover {
			cursor: pointer;
			color: $BrinkPink;
			border: 2px solid $BrinkPink;
		}
	}

	@keyframes shake-it {
		0% {
			transform: scale(1);
		}
		25% {
			transform: translateX(-10px) scaleY(1.2) scaleX(0.8);
		}
		50% {
			transform: translateX(10px) scaleY(0.8) scaleX(1.2);
		}
		75% {
			transform: translateX(-10px) scaleY(1.2) scaleX(0.8);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
