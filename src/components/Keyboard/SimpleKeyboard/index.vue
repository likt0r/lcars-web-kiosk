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
function toChars(code) {
	let key = code === '{space}' ? ' ' : code;
	key = key === '{enter}' ? '\r' : key;
	key = key === '{tab}' ? '\t' : key;
	return key.length > 1 ? key.slice(1, key.length - 1) : key;
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
			onKeyReleased: this.onKeyReleased,
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

			const keyEvent = {
				type: 'keyDown',
				keyCode: toChars(code),
			};
			this.$emit('onKeyPress', keyEvent);
			setTimeout(() => {
				keyEvent.type = 'char';
				this.$emit('onKeyPress', keyEvent);
			});
		},
		onKeyReleased(code) {
			if (code === '{shift}' || code === '{lock}') return this.handleShift();
			const keyEvent = {
				type: 'keyUp',
				keyCode: toChars(code),
			};
			this.$emit('onKeyPress', keyEvent);
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
