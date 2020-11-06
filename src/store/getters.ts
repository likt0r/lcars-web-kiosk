import { GetterTree } from 'vuex';
import { State } from './state';
import { ContentPage } from '@/utils/interfaces';
export type Getters = {
	isInCache(state: State): (uid: string) => boolean;
	getContentPage(state: State): (uid: string) => ContentPage;
};

export const getters: GetterTree<State, State> & Getters = {
	isInCache: state => uid =>
		state.pageCache.find(p => p.uid === uid) ? true : false,
	getContentPage: state => uid => {
		const contentPage = state.contentPages.find(p => p.uid === uid);
		if (typeof contentPage === 'undefined') {
			throw new Error(`Could not find content page with uid: ${uid}`);
		}
		return contentPage;
	},
};
