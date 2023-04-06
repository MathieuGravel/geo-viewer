import * as fs from "fs";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import * as path from "path";

const IS_DEVELOPMENT = !app.isPackaged || true;

const loadURL = serve({directory: path.join(app.getAppPath(), "build", "www")});

async function createWindow() {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(app.getAppPath(), "build", "preload.js")
        }

    });

    loadURL(window).catch(console.error)

    if (IS_DEVELOPMENT) window.webContents.openDevTools();

    // console.log(__dirname, app.getAppPath());
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

ipcMain.handle("export_file", async (e, [geojson]) => {
    const dialogResponse = await dialog.showSaveDialog({
        filters: [
            { name: "GeoJson", extensions: ["geojson"] },
            { name: "Json", extensions: ["json"] }
        ],
    });
    const path = dialogResponse.filePath;
    if (dialogResponse.canceled || path === undefined) return;
    fs.writeFileSync(path, JSON.stringify(geojson, null, 4));
});

ipcMain.handle("import_file", async (e, args) => {
    const dialogResponse = await dialog.showOpenDialog({
        filters: [
            { name: "GeoJson", extensions: ["geojson"] },
            { name: "Json", extensions: ["json"] }
        ]
    });
    const path = dialogResponse.filePaths[0];
    if (dialogResponse.canceled || path === undefined) return;
    return JSON.parse(fs.readFileSync(path).toString())
});
