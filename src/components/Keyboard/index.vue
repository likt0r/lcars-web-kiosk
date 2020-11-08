<template>
	<div class="keyboard">
		<SimpleKeyboard
			v-if="showKeyboard"
			style="pointer-events: all"
			@onKeyPress="buttonPressed"
		/>
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
		const showKeyboard = computed(()=> store.state.keyboard.visible);



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
}
</style>
