<template>
	<webview ref="webview" :src="webViewUrl" class="content" />
</template>

<script lang="ts">
import {
	defineComponent,
	onBeforeMount,
	onBeforeUnmount,
	onMounted,
	computed,
	watch,
	ref,
	nextTick,
} from 'vue';
import { WebviewTag } from 'electron';
import { useStore, ActionTypes } from '../store';
import { NavigationActions } from '@/utils/enums';
import addWebViewBus from '@/compositions/addWebViewBus';
export default defineComponent({
	props: {
		uid: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		color: {
			type: String,
		},
	},

	setup(props) {
		// Template refs
		const webview = ref(null);

		const isPlaying = ref(false);
		const store = useStore();
		const webViewUrl = ref(props.url);
		let stateUpdater: number;

		const isActive = computed(() => store.state.currentPage === props.uid);
		const lastKeyEvent = computed(() => store.state.keyboard.lastKeyEvent);
		const currentNavigationAction = computed(
			() => store.state.currentNavigationAction
		);
		const { registerBrowseEventListener } = addWebViewBus();
		watch(lastKeyEvent, (key, oldKey) => {
			if (key?.target === props.uid) {
				console.log(key.keyCode);
				if (typeof (webview.value as any).sendInputEvent === 'function')
					(webview.value as any).sendInputEvent(
						JSON.parse(JSON.stringify(oldKey))
					);
			}
		});
		registerBrowseEventListener(event => {
			if (store.state.currentPage === props.uid) {
				console.log('CurrentAction ', event.action);
				if (
					event.action === NavigationActions.forward &&
					(webview.value as any).canGoForward()
				) {
					(webview.value as any).goForward();
				}
				if (
					event.action === NavigationActions.back &&
					(webview.value as any).canGoBack()
				) {
					(webview.value as any).goBack();
				}
				if (event.action === NavigationActions.home) {
					(webview.value as any).loadURL(
						store.getters.getContentPage(props.uid).home
					);
				}
			}
		});
		onMounted(() => {
			const webviewNode = (webview.value as unknown) as WebviewTag;
			webViewUrl.value = props.url;
			const loadstart = () => {
				if (webviewNode.getURL())
					store.dispatch(ActionTypes.UPDATE_PAGE_URL, {
						uid: props.uid,
						url: (webview.value as any).getURL(),
					});
			};

			const loadstop = () => {
				console.log('finished');
			};
			nextTick(() => {
				webviewNode.addEventListener('did-start-loading', loadstart);
				webviewNode.addEventListener('did-stop-loading', loadstop);
				webviewNode.addEventListener('media-started-playing', () => {
					isPlaying.value = true;
					store.dispatch(ActionTypes.SET_PAGE_PLAYING_STATE, {
						uid: props.uid,
						isPlaying: isPlaying.value,
					});
				});
				webviewNode.addEventListener('media-paused', () => {
					isPlaying.value = false;
					store.dispatch(ActionTypes.SET_PAGE_PLAYING_STATE, {
						uid: props.uid,
						isPlaying: isPlaying.value,
					});
				});
			});
		});

		onBeforeUnmount(() => {
			if (stateUpdater) clearInterval(stateUpdater);
		});

		return {
			isPlaying,
			webview,
			webViewUrl,
		};
	},
});
</script>

<style scoped>
.content {
	width: 100%;
	height: 100%;
}
iframe {
	border: none;
}
</style>
