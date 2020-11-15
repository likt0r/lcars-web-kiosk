<template>
	<li
		:style="cssVars"
		@click="
			playClick();
			setTimeout(() => setContentPage(), 50);
		"
		:class="
			`button lcars-element ${isActive ? 'active' : ''} ${
				isPressed ? 'pressed' : ''
			} ${isPlaying ? 'processing' : ''}`
		"
		@mousedown="down()"
		@mouseup="up()"
		@touchdown="down()"
		@touchup="up()"
		@mouseleave="up()"
	>
		<span>{{ spanContent }}</span>
	</li>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '@/store';
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
	setup(props) {
		const store = useStore();
		const isPressed = ref(false);
		const { playClick } = addAudio();
		const label = props.label || store.getters.getContentPage(props.uid).label;
		const cssVars = computed(() => ({
			'--bg-color': props.bgColor,
			'--min-height': props.minHeight + 'px',
			'--min-width': props.minWidth + 'px',
		}));

		const isPlaying = computed(
			() => store.getters.getContentPage(props.uid).isPlaying
		);
		const isActive = computed(() => store.state.currentPage === props.uid);

		function setContentPage(): void {
			store.dispatch(ActionTypes.SET_CURRENT_PAGE, props.uid);
			console.log('Set page', props.uid);
		}
		function down() {
			isPressed.value = true;
		}
		function up() {
			isPressed.value = false;
		}

		return {
			cssVars,
			setContentPage,
			isPlaying,
			isActive,
			spanContent: label,
			down,
			up,
			isPressed,
			playClick,
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
.active {
	filter: brightness(130%) contrast(80%);
}

.button.pressed {
	box-shadow: 1px 1px 1px 1px;
	filter: brightness(90%);
	transform: scale3d(0.95, 0.95, 0.95);
}
span {
	padding-right: 4px;
}
</style>
