import { ContentPage, PageCacheEntry, KeyEvent } from '@/utils/interfaces';
import { NavigationActions } from '@/utils/enums';
export const state = {
	timeToPreserveTab: 30000,
	contentPages: [] as Array<ContentPage>,
	currentPage: null as string | null,
	pageCache: [] as Array<PageCacheEntry>,
	lcarsMinimised: false,
	keyboard: {
		visible: false,
		lastKeyEvent: null as KeyEvent | null,
	},
	screenLocked: true,
};
export type State = typeof state;
