<template>
	<div :class="`lcars flex-container--column${minimised ? ' minimised' : ''}`">
		<div class="top flex-container--row">
			<MenuCornerTop :bgColor="colors.red" />

			<Tile
				v-for="(tile, index) in topTiles.slice(0, 3)"
				:key="index"
				:bgColor="tile.color"
				:minHeight="tile.height"
				:minWidth="tile.width"
			/>
			<Button
				:uid="'goHome'"
				@click="goHome()"
				label="home"
				:bgColor="colors.orange"
				:minHeight="18.3"
				:minWidth="60"
				style="justify-content: center;align-items: center; height:20px; margin-right: 4px; font-size: 1.2rem"
			/>
			<Button
				:uid="'goBack'"
				@click="goBack()"
				label="<"
				:bgColor="colors.purple"
				:minHeight="20"
				:minWidth="110"
				style="justify-content: center;align-items: center; height:26px; margin-right: 4px; font-size: 1.2rem"
			/>
			<Button
				:uid="'goForward'"
				@click="goForward()"
				label=">"
				:bgColor="colors.purple"
				:minHeight="20"
				:minWidth="90"
				style="justify-content: center;align-items: center; height:26px; margin-right: 4px; font-size: 1.2rem"
			/>

			<Tile :bgColor="colors.red" :minHeight="18.3" :minWidth="50" />
			<Button
				:uid="'menu-toggle'"
				@click="toggleMinisied()"
				label="Hide"
				:bgColor="colors.orange"
				:minHeight="20"
				:minWidth="90"
				style="justify-content: flex-start;align-items: flex-start; height:36px"
			/>
		</div>
		<ul class="left">
			<template v-for="page in contentPages" :key="page.uid">
				<Tile
					v-if="page.isSpacer"
					:bgColor="colors.beige"
					:li="true"
					:grow="true"
				/>
				<PageButton
					v-else
					:uid="page.uid"
					@click="setContentPage(page.uid)"
					:bgColor="page.bgColor"
					:minHeight="page.height"
				/>
			</template>
		</ul>

		<div class="bottom flex-container--row">
			<MenuCornerTop
				:bgColor="colors.beige"
				class="cornerBottom"
				:widthExtension="240"
			/>
			<Tile
				v-for="(tile, index) in bottomTiles"
				:key="index"
				:bgColor="tile.color"
				:minHeight="tile.height"
				:minWidth="tile.width"
			/>
			<Button
				:uid="'keyboard'"
				@click="showKeyboard()"
				label="Keyboard"
				:bgColor="colors.orange"
				:minHeight="40"
				:minWidth="90"
				style="justify-content: flex-start;align-items: flex-start;"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';

import { useStore, ActionTypes } from '../store';
import { colors, NavigationActions } from '@/utils/enums';
import PageButton from '@/components/Lcars/PageButton.vue';
import Button from '@/components/Lcars/Button.vue';
import MenuCornerTop from '@/components/Lcars/MenuCornerTop.vue';
import Tile from '@/components/Lcars/Tile.vue';
import { TileData } from '@/utils/interfaces';
import addWebViewBus from '@/compositions/addWebViewBus';
export default defineComponent({
	components: {
		Button,
		PageButton,
		MenuCornerTop,
		Tile,
	},
	setup() {
		const store = useStore();
		const topTiles = [
			{
				color: colors.darkBlue,
				height: 18.3,
				width: 100,
			},
			{
				color: colors.orange,
				height: 18.3,
				width: 20,
			},
			{
				color: colors.beige,
				height: 10,
				width: 120,
			},
			{
				color: colors.orange,
				height: 18.3,
				width: 60,
			},
			{
				color: colors.purple,
				height: 18.3,
				width: 160,
			},
			{
				color: colors.purple,
				height: 18.3,
				width: 120,
			},
			{
				color: colors.red,
				height: 18.3,
				width: 50,
			},
		] as Array<TileData>;
		const bottomTiles = [
			{
				color: colors.orange,
				height: 18.3,
				width: 70,
			},
			{
				color: colors.beige,
				height: 18.3,
				width: 120,
			},
			{
				color: colors.blue,
				height: 18.3,
				width: 250,
			},
			{
				color: colors.red,
				height: 18.3,
				width: 50,
			},
		] as Array<TileData>;

		const minimised = computed(() => store.state.lcarsMinimised);

		const contentPages = computed(() => store.state.contentPages);
		const currentPage = computed(() => store.state.currentPage);
		const screenLocked = computed(() => store.state.screenLocked);
		const { dispatchBrowseEvent } = addWebViewBus();
		function setContentPage(uid: string): void {
			store.dispatch(ActionTypes.SET_CURRENT_PAGE, uid);
			console.log('Set page', uid);
		}
		function showKeyboard(): void {
			store.dispatch(ActionTypes.SET_KEYBOARD_VISIBLE, true);
		}
		function toggleMinisied(): void {
			store.dispatch(
				ActionTypes.SET_LCARS_MINIMISED,
				!store.state.lcarsMinimised
			);
		}
		function goBack(): void {
			dispatchBrowseEvent({ action: NavigationActions.back });
		}
		function goForward(): void {
			dispatchBrowseEvent({ action: NavigationActions.forward });
		}
		function goHome(): void {
			dispatchBrowseEvent({ action: NavigationActions.home });
		}
		function reload(): void {
			dispatchBrowseEvent({
				action: NavigationActions.reload,
			});
		}

		return {
			topTiles,
			currentPage,
			contentPages,
			setContentPage,
			showKeyboard,
			colors,
			bottomTiles,
			minimised,
			toggleMinisied,
			screenLocked,
			goBack,
			goForward,
			goHome,
			reload,
		};
	},
});
</script>

<style scoped>
:root {
	--shadow-color: #1e90ff;
	--shadow-width: 4px;
}
ul {
	list-style-type: none;
}
.lcars {
	position: fixed;
	height: 100vh;
	width: 100vw;
	left: 0;
	top: 0;
	pointer-events: none;
	z-index: 10;
	transition: transform 1s ease;
}
.lcars.minimised {
	transform: translate3d(calc(-100vw + 10px), 0, 0);
}
.flex-container--column {
	display: flex;
	flex-direction: column;
}
.flex-container--row {
	display: flex;
	flex-direction: row;
}

.cornerBottom {
	transform: scale3d(1, -1, 1);
}

.left {
	color: white;
	width: 100px;
}
.left li {
	margin-left: 4px;
	margin-right: 4px;
	margin-bottom: 4px;
}
.left li:first-child {
	margin-top: 4px;
}

.bottom {
	align-items: flex-end;
}

.lcars-element {
	color: black;
	background-color: var(--bg-color);
	border: 1px solid rgba(112, 117, 121, 0.2);
	border-radius: 0px;
	/*	box-shadow: 4px 4px 4px 4px #000000;*/
	box-shadow: 0px 0px 0px 4px #000000;
	user-select: none;
}
</style>
