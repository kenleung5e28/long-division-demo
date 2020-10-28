<script lang="ts">
import processMath from './processMath';
import { division, multiplication } from './arithmetic';

let divnums = [
	[121, 11],
	[500, 49],
	[458, 3],
];
</script>

<main>
	{#each divnums as [dividend, divisor]}
	<div class="demo">
		<div class="panel">
			{@html processMath(`$
				${dividend} \\times ${divisor} = ${parseInt((dividend / divisor).toString())} \\ldots ${dividend % divisor} 
			$`)}
		</div>
		<div class="panel">
			{@html processMath('$' + division(dividend, divisor) + '$')}
		</div>
	</div>
	{/each}
	<div class="panel">
		{@html processMath('$' + multiplication(88, 209) + '$')}
	</div>
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

	.demo {
		display: flex;
		flex-direction: row;
		border: 1px solid black;
		border-radius: 5px;
		margin: 1rem 0;
		padding: 0.5rem;
	}

	.demo .panel {
		flex: 1 1 auto;
	}
</style>