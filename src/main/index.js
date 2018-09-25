import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let indexSite = 0
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9081`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  let options = {
    height: 563,
    useContentSize: true,
    width: 1000
  }

  options = require('assignment')(options, global.settings.window)
  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(global.settings.app.sites[indexSite])
  if (global.settings.app.sites.length > 1) {
    setInterval(() => {
      if (indexSite < global.settings.app.sites.length - 1) {
        indexSite++
      } else {
        indexSite = 0
      }
      mainWindow.loadURL(global.settings.app.sites[indexSite])
    }, global.settings.durations.intervalRotation)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('unresponsive', () => {
    console.log('ERROR 61 - Window does not respond, let\'s quit')
    app.quit()
  })

  mainWindow.webContents.on('crashed', () => {
    console.log('ERROR 62 - Webcontent renderer crashed, let\'s quit')
    app.quit()
  })

  mainWindow.webContents.on('destroyed', () => {
    console.log('ERROR 63 - Webcontent destroyed, let\'s quit')
    app.quit()
  })
}

global.settings = require('standard-settings').getSettings()

if (global.settings.appendSwitch) {
  Object.keys(global.settings.appendSwitch).forEach((key) => {
    if (global.settings.appendSwitch[key] !== '') {
      app.commandLine.appendSwitch(key, global.settings.appendSwitch[key])
    } else {
      app.commandLine.appendSwitch(key)
    }
  })
}
if (global.settings.appendArgument) {
  Object.values(global.settings.appendArgument).forEach((value) => {
    app.commandLine.appendArgument(value)
  })
}

app.on('gpu-process-crashed', () => {
  console.log('ERROR 64 - App GPU process has crashed, let\'s quit')
  app.quit()
})

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

process.on('uncaughtException', function (err) {
  console.log('ERROR 60 - process thrown exception, let\'s quit')
  console.log(err)
  if (global.settings.exit.onUncaughtException) {
    app.quit()
  }
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
  if (global.settings.exit.onUnhandledRejection) {
    app.quit()
  }
})
