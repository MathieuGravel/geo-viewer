import { contextBridge, dialog, ipcMain, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcApi", {
    importFile: () => ipcRenderer.invoke("import_file", ["a1", 2])
});
