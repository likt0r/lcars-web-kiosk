import { ActionTree, ActionContext, Commit } from 'vuex';
import { Mutations, MutationTypes } from './mutations';
import { State } from './state';
import { Config, KeyEvent, PageCacheEntry } from '@/utils/interfaces';
import { store } from '.';

export enum ActionTypes {
	SET_CONFIG = 'SET_CONFIG',
	UPDATE_PAGE_URL = 'UPDATE_PAGE_URL',
	SET_KEYCODE = 'SET_KEYCODE',
	UPDATE_CACHE = 'SET_',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	SET_PAGE_PLAYING_STATE = 'SET_PAGE_PLAYING_STATE',
	SET_KEYBOARD_VISIBLE = 'SET_KEYBOARD_VISIBLE'
}

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
	[ActionTypes.SET_CONFIG](
		{ commit }: AugmentedActionContext,
		payload: Config
	): void;
	[ActionTypes.SET_CURRENT_PAGE](
		{ commit }: AugmentedActionContext,
		uid: string
	): void;
	[ActionTypes.SET_PAGE_PLAYING_STATE](
		{ commit, dispatch, state }: AugmentedActionContext,
		{ uid, isPlaying }: { uid: string; isPlaying: boolean }
	): void;
	[ActionTypes.UPDATE_PAGE_URL](
		{ commit }: AugmentedActionContext,
		{ uid, url }: { uid: string; url: string }
	): void;
	[ActionTypes.SET_KEYCODE](
		{ commit }: AugmentedActionContext,
		keyEvent: KeyEvent
	): void;
	[ActionTypes.SET_KEYBOARD_VISIBLE](
		{commit}: AugmentedActionContext,
		visible: boolean
	): void;
}

export const actions: ActionTree<State, State> & Actions = {
	[ActionTypes.SET_CONFIG]({ commit }, payload) {
		commit(MutationTypes.SET_TIME_TO_PRESERVE_TAB, payload.timeToPreserveTab);
		commit(MutationTypes.SET_CONTENT_PAGES, payload.contentPages);
	},
	[ActionTypes.SET_CURRENT_PAGE]({ commit, state }, uid) {
		if (state.currentPage)
			commit(MutationTypes.PUT_TO_PAGE_CACHE, {
				uid: state.currentPage,
				lastAction: Date.now(),
			} as PageCacheEntry);
		commit(MutationTypes.PUT_TO_PAGE_CACHE, {
			uid,
			lastAction: Date.now(),
		} as PageCacheEntry);
		commit(MutationTypes.SET_CURRENT_PAGE, uid);
	},
	[ActionTypes.SET_PAGE_PLAYING_STATE](
		{ commit, dispatch, state },
		{ uid, isPlaying }
	) {
		// if (isPlaying) {
		// 	//stop other playing pages
		// 	state.contentPages
		// 		.filter(cP => cP.isPlaying)
		// 		.forEach(cP => {
		// 			// dispatch(ActionTypes.SET_KEYCODE, {
		// 			// 	type: 'keyDown',
		// 			// 	keyCode: cP.stopKey,
		// 			// 	target: cP.uid,
		// 			// });
		// 			dispatch(ActionTypes.SET_KEYCODE, {
		// 				type: 'char',
		// 				keyCode: cP.stopKey,
		// 				target: cP.uid,
		// 			});
		// 			dispatch(ActionTypes.SET_KEYCODE, {
		// 				type: 'keyUp',
		// 				keyCode: cP.stopKey,
		// 				target: cP.uid,
		// 			});
		// 		});
		// }
		commit(MutationTypes.SET_PAGE_PLAYING_STATE, { uid, isPlaying });
		commit(MutationTypes.PUT_TO_PAGE_CACHE, {
			uid,
			lastAction: Date.now(),
		} as PageCacheEntry);
	},
	[ActionTypes.UPDATE_PAGE_URL]({ commit }, { uid, url }) {
		commit(MutationTypes.UPDATE_PAGE_URL, { uid, url });
	},
	[ActionTypes.SET_KEYCODE]({ commit }, keyEvent) {
		commit(MutationTypes.SET_KEYCODE, keyEvent);
	},
	[ActionTypes.SET_KEYBOARD_VISIBLE]({ commit }, visible) {
		commit(MutationTypes.SET_KEYBOARD_VISIBLE, visible);
	},
};
