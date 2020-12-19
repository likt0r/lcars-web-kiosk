<template>
	<li
		:style="cssVars"
		@click.stop="click()"
		:class="`button lcars-element ${isPressed ? 'pressed' : ''}`"
		@mousedown="down()"
		@mouseup="up()"
		@touchdown="down()"
		@touchup="up()"
		@mouseleave="up()"
	>
		<span>{{ label }}</span>
	</li>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import addAudio from '@/compositions/addAudio';
export default defineComponent({
	props: {
		uid: {
			type: String,
			required: true,
		},
		bgColor: {
			type: String,
		},
		minHeight: {
			type: Number,
			default: 50,
		},
		minWidth: {
			type: Number,
			default: 50,
		},
		label: {
			type: String,
		},
	},
	setup(props, context) {
		const isPressed = ref(false);
		const { playClick } = addAudio();
		const cssVars = computed(() => ({
			'--bg-color': props.bgColor,
			'--min-height': props.minHeight + 'px',
			'--min-width': props.minWidth + 'px',
		}));

		function down() {
			isPressed.value = true;
		}
		function up() {
			isPressed.value = false;
		}
		function click() {
			playClick();
		}
		return {
			cssVars,
			down,
			up,
			isPressed,
			click,
		};
	},
});
</script>

<style scoped>
.button {
	min-height: var(--min-height);
	min-width: var(--min-width);
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	pointer-events: all !important;
	cursor: pointer;
	transition: transform 0.2s, filter 0.2s, box-shadow 0.2s;
}

.button.pressed {
	box-shadow: 1px 1px 1px 1px;
	filter: brightness(90%);
	transform: scale3d(0.95, 0.95, 0.95);
}
span {
	padding: 4px;
}
</style>
