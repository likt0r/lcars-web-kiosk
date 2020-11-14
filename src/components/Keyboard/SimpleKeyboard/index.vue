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
	computed: {},
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
/* '--color-beige': colors.beige,
'--color-blue': colors.blue,
'--color-darkBlue': colors.darkBlue,
'--color-purple': colors.purple,
'--color-orange': colors.orange,
'--color-red': colors.red,
'--color-border-color': colors.broderColor, */
.simple-keyboard {
	max-width: 1024px;
	position: absolute;
	bottom: 0;
	left: 0;
}

.simple-keyboard.dark {
	background-color: black;
	border-radius: 0;
	border-bottom-right-radius: 1px;
	border-bottom-left-radius: 1px;
	font-family: 'MyWebFont', Fallback, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.simple-keyboard.dark .hg-button {
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--color-beige);
	border: 1px solid rgba(112, 117, 121, 0.2);
	color: black;
}

.simple-keyboard.dark .hg-button:active {
	box-shadow: 1px 1px 1px 1px;
	filter: brightness(90%);
	transform: scale3d(0.95, 0.95, 0.95);
}

#root .simple-keyboard.dark + .simple-keyboard-preview {
	background: #1c4995;
}
.simple-keyboard .hg-button.hg-functionBtn {
	background: var(--color-purple);
}
.simple-keyboard .hg-button[data-skbtn='0'],
.simple-keyboard .hg-button[data-skbtn='1'],
.simple-keyboard .hg-button[data-skbtn='2'],
.simple-keyboard .hg-button[data-skbtn='3'],
.simple-keyboard .hg-button[data-skbtn='4'],
.simple-keyboard .hg-button[data-skbtn='5'],
.simple-keyboard .hg-button[data-skbtn='6'],
.simple-keyboard .hg-button[data-skbtn='7'],
.simple-keyboard .hg-button[data-skbtn='8'],
.simple-keyboard .hg-button[data-skbtn='8'],
.simple-keyboard .hg-button[data-skbtn='9'] {
	background: var(--color-blue);
}

.simple-keyboard .hg-button[data-skbtn='`'],
.simple-keyboard .hg-button[data-skbtn='-'],
.simple-keyboard .hg-button[data-skbtn='='],
.simple-keyboard .hg-button[data-skbtn='['],
.simple-keyboard .hg-button[data-skbtn=']'],
.simple-keyboard .hg-button[data-skbtn=';'],
.simple-keyboard .hg-button[data-skbtn="'"],
.simple-keyboard .hg-button[data-skbtn='.'],
.simple-keyboard .hg-button[data-skbtn='@'],
.simple-keyboard .hg-button[data-skbtn='\\'],
.simple-keyboard .hg-button[data-skbtn='/'],
.simple-keyboard .hg-button[data-skbtn='~'],
.simple-keyboard .hg-button[data-skbtn='!'],
.simple-keyboard .hg-button[data-skbtn='#'],
.simple-keyboard .hg-button[data-skbtn='$'],
.simple-keyboard .hg-button[data-skbtn='%'],
.simple-keyboard .hg-button[data-skbtn='^'],
.simple-keyboard .hg-button[data-skbtn='&'],
.simple-keyboard .hg-button[data-skbtn='*'],
.simple-keyboard .hg-button[data-skbtn='('],
.simple-keyboard .hg-button[data-skbtn=')'],
.simple-keyboard .hg-button[data-skbtn='_'],
.simple-keyboard .hg-button[data-skbtn='+'],
.simple-keyboard .hg-button[data-skbtn='{'],
.simple-keyboard .hg-button[data-skbtn='}'],
.simple-keyboard .hg-button[data-skbtn='|'],
.simple-keyboard .hg-button[data-skbtn='"'],
.simple-keyboard .hg-button[data-skbtn=':'],
.simple-keyboard .hg-button[data-skbtn='<'],
.simple-keyboard .hg-button[data-skbtn='>'],
.simple-keyboard .hg-button[data-skbtn='?'] {
	background: var(--color-darkBlue);
}

.simple-keyboard .hg-button[data-skbtn='{hide}'] {
	background: var(--color-orange);
	flex-grow: 1;
}
.simple-keyboard .hg-button[data-skbtn='{space}'] {
	background: var(--color-red);
	flex-grow: 5;
}
</style>
