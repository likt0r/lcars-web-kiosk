'use strict';

export interface ContentPage {
	uid: string;
	label: string;
	url: string;
	browserBar: boolean;
	isService: boolean;
	stopKey: string;
	isPlaying: boolean | undefined;
	bgColor: string;
	height: number;
	width: number;
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

export interface TileData {
	color: string;
	height: number;
	width: number;
}
