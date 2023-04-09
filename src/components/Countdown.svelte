<script>
	import { getPropOf } from '$utils/countdown/pureHelpers';
	import { countdown } from '$lib/stores';

	$: [uiSeconds, uiMinutes, uiHours, uiDays] = getPropOf($countdown);
</script>

<div class="item countdown">
	<div class="countdown-wrapper">
		<div class="block days">
			<span class="number">
				<span class="number-number">{uiDays}</span>
			</span>
			<span class="text">days</span>
		</div>
		<div class="block hours">
			<span class="number">
				<span class="number-number">{uiHours}</span>
			</span>
			<span class="text">hours</span>
		</div>
		<div class="block minutes">
			<span class="number">
				<span class="number-number">{uiMinutes}</span>
			</span>
			<span class="text">minutes</span>
		</div>
		<div class="block seconds">
			<span class="number">
				<span class="number-number">{uiSeconds}</span>
			</span>
			<span class="text">seconds</span>
		</div>
	</div>
</div>

<style lang="scss">
	.countdown,
	.countdown-wrapper {
		display: flex;
		justify-content: space-around;
	}

	.countdown {
		.countdown-wrapper {
			width: 90%;
			padding: 1rem 1.4rem;
		}
		.block {
			display: flex;
			gap: 1rem;
			.number {
				@include gradient;
				@include size(6rem);
				display: grid;
				place-items: center;
				font-size: 3rem;
				color: $BrinkPink;
				font-family: $ff;
				border-radius: 5px;
				box-shadow: 5px 5px 5px 5px $SteelGray;
				position: relative;
			}

			.number-number {
				opacity: 0.8;
			}

			.number::before {
				content: '';
				background: $SteelGray;
				position: absolute;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				left: -4px;
				top: 46%;
			}
			.number::after {
				content: '';
				background: $SteelGray;
				position: absolute;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				right: -4px;
				top: 46%;
			}

			.text {
				color: $ShadowBlue;
				font-family: $ff;
				font-size: 0.8rem;
				letter-spacing: 4px;
			}
		}
	}

	.block {
		display: flex;
		flex-direction: column;
	}

	.item {
		width: 100%;
		text-align: center;
	}

	.text {
		text-transform: uppercase;
	}
</style>
