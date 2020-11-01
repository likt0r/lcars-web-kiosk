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
import SimpleKeyboard from '@/components/SimpleKeyboard/index.vue';
import { useStore, ActionTypes } from '../store';

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

		function buttonPressed(keyEvent: { keyCode: string; type: string }): void {
			if (keyEvent.keyCode === 'hide') {
				return toggleKeyboard();
			}

			store.dispatch(ActionTypes.SET_KEYCODE, keyEvent);
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
