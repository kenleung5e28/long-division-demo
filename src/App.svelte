<script lang="ts">
import processMath from './processMath';
import { division, multiplication } from './arithmetic';

let divnums = [
	[121, 11],
	[500, 49],
	[458, 3],
];

let mulnums = [
	[8, 6],
	[4, 11],
	[23, 4],
	[12, 23],
	[22, 105],
	[132, 30],
	[225, 19],
];
</script>

<main>
	<h1>Long division</h1>
	{#each divnums as [dividend, divisor]}
	<div class="demo">
		<div class="panel">
			{@html processMath(`$
				${dividend} \\div ${divisor} = ${parseInt((dividend / divisor).toString())} \\ldots ${dividend % divisor} 
			$`)}
		</div>
		<div class="panel">
			{@html processMath('$' + division(dividend, divisor) + '$')}
		</div>
	</div>
	{/each}
	<h1>Long multiplication</h1>
	{#each mulnums as [a, b]}
	<div class="demo">
		<div class="panel">
			{@html processMath(`$
				${a} \\times ${b} =  ${a * b} 
			$`)}
		</div>
		<div class="panel">
			{@html processMath('$' + multiplication(a, b) + '$')}
		</div>
	</div>
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