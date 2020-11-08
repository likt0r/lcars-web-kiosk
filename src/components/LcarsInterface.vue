<template>
	<div class="lcars flex-container--column">
		<div class="top flex-container--row">
			<MenuCornerTop :bgColor="colors.red" />
		
			<Tile v-for="(tile,index) in topTiles" 
				:key="index" 
				:bgColor="tile.color" 
				:minHeight="tile.height"
				:minWidth="tile.width"
				/>
		</div>
		<ul class="left">
			<template v-for="page in contentPages" :key="page.uid">
				<Tile v-if="page.isSpacer" :bgColor="colors.beige" :li="true" :grow="true"/>
				<PageButton v-else
					:uid="page.uid"
					@click="setContentPage(page.uid)"
					:bgColor="page.bgColor"
					:minHeight="page.height"
				/>
			</template>
		</ul>
		
		<div class="bottom flex-container--row">
			<MenuCornerTop :bgColor="colors.beige" class="cornerBottom" :widthExtension="240"/>
			<Tile v-for="(tile,index) in bottomTiles" 
				:key="index" 
				:bgColor="tile.color" 
				:minHeight="tile.height"
				:minWidth="tile.width"
				/>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, computed, reactive } from 'vue';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '../store';
import { colors } from '@/utils/enums';
import PageButton from '@/components/Lcars/PageButton.vue';
import MenuCornerTop from '@/components/Lcars/MenuCornerTop.vue';
import Tile from '@/components/Lcars/Tile.vue'
import { TileData } from '@/utils/interfaces'
export default defineComponent({
	components: {
		PageButton,
		MenuCornerTop,
		Tile,
	},
	setup() {
		const store = useStore();
		const topTiles = [{
			color: colors.darkBlue,
			height: 18.3,
			width: 100,
		},{
			color: colors.orange,
			height: 18.3,
			width: 20,
		},{
			color: colors.beige,
			height: 10,
			width: 120,
		},{
			color: colors.orange,
			height: 18.3,
			width: 60,
		},{
			color: colors.purple,
			height: 18.3,
			width: 160,
		},{
			color: colors.purple,
			height: 18.3,
			width: 120,
		}
		,{
			color: colors.red,
			height: 18.3,
			width: 50,
		},
		{
			color: colors.beige,
			height: 18.3,
			width: 100,
		}
		] as Array<TileData>;
		const bottomTiles = [{
			color: colors.orange,
			height: 18.3,
			width: 70,
		},{
			color: colors.beige,
			height: 18.3,
			width: 120,
		},{
			color: colors.blue,
			height: 18.3,
			width: 250,
		}
		,{
			color: colors.red,
			height: 18.3,
			width: 50,
		},
		{
			color: colors.beige,
			height: 18.3,
			width: 100,
		}
		] as Array<TileData>;
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
			topTiles,
			currentPage,
			contentPages,
			showKeyboard,
			setContentPage,
			toggleKeyboard,
			colors,
			bottomTiles,
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
	transform: scale3d( 1,-1,1);
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

@keyframes textColorChange {
    0% {color: #181818;}	
	50% {color: #666666;}
    100% {color: #181818;}
}
/* Use @-webkit-keyframes for Safari/Chrome */
.processing  {
    animation: textColorChange 3s infinite;
}


</style>
