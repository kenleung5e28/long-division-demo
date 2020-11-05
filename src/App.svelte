<script lang="ts">
import processMath from './processMath';
import { division, multiplication } from './arithmetic';

let titles = {
	'mul': 'Multiplication Demo', 
	'div': 'Division Demo',
};

let type = 'div';
let op1 = '';
let op2 = '';
let dp = 0;
let error = '';
let expr = '';

function process() {
	if (op1 === '' || op2 === '') {
		expr = '';
		return;
	}
	try {
		if (type === 'mul') {
			expr = multiplication(op1, op2);
		} else {
			if (dp > 5){
				throw new Error('"dp" must be at most 5');
			}
			expr = division(op1, op2, dp);
		}
		error = '';
	} catch (err) {
		error = err;
		expr = '';
	}
}

function handleOp1(e: Event) {
	let target = e.target as HTMLInputElement;
	target.value = target.value.replace(/[^0-9.]/g, '').substr(0, 8);
	op1 = target.value;
	process();
}

function handleOp2(e: Event) {
	let target = e.target as HTMLInputElement;
	target.value = target.value.replace(/[^0-9.]/g, '').substr(0, 8);
	op2 = target.value;
	process();
}

function handleTypeOption(e: Event) {
	type = (e.target as HTMLInputElement).value;
	op1 = '';
	op2 = '';
	process();
}

function handleDp(e: Event) {
	let target = e.target as HTMLInputElement;
	target.value = target.value.replace(/[^0-9]/g, '');
	dp = isNaN(parseInt(target.value)) ? 0 : parseInt(target.value);
	process();
}
</script>

<style>
	main {
		margin: 0;
		background-color: ghostwhite;
	}

	.panel {
		box-sizing: border-box;
		background-color: white;
		padding: 2rem;
		margin: 1.5rem;
		border: solid 1px gainsboro;
		border-radius: 0.25rem;
		max-width: 750px;
		min-height: calc(100vh - 3rem);
	}

	.display-subpanel {
		-webkit-user-select: none;  /* Chrome all / Safari all */
  	-moz-user-select: none;     /* Firefox all */
  	-ms-user-select: none;      /* IE 10+ */
  	user-select: none;
	}

	.error {
		color: red;
	}


</style>

<main>
	<div class="panel">
		<h2>{titles[type]}</h2>
		<form>
			<label class="type-option"><input type="radio" id="mul" name="type" value="mul" on:input={handleTypeOption}> Multiplication</label>
			<label class="type-option"><input type="radio" id="div" name="type" value="div" checked on:input={handleTypeOption}> Division</label>
			<label for="op1">{type === 'div' ? 'Dividend' : 'First number'}</label>
			<br>
			<input type="text" name="op1" on:input={handleOp1} value={op1}>
			<label for="op2">{type === 'div' ? 'Divisor' : 'Second number'}</label>
			<br>
			<input type="text" name="op2" on:input={handleOp2} value={op2}>
			{#if type === 'div'}
				<label for="dp">Decimal places</label>
				<br>
				<input type="text" name="dp" on:input={handleDp} value={dp}>
			{/if}
		</form>
		<div class="error">{error}</div>
		<div class="display-subpanel">
			{@html processMath('$' + expr + '$')}
		</div>
	</div>
</main>