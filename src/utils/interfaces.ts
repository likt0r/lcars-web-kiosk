'use strict';

export interface ContentPage {
	isSpacer: boolean | undefined;
	uid: string;
	home: string;
	label: string | undefined;
	url: string | undefined;
	browserBar: boolean | undefined;
	isService: boolean | undefined;
	stopKey: string | undefined;
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
