import { ContentPage } from '@/utils/interfaces';

export interface PageCacheEntry {
	uid: string;
	isPlaying: boolean;
	closedAt: number;
}

export const state = {
	timeToPreserveTab: 30000,
	contentPages: [] as Array<ContentPage>,
	currentPage: null as string | null,
	pageCache: [] as Array<PageCacheEntry>,
	keyboard: {
		visible: false,
		lastKeyEvent: null as {
			type: string;
			keyCode: string;
		} | null,
	},
};
export type State = typeof state;
