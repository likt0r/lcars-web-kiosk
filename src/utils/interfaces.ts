'use strict';

export interface ContentPage {
	uid: string;
	label: string;
	url: string;
	browserBar: boolean;
	isService: boolean;
	stopKey: string;
}

export interface Config {
	timeToPreserveTab: number;
	startPage: string;
	contentPages: Array<ContentPage>;
}
