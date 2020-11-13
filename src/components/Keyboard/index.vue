<template>
	<div class="keyboard">
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
		return {
			showKeyboard,
			buttonPressed,
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
}

.keyboard-enter-active {
	transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.keyboard-leave-active {
	transition: all 0.6s ease;
}

.keyboard-enter-from,
.keyboard-leave-to {
	opacity: 0;
	transform: translateY(400px);
}
</style>
