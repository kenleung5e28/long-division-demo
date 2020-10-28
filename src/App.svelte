<script lang="ts">
import processMath from './processMath';
import { division } from './arithmetic';

let divnums = [
	[121, 11],
	[500, 49],
	[458, 3],
];

let exprs = divnums.map(([a, b]) => processMath('$' + division(a, b) + '$'));
</script>

<main>
	{#each exprs as expr, i}
	<div class="division-demo">
		<div class="division-panel">
			{@html processMath('$' + divnums[i][0] + ' \\times ' + divnums[i][1] + '$')}
		</div>
		<div class="division-panel">
			{@html expr}
		</div>
	</div>
	<hr>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.division-demo {
		display: flex;
		flex-direction: row;
	}

	.division-demo .division-panel {
		flex: 1 1 auto;
	}
</style>