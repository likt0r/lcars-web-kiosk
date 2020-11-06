'use strict';

export interface ContentPage {
	uid: string;
	label: string;
	url: string;
	browserBar: boolean;
	isService: boolean;
	stopKey: string;
	isPlaying: boolean;
	bgColor: string;
}

export interface Config {
	timeToPreserveTab: number;
	startPage: string;
	contentPages: Array<ContentPage>;
}

export interface PageCacheEntry {
	uid: string;
	lastAction: number;
}

export interface KeyEvent {
	target: string;
	type: string;
	keyCode: string;
}
