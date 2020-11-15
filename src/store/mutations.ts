import { MutationTree } from 'vuex';
import { ContentPage, KeyEvent, PageCacheEntry } from '@/utils/interfaces';
import { State } from './state';
import { NavigationActions } from '@/utils/enums';

export enum MutationTypes {
	SET_CONTENT_PAGES = 'SET_CONTENT_PAGES',
	SET_TIME_TO_PRESERVE_TAB = 'SET_TIME_TO_PRESERVE_TAB',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	SET_PAGE_PLAYING_STATE = 'SET_PAGE_PLAYING_STATE',
	PUT_TO_PAGE_CACHE = 'PUT_TO_PAGE_CACHE',
	REMOVE_FROM_PAGE_CACHE = 'REMOVE_FROM_PAGE_CACHE',
	UPDATE_PAGE_URL = 'UPDATE_PAGE_URL',
	SET_KEYCODE = 'SET_KEYCODE',
	SET_KEYBOARD_VISIBLE = 'SET_KEYBOARD_VISIBLE',
	SET_SCREEN_LOCK = 'SET_SCREEN_LOCK',
	SET_LCARS_MINIMISED = 'SET_LCARS_MINIMISED',
	SET_NAVIGATION_ACTION = 'SET_NAVIGATION_ACTION',
}

export type Mutations<S = State> = {
	[MutationTypes.SET_CONTENT_PAGES](
		state: S,
		contentPages: Array<ContentPage>
	): void;
	[MutationTypes.SET_TIME_TO_PRESERVE_TAB](state: S, payload: number): void;
	[MutationTypes.SET_CURRENT_PAGE](state: S, uid: string): void;
	[MutationTypes.SET_PAGE_PLAYING_STATE](
		state: S,
		{ uid, isPlaying }: { uid: string; isPlaying: boolean }
	): void;
	[MutationTypes.PUT_TO_PAGE_CACHE](
		state: S,
		pageCacheEntry: PageCacheEntry
	): void;
	[MutationTypes.REMOVE_FROM_PAGE_CACHE](state: S, uid: string): void;
	[MutationTypes.UPDATE_PAGE_URL](
		state: S,
		{ uid, url }: { uid: string; url: string }
	): void;
	[MutationTypes.SET_KEYCODE](state: S, keyEvent: KeyEvent): void;
	[MutationTypes.SET_KEYBOARD_VISIBLE](state: S, visible: boolean): void;
	[MutationTypes.SET_SCREEN_LOCK](state: S, locked: boolean): void;
	[MutationTypes.SET_LCARS_MINIMISED](state: S, minimised: boolean): void;
	[MutationTypes.SET_NAVIGATION_ACTION](
		statE: S,
		action: NavigationActions
	): void;
};

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.SET_CONTENT_PAGES](state, contentPages) {
		contentPages = JSON.parse(JSON.stringify(contentPages));
		contentPages.forEach(cP => (cP.isPlaying = false));
		state.contentPages = contentPages;
	},
	[MutationTypes.SET_TIME_TO_PRESERVE_TAB](state, payload) {
		state.timeToPreserveTab = payload;
	},
	[MutationTypes.SET_CURRENT_PAGE](state: State, uid) {
		state.currentPage = uid;
	},
	[MutationTypes.SET_PAGE_PLAYING_STATE](state: State, { uid, isPlaying }) {
		const page = state.contentPages.find(cP => cP.uid === uid);
		if (page) page.isPlaying = isPlaying;
	},
	[MutationTypes.PUT_TO_PAGE_CACHE](state, pageCacheEntry) {
		state.pageCache = state.pageCache
			.filter(p => p.uid !== pageCacheEntry.uid) // eventually remove it to prevent doubling
			.concat([pageCacheEntry]);
		console.log(
			'Cache: ',
			state.pageCache.map(pC => pC.uid)
		);
	},
	[MutationTypes.REMOVE_FROM_PAGE_CACHE](state, uid) {
		state.pageCache = state.pageCache.filter(p => p.uid !== uid);
		console.log(
			'Cache: ',
			state.pageCache.map(pC => pC.uid)
		);
	},
	[MutationTypes.UPDATE_PAGE_URL](state, { uid, url }) {
		const page = state.contentPages.find(p => p.uid === uid);
		if (page) page.url = url;
	},
	[MutationTypes.SET_KEYCODE](state, keyEvent) {
		console.log('State.keyboard.lastKeyVent', keyEvent);
		state.keyboard.lastKeyEvent = { ...keyEvent };
	},
	[MutationTypes.SET_KEYBOARD_VISIBLE](state, visible) {
		state.keyboard.visible = visible;
	},
	[MutationTypes.SET_SCREEN_LOCK](state, locked) {
		state.screenLocked = locked;
	},
	[MutationTypes.SET_LCARS_MINIMISED](state, minimised) {
		state.lcarsMinimised = minimised;
	},
	[MutationTypes.SET_NAVIGATION_ACTION](state, action) {
		state.currentNavigationAction = action;
	},
};
