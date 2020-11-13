<template>
	<div class="content">
		<transition-group name="list">
			<WebPage
				class="page"
				v-for="page in cachedComponents"
				:key="page.uid"
				:url="page.url"
				:uid="page.uid"
				v-show="currentPage === page.uid"
			/>
		</transition-group>
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
				p =>
					p.isService ||
					p.uid === currentPage.value ||
					store.getters.isInCache(p.uid)
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
.page {
	height: 100vh;
	width: 100vw;
}
.content {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

.list-item {
	display: inline-block;
	margin-right: 10px;
}
.list-enter-active {
	transition: all 3s;
}
.list-leave-active {
	transition: all 1s;
}
.list-enter /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	z-index: -1;
	transform: translateX(100vw);
}
.list-leave-to {
	z-index: -1;
	transform: translateX(100vw);
}
</style>
