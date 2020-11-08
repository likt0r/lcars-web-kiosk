<template>
	<LcarsInterface />
	<ContentFrame />
	<Keyboard />
</template>
<script lang="ts">
import 'ress/dist/ress.min.css';
import { defineComponent } from 'vue';
import { useStore, ActionTypes } from '@/store';
import { Config, ContentPage } from '@/utils/interfaces';
import { colors } from '@/utils/enums'
import LcarsInterface from '@/components/LcarsInterface.vue';
import ContentFrame from '@/components/ContentFrame.vue';
import Keyboard from '@/components/Keyboard/index.vue';

export default defineComponent({
	components: {
		LcarsInterface,
		ContentFrame,
		Keyboard,
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
					url: 'https://apollon.mywire.org',
					browserBar: false,
					isService: true,
					stopKey: ' ',
					bgColor: colors.red,
					height: 80,
				} as ContentPage,
				{
					uid: 'youtube',
					label: 'Youtube',
					url: 'https://youtube.com',
					browserBar: false,
					isService: false,
					stopKey: ' ',
					bgColor: colors.orange,
					height: 40,
				} as ContentPage,
				{
					uid: 'soundcloud',
					label: 'SoundCloud',
					url: 'https://soundcloud.com',
					browserBar: false,
					isService: false,
					stopKey: ' ',
					bgColor: colors.beige,
				} as ContentPage,
				{
					uid: 'internet',
					label: 'Internet',
					url: 'https://youtube.com',
					browserBar: true,
					isService: false,
					stopKey: ' ',
					height: 100,
					bgColor: colors.blue,
				} as ContentPage,
		
				{
					uid: 'baseline',
					isService: false,
					height: 176,
					bgColor: colors.beige,
				} as ContentPage,
			],
		};
		store.dispatch(ActionTypes.SET_CONFIG, config);
		store.dispatch(ActionTypes.SET_CURRENT_PAGE, config.startPage);
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
</style>
