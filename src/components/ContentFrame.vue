<template>
	<transition name="slide" :run="keyboardVisible">
		<div
			:class="
				`content ${!lcarsMinimised ? 'small' : 'expand'} ${
					keyboardVisible ? 'keyboard' : ''
				}`
			"
		>
			<template v-for="page in contentPages" :key="page.uid">
				<transition name="slide">
					<WebPage
						class="page"
						:url="page.url"
						:uid="page.uid"
						v-show="currentPage === page.uid"
						v-if="cachedComponentUids.includes(page.uid)"
					/>
				</transition>
			</template>
		</div>
	</transition>
</template>

<script lang="ts">
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ContentPage } from '@/utils/interfaces';
import WebPage from '@/components/WebPage.vue';
export default defineComponent({
	components: {
		WebPage,
	},
	setup(props, context) {
		const store = useStore();

		const contentPages = computed(() => store.state.contentPages);
		const currentPage = computed(() => store.state.currentPage);
		const lcarsMinimised = computed(() => store.state.lcarsMinimised);
		const keyboardVisible = computed(() => store.state.keyboard.visible);
		const cachedComponentUids = computed(() =>
			store.state.contentPages
				.filter(
					p =>
						p.isService ||
						p.uid === currentPage.value ||
						store.getters.isInCache(p.uid)
				)
				.map(cp => cp.uid)
		);

		const colors = ['#ff0000', '#ffff00', '#00ffff', '#ff00ff'];
		return {
			contentPages,
			currentPage,
			cachedComponentUids,
			lcarsMinimised,
			colors,
			keyboardVisible,
		};
	},
});
</script>
<style scoped>
.content {
	height: 100%;
	width: 100%;
	position: fixed;
	overflow: hidden;
	top: 0;
	right: 0;
	transition: all 0.22s;
}

.content.small {
	height: 100vh;
	transform: translateY(14px);
	width: calc(100% - 100px);
	height: calc(100% - 34px);
	overflow: hidden;
	transition-delay: 0.7s;
}

.content.keyboard {
	height: calc(100% - 290px) !important;
	transition-delay: 0.5s;
}

.slide-enter-active {
	transition: all 0.4s ease;
	z-index: 1;
}
.slide-leave-active {
	transition: all 0.4s ease;
	z-index: 0;
}

.slide-enter-from {
	transform: translateX(-100vw);
}
.slide-leave-to {
	transform: translateX(100vw);
}
</style>
