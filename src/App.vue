<template>
	<div :class="`main ${screenLocked ? 'screenLocked' : ''}`">
		<LcarsInterface />
		<ContentFrame />
		<Keyboard />
	</div>
	<LoginScreen />
</template>
<script lang="ts">
import 'ress/dist/ress.min.css';
import { defineComponent, computed } from 'vue';
import { useStore, ActionTypes } from '@/store';
import { Config, ContentPage } from '@/utils/interfaces';
import { colors } from '@/utils/enums';
import LcarsInterface from '@/components/LcarsInterface.vue';
import ContentFrame from '@/components/ContentFrame.vue';
import Keyboard from '@/components/Keyboard/index.vue';
import LoginScreen from '@/components/LoginScreen.vue';

export default defineComponent({
	components: {
		LcarsInterface,
		ContentFrame,
		Keyboard,
		LoginScreen,
	},
	setup() {
		const store = useStore();
		const config: Config = {
			timeToPreserveTab: 1200000,
			startPage: 'jellyfin',
			contentPages: [
				{
					uid: 'jellyfin',
					label: 'Musik',
					home: 'https://apollon.mywire.org',
					url: 'https://apollon.mywire.org',
					browserBar: false,
					isService: true,
					stopKey: ' ',
					bgColor: colors.red,
					height: 80,
				},
				{
					uid: 'youtube',
					label: 'Youtube',
					home: 'https://youtube.com',
					url: 'https://youtube.com',
					browserBar: false,
					isService: false,
					stopKey: ' ',
					bgColor: colors.orange,
					height: 40,
				},
				{
					uid: 'soundcloud',
					label: 'SoundCloud',
					home: 'https://soundcloud.com',
					url: 'https://soundcloud.com',
					browserBar: false,
					isService: false,
					stopKey: ' ',
					bgColor: colors.beige,
				},
				{
					uid: 'internet',
					label: 'Internet',
					home: 'https://duckduckgo.com/',
					url: 'https://duckduckgo.com/',
					browserBar: true,
					isService: false,
					stopKey: ' ',
					height: 100,
					bgColor: colors.blue,
				},

				{
					uid: 'baseline',
					isService: false,
					height: 176,
					bgColor: colors.beige,
				} as ContentPage,
			] as ContentPage[],
		};
		store.dispatch(ActionTypes.SET_CONFIG, config);
		store.dispatch(ActionTypes.SET_CURRENT_PAGE, config.startPage);
		const screenLocked = computed(() => store.state.screenLocked);
		return {
			screenLocked,
		};
	},
});
</script>
<style>
@font-face {
	font-family: 'MyWebFont';
	src: url('assets/fonts/swiss_911_ultra_compressed_bt.ttf'); /* IE9 Compat Modes */
}

#app {
	font-family: 'MyWebFont', Fallback, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 1.8rem;
	text-align: center;
	color: #2c3e50;
	background-color: black;
	height: 100vh; /* Viewport-relative units */
	width: 100vw;
}
* {
	-webkit-tap-highlight-color: transparent;
}

body {
	margin: 0;
}
.main {
	transition: all 2s ease;
}
.screenLocked {
	opacity: 0;
}
</style>
