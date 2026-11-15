//Geting Electron
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
//Name Of App
app.setName("Water Reminder App");
//Dimentions Of App
function createWindow() {
    const win = new BrowserWindow({
        width: 214,
        height: 228,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: false,
        webPreferences: {
            contextIsolation: true,
            preload: __dirname + "/preload.js"
        }
    });

    win.loadFile("index.html");
}
//when to show electron notification/what is in the notification
ipcMain.on("show-water-notification", (event) => {
    const notification = new Notification({
        title: "Water Reminder 💧",
        body: "Time to drink water!",
        actions: [
            {
                type: "button",
                text: "Stop Sound"
            }
        ]
    });
//Detecting when Stop Sound is clicked
    notification.on("action", () => {
        event.sender.send("stop-water-sound");
    });
//Displaying the notification
    notification.show();
});
//Starting the application
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

