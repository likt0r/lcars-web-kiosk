<template>
	<div :class="keyboardClass"></div>
</template>

<script>
/* eslint-disable */
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import layout from './layout';

function toHexCode(number) {
	let template = '0000';
	let hex = number.toString(16);
	return `\\u${template.slice(0, 6 - Math.min(hex.length, 4)).concat(hex)}`;
}
export default {
	name: 'SimpleKeyboard',
	props: {
		keyboardClass: {
			default: 'simple-keyboard',
			type: String,
		},
		input: {
			type: String,
		},
		theme: String,
	},
	data: () => ({
		keyboard: null,
	}),
	mounted() {
		this.keyboard = new Keyboard({
			onChange: this.onChange,
			onKeyPress: this.onKeyPress,
			theme: 'hg-theme-default dark',
			layout,
		});
	},
	methods: {
		onChange(input) {
			this.$emit('onChange', input);
		},
		onKeyPress(code) {
			/**
			 * If you want to handle the shift and caps lock codes
			 */
			if (code === '{shift}' || code === '{lock}') return this.handleShift();
			const keyEvent = {
				type: 'keyDown',
				keyCode: code.length > 1 ? code.slice(1, code.length - 1) : code,
			};

			this.$emit('onKeyPress', keyEvent);
			setTimeout(() => {
				keyEvent.type = 'char';
				this.$emit('onKeyPress', keyEvent);
				setTimeout(() => {
					keyEvent.type = 'keyUp';
					this.$emit('onKeyPress', keyEvent);
				}, 5);
			}, 5);
		},
		handleShift() {
			let currentLayout = this.keyboard.options.layoutName;
			let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

			this.keyboard.setOptions({
				layoutName: shiftToggle,
			});
		},
	},
	watch: {
		input(input) {
			this.keyboard.setInput(input);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.simple-keyboard {
	max-width: 1024px;
	position: absolute;
	bottom: 0;
	left: 0;
}

.simple-keyboard.dark {
	background-color: rgba(30, 30, 30, 0.9);
	border-radius: 0;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
}

.simple-keyboard.dark .hg-button {
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
	color: white;
}

.simple-keyboard.dark .hg-button:active {
	background: #1c4995;
	color: white;
}

#root .simple-keyboard.dark + .simple-keyboard-preview {
	background: #1c4995;
}
.simple-keyboard .hg-button[data-skbtn='{hide}'] {
	flex-grow: 1;
}
.simple-keyboard .hg-button[data-skbtn='{space}'] {
	flex-grow: 5;
}
</style>
