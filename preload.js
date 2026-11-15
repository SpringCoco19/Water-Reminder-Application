
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    showNotification: () => ipcRenderer.send("show-water-notification"),

    onStopSound: (callback) => {
        ipcRenderer.on("stop-water-sound", callback);
    }
});
