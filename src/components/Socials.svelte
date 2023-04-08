<div class="item socials">
	<div class="socials-wrapper">
		<img src="src/assets/img/icon-facebook.svg" alt="Share on Facebook" class="fb" />
		<img src="src/assets/img/icon-pinterest.svg" alt="Share on Pinterest" class="pt" />
		<img src="src/assets/img/icon-instagram.svg" alt="Share on Instagram" class="ig" />
	</div>
</div>

<style lang="scss">
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

	.item {
		width: 100%;
		text-align: center;
	}
</style>
