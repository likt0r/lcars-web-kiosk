import { ContentPage, PageCacheEntry, KeyEvent } from '@/utils/interfaces';

export const state = {
	timeToPreserveTab: 30000,
	contentPages: [] as Array<ContentPage>,
	currentPage: null as string | null,
	pageCache: [] as Array<PageCacheEntry>,
	keyboard: {
		visible: false,
		lastKeyEvent: null as KeyEvent | null,
	},
};
export type State = typeof state;
