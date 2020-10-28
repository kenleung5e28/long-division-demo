<script lang="ts">
import processMath from './processMath';

let expr = processMath(`$
56)\\overline{1256}
$`);
</script>

<main>
{@html expr}
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