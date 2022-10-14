import { app, BrowserWindow } from "electron";
import * as path from "path";


const IS_DEVELOPMENT = !app.isPackaged;

const INDEX_HTML: string = path.join(__dirname, "index.html");

async function createWindow() {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        height: 600,
        width: 800,
    });

    window.loadFile(INDEX_HTML).catch(console.error);

    if (IS_DEVELOPMENT) window.webContents.openDevTools();
}

app.once("ready", () => {
    createWindow().catch(console.error);

    app.on("activate", function () {
        // On macOS, it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow().catch(console.error);
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});