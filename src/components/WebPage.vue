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

import { useStore, ActionTypes } from '../store';
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
	},

	setup(props) {
		// Template refs
		const webview = ref(null);

		const store = useStore();
		const webViewUrl = ref(props.url);
		let stateUpdater: number;

		const isActive = computed(() => store.state.currentPage === props.uid);
		const lastKeyEvent = computed(() => store.state.keyboard.lastKeyEvent);
		watch(lastKeyEvent, (key, oldKey) => {
			if (isActive.value && key && webview.value) {
				console.log(key.keyCode);
				(webview.value as any).sendInputEvent(JSON.parse(JSON.stringify(oldKey)));
			}
		});
		onMounted(() => {
			console.log(webview);
			webViewUrl.value = props.url;
			const loadstart = () => {
				if ((webview.value as any).getURL())
					store.dispatch(ActionTypes.UPDATE_PAGE_URL, {
						uid: props.uid,
						url: (webview.value as any).getURL(),
					});
			};

			const loadstop = () => {
				console.log('finished');
			};
			nextTick(() => {
				(webview.value as any).addEventListener('did-start-loading', loadstart);
				(webview.value as any).addEventListener('did-stop-loading', loadstop);

				stateUpdater = window.setInterval(() => {
					if ((webview.value as any).isCurrentlyAudible()) {
						store.dispatch(ActionTypes.UPDATE_CACHE, props.uid);
						console.log('is playing ', props.uid);
					}
				}, 1000);
			});
		});

		onBeforeUnmount(() => {
			if (stateUpdater) clearInterval(stateUpdater);
		});

		return {
			webview,
			webViewUrl,
		};
	},
});
</script>

<style>
.content {
	width: 100%;
	height: 100%;
}
iframe {
	border: none;
}
</style>
