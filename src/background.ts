'use strict';

import { app, protocol, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1024,
		height: 600,
		autoHideMenuBar: true,
		kiosk: !isDevelopment,
		fullscreen: !isDevelopment,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: (process.env
				.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
			webviewTag: true,
			// webSecurity: false,
			// allowRunningInsecureContent: true,
			// autoplayPolicy: 'no-user-gesture-required',
		},
	});
	win.webContents.on('render-process-gone', e => {
		app.relaunch();
		app.quit();
	});

	// prevent zoom gesture
	const webContents = win.webContents;
	webContents.on('did-finish-load', () => {
		webContents.setZoomFactor(1);
		webContents.setVisualZoomLevelLimits(1, 1);
	});

	// win.webContents.session.webRequest.onHeadersReceived({ urls: ["*://*/*"] }, (responseDetails, response) => {
	//   if (responseDetails.responseHeaders) {
	//     if (responseDetails.responseHeaders["X-Frame-Options"]) {
	//       delete responseDetails.responseHeaders["X-Frame-Options"];
	//     } else if (responseDetails.responseHeaders["x-frame-options"]) {
	//       delete responseDetails.responseHeaders["x-frame-options"];
	//     }
	//     if (responseDetails.responseHeaders["content-security-policy"]) {
	//       delete responseDetails.responseHeaders["content-security-policy"];
	//     }

	//     response({
	//       cancel: false,
	//       responseHeaders: responseDetails.responseHeaders,
	//     });
	//   }
	// });

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	} else {
		createProtocol('app');
		// Load the index.html when not in development
		win.loadURL('app://./index.html');
	}
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools beta for vue 3
		try {
			await installExtension({
				id: 'ljjemllljcmogpfapbkkighbhhppjdbg',
				electron: '>=1.2.1',
			});
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString());
		}
	}
	createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
