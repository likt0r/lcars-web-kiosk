<template>
	<div class="lcars flex-container--column">
		<div class="top flex-container--row">
			<MenuCornerTop :bgColor="colors.red" />
		</div>
		<ul class="left">
			<PageButton
				v-for="page in contentPages"
				:key="page.uid"
				:uid="page.uid"
				@click="setContentPage(page.uid)"
				:bgColor="page.bgColor"
			>
			</PageButton>
		</ul>
		<div class="bottom"></div>
	</div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '../store';
import { colors } from '@/utils/enums';
import PageButton from '@/components/Lcars/PageButton.vue';
import MenuCornerTop from '@/components/Lcars/MenuCornerTop.vue';
export default defineComponent({
	components: {
		PageButton,
		MenuCornerTop,
	},
	setup() {
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
			colors,
		};
	},
});
</script>

<style scoped>
.lcars {
	position: fixed;
	height: 100vh;
	width: 100vw;
	left: 0;
	top: 0;
	pointer-events: none;
}
.flex-container--column {
	display: flex;
	flex-direction: column;
}
.flex-container--row {
	display: flex;
	flex-direction: row;
}

.left {
	color: white;
	width: 100px;
	flex-grow: 100;
}
.left li {
	margin-left: 4px;
	margin-right: 4px;
	margin-bottom: 4px;
}
.left li:first-child {
	margin-top: 4px;
}
.top {
}
.bottom {
	background: brown;
	color: white;

	height: 10px;
}
.lcars-element {
	color: black;
	background-color: var(--bg-color);
	border: 1px solid rgba(112, 117, 121, 0.2);
	border-radius: 2px;
	box-shadow: 4px 4px 4px 4px;
	user-select: none;
}
</style>
