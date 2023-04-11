<script>
	import { getDecremented } from '$utils/countdown/pureHelpers';
	import { countdown } from '$lib/stores';
	export let key, value, i;

	let topHalf, bottomHalf, topFlip, bottomFlip;

	const animationEndHandler = (e) => {
		if (e.target.classList[0] === 'top-flip') {
			topFlip.remove();
		} else if (e.target.classList[0] === 'bottom-flip') {
			bottomHalf.textContent = getDecremented(value, i, $countdown.days);
			bottomFlip.remove();
		}
	};
</script>

<span class="flip-card">
	{#key value}
		<span bind:this={topHalf} class="top">{value}</span>
		<span bind:this={bottomHalf} class="bottom">{value}</span>
		<span class="top-flip" bind:this={topFlip} on:animationstart={() => (topHalf.textContent = getDecremented(value, i, $countdown.days))} on:animationend={animationEndHandler}>
			{value}
		</span>
		<span class="bottom-flip" bind:this={bottomFlip} on:animationend={animationEndHandler}>{getDecremented(value, i, $countdown.days)}</span>
	{/key}
</span>
<span class="text">{key}</span>

<style lang="scss">
	.flip-card::before {
		content: '';
		background: $SteelGray;
		width: 5px;
		height: 8px;
		position: absolute;
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;
		left: 0;
		top: 48%;
		z-index: 50;
	}

	.flip-card::after {
		content: '';
		background: $SteelGray;
		width: 5px;
		height: 8px;
		position: absolute;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		right: 0;
		top: 48%;
		z-index: 50;
	}

	.flip-card {
		@include gradient;
		@include size(6rem);
		position: relative;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		font-size: 3rem;
		color: $BrinkPink;
		font-family: $ff;
		border-radius: 5px;
		box-shadow: 0px 5px 5px 5px $SteelGray;
		position: relative;
	}

	.top,
	.bottom,
	.top-flip,
	.bottom-flip {
		overflow: hidden;
		line-height: 1;
		border-radius: 5px;
	}

	.top,
	.top-flip {
		line-height: 1;
		background: $CharadeLight;
		color: $BrinkPinkDark;
		border-top: 1px solid $SteelGray;
		width: 100%;
		border-radius: 5px;
		padding-top: 0.5em;
		height: 64%;
	}

	.top-flip {
		height: 50%;
	}

	.bottom,
	.bottom-flip {
		line-height: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-color: $Martinique;
		padding-bottom: 0.5em;
		width: 100%;
		height: 59%;
	}

	.top-flip {
		position: absolute;
		width: 100%;
		animation: top-flip 250ms ease-in;
		transform-origin: bottom;
		height: 52%;
	}

	.bottom-flip {
		position: absolute;
		bottom: 0;
		height: 48%;
		animation: bottom-flip 250ms ease-out 250ms;
		transform-origin: top;
		transform: rotateX(90deg);
		background: $Martinique;
		border-radius: 5px;
		text-align: center;
		border-bottom: 1px solid $SteelGray;
	}

	@keyframes top-flip {
		100% {
			transform: rotateX(90deg);
		}
	}

	@keyframes bottom-flip {
		100% {
			transform: rotateX(0deg);
		}
	}

	.text {
		color: $ShadowBlue;
		font-family: $ff;
		font-size: 0.8rem;
		letter-spacing: 4px;
		text-transform: uppercase;
	}
</style>
