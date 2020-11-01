import { MutationTree } from 'vuex';
import { ContentPage } from '@/utils/interfaces';
import { State, PageCacheEntry } from './state';

export enum MutationTypes {
	SET_CONTENT_PAGES = 'SET_CONTENT_PAGES',
	SET_TIME_TO_PRESERVE_TAB = 'SET_TIME_TO_PRESERVE_TAB',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	ADD_TO_PAGE_CACHE = 'ADD_TO_PAGE_CACHE',
	REMOVE_FROM_PAGE_CACHE = 'REMOVE_FROM_PAGE_CACHE',
	UPDATE_PAGE_URL = 'UPDATE_PAGE_URL',
}

export type Mutations<S = State> = {
	[MutationTypes.SET_CONTENT_PAGES](state: S, contentPages: Array<ContentPage>): void;
	[MutationTypes.SET_TIME_TO_PRESERVE_TAB](state: S, payload: number): void;
	[MutationTypes.SET_CURRENT_PAGE](state: S, uid: string): void;
	[MutationTypes.ADD_TO_PAGE_CACHE](state: S, pageCacheEntry: PageCacheEntry): void;
	[MutationTypes.REMOVE_FROM_PAGE_CACHE](state: S, uid: string): void;
	[MutationTypes.UPDATE_PAGE_URL](
		state: S,
		{ uid, url }: { uid: string; url: string }
	): void;
};

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.SET_CONTENT_PAGES](state, contentPages) {
		state.contentPages = contentPages;
	},
	[MutationTypes.SET_TIME_TO_PRESERVE_TAB](state, payload) {
		state.timeToPreserveTab = payload;
	},
	[MutationTypes.SET_CURRENT_PAGE](state: State, uid) {
		state.currentPage = uid;
	},
	[MutationTypes.ADD_TO_PAGE_CACHE](state, pageCacheEntry) {
		state.pageCache = state.pageCache
			.filter(p => p.uid !== pageCacheEntry.uid) // eventually remove it to prevent doubling
			.concat([pageCacheEntry]);
	},
	[MutationTypes.REMOVE_FROM_PAGE_CACHE](state, uid) {
		state.pageCache = state.pageCache.filter(p => p.uid !== uid);
	},
	[MutationTypes.UPDATE_PAGE_URL](state, { uid, url }) {
		const page = state.contentPages.find(p => p.uid === uid);
		if (page) page.url = url;
	},
};
