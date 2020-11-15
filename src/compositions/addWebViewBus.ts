import { colors } from '@/utils/enums';
import {} from '@/utils/enums';
export type BrowseEvent = {
	action: string;
	payload?: string;
};
export type BrowseEventListener = (event: BrowseEvent) => void;
const browseEventListeners: BrowseEventListener[] = [];

export default function() {
	return {
		registerBrowseEventListener(listener: BrowseEventListener) {
			browseEventListeners.push(listener);
		},
		dispatchBrowseEvent(event: BrowseEvent) {
			browseEventListeners.forEach(listener => listener(event));
		},
	};
}
