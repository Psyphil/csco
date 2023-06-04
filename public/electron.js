const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0d0f14',
      symbolColor: '#ffffff',
      height: 24,
    },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  if (isDev) win.loadURL('http://localhost:3000')
  else win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  console.log('test')
  protocol.registerFileProtocol(
    'image',
    (request, callback) => {
      const filePath = url.fileURLToPath(
        'file://' +
          __dirname +
          '/../images/' +
          request.url.split('/').reverse()[0],
      )
      callback(filePath)
    }
  )
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
