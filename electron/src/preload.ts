import { contextBridge, dialog, ipcMain, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcApi", {
    exportFile: (geojson: any) => ipcRenderer.invoke("export_file", [geojson]),
    importFile: () => ipcRenderer.invoke("import_file", [])
});