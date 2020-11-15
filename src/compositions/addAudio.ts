const clicks = [
	new Audio(require('@/assets/audio/keyok2.mp3')),
	new Audio(require('@/assets/audio/keyok3.mp3')),
	new Audio(require('@/assets/audio/keyok5.mp3')),
];

clicks.forEach(audio => (audio.preload = 'auto'));
export default function() {
	return {
		playClick() {
			const index = Math.round(Math.random() * (clicks.length - 1));
			clicks[index].play();
		},
	};
}
