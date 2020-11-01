<template>
	<div class="lcars">
		<ul class="left">
			<li
				v-for="page in contentPages"
				:key="page.uid"
				@click="setContentPage(page.uid)"
				:class="`${currentPage === page.uid ? 'active' : ''}`"
			>
				{{ page.label }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '../store';

export default defineComponent({
	setup(props, context) {
		const store = useStore();
		const showKeyboard = ref(false);
		const contentPages = computed(() => store.state.contentPages);
		const currentPage = computed(() => store.state.currentPage);

		function setContentPage(uid: string): void {
			store.dispatch(ActionTypes.SET_CURRENT_PAGE, uid);
			console.log('Set page', uid);
		}
		function toggleKeyboard(): void {
			showKeyboard.value = !showKeyboard.value;
		}
		return {
			currentPage,
			contentPages,
			showKeyboard,
			setContentPage,
			toggleKeyboard,
		};
	},
});
</script>

<style scoped>
.lcars {
	position: fixed;
	height: 100vh;
	width: 100px;
}
.left {
	background: black;
	color: white;
	width: 100px;
	overflow: hidden;
}
.left .active {
	color: chocolate;
}
</style>
