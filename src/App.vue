<template>
	<LcarsInterface />
	<ContentFrame />
	<Keyboard />
</template>
<script lang="ts">
import { onBeforeMount, onMounted, ref, defineComponent } from 'vue';
import { useStore, ActionTypes } from './store';
import { Config, ContentPage } from './utils/interfaces';

import LcarsInterface from './components/LcarsInterface.vue';
import ContentFrame from './components/ContentFrame.vue';
import Keyboard from './components/Keyboard.vue';
export default defineComponent({
	components: {
		LcarsInterface,
		ContentFrame,
		Keyboard,
	},
	setup() {
		const store = useStore();
		const config: Config = {
			timeToPreserveTab: 10000,
			startPage: 'jellyfin',
			contentPages: [
				{
					uid: 'jellyfin',
					label: 'Musik',
					url: 'https://jsonlint.com/',
					browserBar: false,
				} as ContentPage,
				{
					uid: 'youtube',
					label: 'Youtube',
					url: 'https://youtube.com',
					browserBar: false,
				} as ContentPage,
				{
					uid: 'internet',
					label: 'Internet',
					url: 'https://google.com',
					browserBar: true,
				} as ContentPage,
			],
		};
		store.dispatch(ActionTypes.SET_CONFIG, config);
		store.dispatch(ActionTypes.SET_CURRENT_PAGE, config.startPage);
	},
});
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: black;
	height: 100vh; /* Viewport-relative units */
	width: 100vw;
}

#nav {
	position: fixed;
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
body {
	margin: 0;
}
</style>
