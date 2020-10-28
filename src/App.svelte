<script lang="ts">
import processMath from './processMath';
import { division, multiplication } from './arithmetic';

let type = 'div';
let op1 = '';
let op2 = '';
let error = '';
let expr = '';

function process() {
	if (op1 === '' || op2 === '') {
		expr = '';
		return;
	}
	const a = parseInt(op1);
	const b = parseInt(op2);
	try {
		expr = type === 'mul' ? multiplication(a, b) : division(a, b);
		error = '';
	} catch (err) {
		error = err;
		expr = '';
	}
}

function handleOp1(e: Event) {
	op1 = (e.target as HTMLInputElement).value;
	process();
}

function handleOp2(e: Event) {
	op2 = (e.target as HTMLInputElement).value;
	process();
}

function handleTypeOption(e: Event) {
	type = (e.target as HTMLInputElement).value;
	op1 = '';
	op2 = '';
	process();
}
</script>

<style>
	main {
		text-align: center;
		width: 240px;
		padding: 1em;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.error {
		color: red;
	}

	.type-options {
		display: flex;
	}

	.type-option {
		flex: 1 1 auto;
	}
</style>

<main>
	<h2>Demo</h2>
	<form>
		<div class="type-options"> 
			<label class="type-option"><input type="radio" id="mul" name="type" value="mul" on:input={handleTypeOption}> Multiplication</label>
			<label class="type-option"><input type="radio" id="div" name="type" value="div" checked on:input={handleTypeOption}> Division</label>
		</div>
		<label for="op1">{type === 'div' ? 'Dividend' : 'First number'}</label>
		<br>
		<input type="text" name="op1" on:input={handleOp1} value={op1}>
		<label for="op2">{type === 'div' ? 'Divisor' : 'Second number'}</label>
		<br>
		<input type="text" name="op2" on:input={handleOp2} value={op2}>
	</form>
	<div class="error">{error}</div>
	<div>
		{@html processMath('$' + expr + '$')}
	</div>
</main>