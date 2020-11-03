<template>
	<div class="keyboard">
		<div class="button--soft-keyboard" @click="toggleKeyboard">keyboard</div>
		<SimpleKeyboard
			v-if="showKeyboard"
			style="pointer-events: all"
			@onKeyPress="buttonPressed"
		/>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';
import SimpleKeyboard from './SimpleKeyboard/index.vue';
import { useStore, ActionTypes } from '@/store';

export default defineComponent({
	components: {
		SimpleKeyboard,
	},
	setup() {
		const store = useStore();
		const showKeyboard = ref(false);

		function toggleKeyboard(): void {
			showKeyboard.value = !showKeyboard.value;
		}

		function buttonPressed(key: { keyCode: string; type: string }): void {
			if (key.keyCode === 'hide') {
				return toggleKeyboard();
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
			toggleKeyboard,
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
