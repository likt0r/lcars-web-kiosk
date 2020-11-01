import { statSync } from 'fs';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
	doubledCounter(state: State): number;
	isInCache(state: State): (uid: string) => boolean;
};

export const getters: GetterTree<State, State> & Getters = {
	doubledCounter: state => {
		return state.timeToPreserveTab * 2;
	},
	isInCache: state => uid => (state.pageCache.find(p => p.uid === uid) ? true : false),
};
