<script>
	import { getCount } from '$utils/countdown/ui';
	import { countdown, isTimeUp } from '$lib/stores';

	let uiDays, uiHours, uiMinutes, uiSeconds;

	$: if ($countdown.days) {
		uiDays = getCount($countdown.days);
		uiHours = getCount($countdown.hours);
		uiMinutes = getCount($countdown.minutes);
		uiSeconds = getCount($countdown.seconds);
	}
</script>

<section class="countdown-comp">
	<img class="bg-hills" src="src/assets/img/pattern-hills.svg" alt="" />
	<div class="title">
		<h1 class="item">{$isTimeUp ? 'COUNTDOWN OVER' : "We're launching soon"}</h1>
	</div>

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

	<div class="item socials">
		<div class="socials-wrapper">
			<img src="src/assets/img/icon-facebook.svg" alt="Share on Facebook" class="fb" />
			<img src="src/assets/img/icon-pinterest.svg" alt="Share on Pinterest" class="pt" />
			<img src="src/assets/img/icon-instagram.svg" alt="Share on Instagram" class="ig" />
		</div>
	</div>
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

	.title {
		display: grid;
		justify-content: center;
		align-items: end;
		min-width: 100%;
		margin-bottom: 5rem;
	}

	h1 {
		margin: 0;
		color: $White;
		font-size: 1.9xrem;
		max-width: 95%;
		font-family: $ff;
		letter-spacing: 6px;
		font-weight: $fw-700;
	}

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
				@include gradient2;
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

	.socials {
		display: grid;
		place-items: center;
		width: 100%;
		z-index: 11;
	}

	.socials-wrapper {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 40%;
	}

	.socials img {
		width: 15%;
		cursor: pointer;
		&:hover {
			fill: $BrinkPink;
		}
	}

	h1,
	.text {
		text-transform: uppercase;
	}

	.item {
		width: 100%;
		text-align: center;
	}

	.block {
		display: flex;
		flex-direction: column;
	}
</style>
