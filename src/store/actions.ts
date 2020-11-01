import { ActionTree, ActionContext, Commit } from 'vuex';
import { Mutations, MutationTypes } from './mutations';
import { State, PageCacheEntry } from './state';
import { Config } from '@/utils/interfaces';

export enum ActionTypes {
	SET_CONFIG = 'SET_CONFIG',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	UPDATE_PAGE_URL = 'UPDATE_PAGE_URL',
}

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
	[ActionTypes.SET_CONFIG]({ commit }: AugmentedActionContext, payload: Config): void;
	[ActionTypes.SET_CURRENT_PAGE](
		{ commit }: AugmentedActionContext,
		payload: string
	): void;
	[ActionTypes.UPDATE_PAGE_URL](
		{ commit }: AugmentedActionContext,
		{ uid, url }: { uid: string; url: string }
	): void;
}

export const actions: ActionTree<State, State> & Actions = {
	[ActionTypes.SET_CONFIG]({ commit }, payload) {
		commit(MutationTypes.SET_TIME_TO_PRESERVE_TAB, payload.timeToPreserveTab);
		commit(MutationTypes.SET_CONTENT_PAGES, payload.contentPages);
	},
	[ActionTypes.SET_CURRENT_PAGE]({ commit, state }, payload) {
		if (state.currentPage)
			commit(MutationTypes.ADD_TO_PAGE_CACHE, {
				uid: state.currentPage,
				closedAt: Date.now(),
				isPlaying: false,
			} as PageCacheEntry);
		commit(MutationTypes.SET_CURRENT_PAGE, payload);
	},
	[ActionTypes.UPDATE_PAGE_URL]({ commit }, { uid, url }) {
		commit(MutationTypes.UPDATE_PAGE_URL, { uid, url });
	},
};
