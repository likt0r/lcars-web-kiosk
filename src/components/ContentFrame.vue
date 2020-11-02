<template>
	<div class="content">
		<WebPage
			v-for="page in cachedComponents"
			:key="page.uid"
			:url="page.url"
			:uid="page.uid"
			v-show="currentPage === page.uid"
		/>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import WebPage from '@/components/WebPage.vue';
export default defineComponent({
	components: {
		WebPage,
	},
	setup(props, context) {
		const store = useStore();

		const contentPages = computed(() => store.state.contentPages);
		const currentPage = computed(() => store.state.currentPage);
		const cachedComponents = computed(() =>
			store.state.contentPages.filter(
				p => p.isService || p.uid === currentPage.value || store.getters.isInCache(p.uid)
			)
		);
		return {
			contentPages,
			currentPage,
			cachedComponents,
		};
	},
});
</script>
<style scoped>
.content {
	height: 100vh;
	width: 100vw;
}
</style>
