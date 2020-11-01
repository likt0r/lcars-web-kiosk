<template>
	<webview ref="webview" :src="url" class="content" />
</template>

<script lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { defineComponent } from 'vue';

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
		let stateUpdater: number;
		const webview = ref(null);
		const state = ref(false);
		function toggle() {
			state.value = !state.value;
		}

		onMounted(() => {
			console.log(webview);
			const loadstart = () => {
				console.log('loading...', (webview.value as any).getURL());
			};

			const loadstop = () => {
				console.log('finished');
			};
			(webview.value as any).addEventListener('did-start-loading', loadstart);
			(webview.value as any).addEventListener('did-stop-loading', loadstop);
			stateUpdater = window.setInterval(() => {
				if ((webview.value as any).isCurrentlyAudible()) {
					console.log('is playing ', props.uid);
				}
			}, 1000);
		});

		onBeforeUnmount(() => {
			if (stateUpdater) clearInterval(stateUpdater);
		});

		return {
			webview,
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
