<template>
	<li
		@click="setContentPage()"
		:class="`${isActive ? 'active' : ''} ${isPlaying ? 'playing' : ''}`"
	>
		{{ label }}
	</li>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '@/store';

export default defineComponent({
	props: {
		uid: {
			type: String,
			required: true,
		},
	},
	setup(props, context) {
		const store = useStore();
		const label = store.getters.getContentPage(props.uid).label;
		const isPlaying = computed(
			() => store.getters.getContentPage(props.uid).isPlaying
		);
		const isActive = computed(() => store.state.currentPage === props.uid);

		function setContentPage(): void {
			store.dispatch(ActionTypes.SET_CURRENT_PAGE, props.uid);
			console.log('Set page', props.uid);
		}

		return {
			setContentPage,
			isPlaying,
			isActive,
			label,
		};
	},
});
</script>

<style scoped>
.active {
	color: chocolate;
}
.playing {
	background: blue;
}
</style>
