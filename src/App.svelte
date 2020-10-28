<script lang="ts">
import processMath from './processMath';
import { division } from './arithmetic';

let expr = processMath('$' + division(816, 42) + '$');
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