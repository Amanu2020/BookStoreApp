
'use strict';
const electron = require('electron')
const path = require('path')
const url = require('url')
const mongoose = require('mongoose');
const Datastore = require('nedb')
const config = require('./config/database');

//Set up default mongoose connection
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
let database = mongoose.connection;

//Check Mongoose connection
database.once('open', function () {
  console.log('App connected to MongoDB');
});

// Check for DB errors
database.on('error', function (err) {
  console.log(err);
});

const { app,  Menu,  BrowserWindow, screen, ipcMain } = electron
//const menu = require('./components/menubar')

//Init browser win
let win;

app.on('ready', () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
        frame: true,
        width, height,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            sandbox: true
        },
        icon: __dirname + '/images/icon.png'
    });

    //load main html into window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'view/shelf.html'),
        protocol: 'file',
        slashes: true
    }));

    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Home',
                    accelerator: process.platform == 'darwin' ? 'command+H' : 'ctrl+H',
                    click() {
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, 'view/index.html'),
                            protocol: 'file',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'Shelf',
                    accelerator: process.platform == 'darwin' ? 'command+M' : 'ctrl+M',
                    click() {
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, 'view/Shelf.html'),
                            protocol: 'file',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'About',
                    accelerator: process.platform == 'darwin' ? 'command+S' : 'ctrl+A',
                    click() {
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, 'view/about.html'),
                            protocol: 'file',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'Inventory',
                    accelerator: process.platform == 'darwin' ? 'command+S' : 'ctrl+S',
                    click() {
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, 'view/inventory.html'),
                            protocol: 'file',
                            slashes: true
                        }));
                    }
                },
                { type: 'separator' },
                {
                    label: 'Refresh',
                    accelerator: "CmdorCtrl+R",
                    click() {
                        win.reload();
                    }
                },
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'command+Q' : 'ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ],
        },
        {
            label: 'Access',
            submenu: [
                {
                    label: 'Login',
                    accelerator: process.platform == 'darwin' ? 'command+M' : 'ctrl+M',
                    click() {
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, 'view/login.html'),
                            protocol: 'file',
                            slashes: true
                        }));
                    }
                },
                {
                    label: 'Register',
                    accelerator: process.platform == 'darwin' ? 'command+S' : 'ctrl+A',
                    click() {
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, 'view/register.html'),
                            protocol: 'file',
                            slashes: true
                        }));
                    }
                }
            ]
        },
        {
            label: 'Developer',
            submenu: [
                {
                    label: 'DevTools',
                    accelerator: process.platform == 'darwin' ? 'command+I' : 'ctrl+I',
                    click(item, win) {win.toggleDevTools() }
                },
                {
                    label: 'Clear All',
                accelerator: process.platform == 'darwin' ? 'Command+C' : 'Ctrl+C',
                click(item, currentWindow) { win.webContents.send('clearAll') }
                }
            ]
        }
    ])

if (process.platform == 'darwin') mainMenuTemplate.unshift({})
    Menu.setApplicationMenu(menu);

    // Dev Tool
    //win.webContents.openDevTools();
    
    // Shut down app when window closes
    win.on('closed', () => {
        win = null;
        app.quit();
    });

});

//Run Node.js server
let server = require('./server/server.js');

app.setUserTasks([
   {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'Admas BookStore',
      description: 'Admas BookStore'
   }
])

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win === null) {
        app.show();
    }
})

const users = new Datastore({
    filename: './items.db', 
    timestampData: true,
    autoload: true
})

//Get message from index page and send back to the client
ipcMain.on('refresh', (event, text) => {
    console.log('Something')
    win.reload()
    win.webContents.send('refreshed', 'Refreshed')
});
    
// Get all items from db and send them to the client
ipcMain.on('loadAll', () => users.find({}, (err, items) => win.webContents.send('loaded', items)))

//Saves item and returns it to client
ipcMain.on('addItem', (e, item) => {
    users.insert(item, err => {
        if (err) throw new Error(err)
    })
    win.webContents.send('added', item)
})

// Clears database and send event to client if sussesful
ipcMain.on('clearAll', () => {
    users.remove({}, { multi: true }, (err) => {
        if (err) throw new Error(err)
        win.webContents.send('cleared')
    })
})