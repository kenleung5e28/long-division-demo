<script lang="ts">
import processMath from './processMath';
import { division } from './arithmetic';

let divnums = [
	[12, 4],
	[15, 6],
	[458, 2],
	[121, 11],
	[500, 49],
];

let exprs = divnums.map(([a, b]) => processMath('$' + division(a, b) + '$'));
</script>

<main>
{#each exprs as expr, i}
<div>
{@html processMath('$' + divnums[i][0] + ' \\times ' + divnums[i][1] + '$')}
</div>
<div>
{@html expr}
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
</style>