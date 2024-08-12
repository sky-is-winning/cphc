const { app, BrowserWindow } = require('electron');
const path = require('path');

let pluginName
switch (process.platform) {
	case 'win32':
		pluginName = 'flash/pepflashplayer64_32_0_0_303.dll'
		break
	case 'darwin':
		pluginName = 'flash/PepperFlashPlayer.plugin'
		break
	case 'linux':
		pluginName = 'flash/libpepflashplayer.so'
		break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		title: "Connecting...",
		icon: __dirname + '/favicon.ico',
		webPreferences: {
			plugins: true
		}
	});

	mainWindow.setMenu(null);
	mainWindow.loadURL('https://play.cphistory.pw/client.html');

	mainWindow.on('closed', function() {
		mainWindow = null
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
	if (mainWindow === null) createWindow();
});
