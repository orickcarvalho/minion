const { app, BrowserWindow, globalShortcut } = require("electron");
const urlPadrao = "http://localhost:3000/";

let win;

const criarJanela = () => {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 600,
    height: 400,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    darkTheme: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      javascript: true,
    },
  });
  //
  win.loadURL(urlPadrao);
};

const abrirDevTools = () => {
  win.webContents.toggleDevTools();
};
//
const criarAtalhos = () => {
  globalShortcut.register("CmdOrCtrl+I", abrirDevTools);
  globalShortcut.register("CmdOrCtrl+W", app.quit);
};
//
const fpsPadrao = () => {
  win.webContents.setFrameRate(30);
};
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.disableHardwareAcceleration();
//
app.whenReady().then(criarJanela).then(fpsPadrao).then(criarAtalhos);

app.on("window-all-closed", () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    criarJanela();
  }
});
