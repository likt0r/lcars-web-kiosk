import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
	isInCache(state: State): (uid: string) => boolean;
};

export const getters: GetterTree<State, State> & Getters = {
	isInCache: state => uid => (state.pageCache.find(p => p.uid === uid) ? true : false),
};
