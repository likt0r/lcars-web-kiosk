'use strict';

export interface ContentPage {
	uid: string;
	label: string;
	url: string;
	browserBar: boolean;
}

export interface Config {
	timeToPreserveTab: number;
	startPage: string;

	contentPages: Array<ContentPage>;
}
