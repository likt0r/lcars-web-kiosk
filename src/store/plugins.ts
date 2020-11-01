import { Store, MutationTypes, State } from './index';

let cacheInterval: number;

export function cacheClearer(store: Store): void {
	// called when the store is initialized
	store.subscribe((mutation, state: State) => {
		if (mutation.type === MutationTypes.SET_TIME_TO_PRESERVE_TAB) {
			if (cacheInterval) {
				clearInterval(cacheInterval);
			}
			cacheInterval = window.setInterval(() => {
				const toBeRemoved = state.pageCache.filter(
					x => Date.now() - x.closedAt > state.timeToPreserveTab
				);
				toBeRemoved.forEach(x =>
					store.commit(MutationTypes.REMOVE_FROM_PAGE_CACHE, x.uid)
				);
			}, 1000);
		}
	});
}
