import { colors } from '@/utils/enums';

export type BrowseEvent = {
	action: string;
	payload?: string;
};

export type KeyEvent = {
	keyCode: string;
	type: string;
	target: string;
};

export type BrowseEventListener = (event: BrowseEvent) => void;
export type KeyEventListener = (event: KeyEvent) => void;
const browseEventListeners: BrowseEventListener[] = [];
const keyEventListerners: KeyEventListener[] = [];
export default function() {
	return {
		registerBrowseEventListener(listener: BrowseEventListener) {
			browseEventListeners.push(listener);
		},
		dispatchBrowseEvent(event: BrowseEvent) {
			browseEventListeners.forEach(listener => listener(event));
		},
		registerKeyListener(listener: KeyEventListener) {
			keyEventListerners.push(listener);
		},
		dispatchKeyEvent(event: KeyEvent) {
			keyEventListerners.forEach(listener => listener(event));
		},
	};
}
