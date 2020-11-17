import { useStore, ActionTypes } from '@/store';
const store = useStore();
let interacted = false;
function notify() {
	console.log('user_interaction');
	interacted = true;
}

function addInterActionListenerElement(element: HTMLElement): void {
	element.addEventListener('mousemove', notify);
	element.addEventListener('scroll', notify);
	element.addEventListener('keydown', notify);
	element.addEventListener('click', notify);
	element.addEventListener('touchstart', notify);
}

setInterval(() => {
	if (interacted) {
		interacted = false;
		store.dispatch(ActionTypes.SET_SCREEN_LOCK, false);
	}
}, 5000);

export default function() {
	return {
		addInterActionListenerElement,
	};
}
