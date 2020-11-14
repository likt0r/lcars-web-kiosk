<template>
	<div class="keyboard" :style="cssVars">
		<transition name="keyboard">
			<keep-alive>
				<SimpleKeyboard
					v-if="showKeyboard"
					class="softkey"
					style="pointer-events: all"
					@onKeyPress="buttonPressed"
			/></keep-alive>
		</transition>
	</div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import SimpleKeyboard from './SimpleKeyboard/index.vue';
import { useStore, ActionTypes } from '@/store';
import { colors } from '@/utils/enums';
export default defineComponent({
	components: {
		SimpleKeyboard,
	},
	setup() {
		const store = useStore();
		const showKeyboard = computed(() => store.state.keyboard.visible);

		function buttonPressed(key: { keyCode: string; type: string }): void {
			if (key.keyCode === 'hide') {
				return store.dispatch(ActionTypes.SET_KEYBOARD_VISIBLE, false);
			}
			if (store.state.currentPage != null) {
				store.dispatch(ActionTypes.SET_KEYCODE, {
					...key,
					target: store.state.currentPage,
				});
			}
		}
		const cssVars = {
			'--color-beige': colors.beige,
			'--color-blue': colors.blue,
			'--color-darkBlue': colors.darkBlue,
			'--color-purple': colors.purple,
			'--color-orange': colors.orange,
			'--color-red': colors.red,
			'--color-border-color': colors.broderColor,
		};
		return {
			showKeyboard,
			buttonPressed,
			cssVars,
		};
	},
});
</script>

<style scoped>
.button--soft-keyboard {
	position: fixed;
	bottom: 0;
	right: 0;
	pointer-events: all;
}

.keyboard {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	pointer-events: none;
	opacity: 1;
	z-index: 1000;
}

.keyboard-enter-active {
	transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.keyboard-leave-active {
	transition: all 0.6s ease;
}

.keyboard-enter-from,
.keyboard-leave-to {
	transform: translateY(400px);
}
</style>
