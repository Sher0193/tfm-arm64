const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');
let pluginName = 'libpepflashplayer_64.so';

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, '/flash/' + pluginName));

console.log( path.join(__dirname, '/flash/' + pluginName)); 

function createWindow () {
 // Create the browser window.
 let win = new BrowserWindow({
   width: 800,
   height: 600,
   webPreferences: {
     nodeIntegration: true,
     plugins: true,
     webviewTag: true,
     webSecurity: false,
   }
 });
//  win.removeMenu(BrowserWindow);

 // and load the index.html of the app.
 win.loadFile( path.join( __dirname, '/swf/chargeur-steam.swf' ) );

 win.on('closed', () => {
   // Dereference the window object, usually you would store windows
   // in an array if your app supports multi windows, this is the time
   // when you should delete the corresponding element.
   win = null
 });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
 // On macOS it is common for applications and their menu bar
 // to stay active until the user quits explicitly with Cmd + Q
 if (process.platform !== 'darwin') {
   app.quit();
 }
})

app.on('activate', () => {
 // On macOS it's common to re-create a window in the app when the
 // dock icon is clicked and there are no other windows open.
 if (win === null) {
   createWindow();
 }
});
