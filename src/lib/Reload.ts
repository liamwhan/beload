import {App, BrowserWindow, Event} from "electron";
import {Watcher, WatcherOptions, LegalEvents} from "./Watch";
import Callsite from "callsite";
import path = require("path");

export class Reload {
    protected app: App;
    protected browserWindows: BrowserWindow[] = [];
    protected watcher: Watcher;
    protected events: LegalEvents[];

    constructor(glob: string|string[], app: App, events: LegalEvents|LegalEvents[] = "all", watcherOptions: WatcherOptions = {}) {
        this.app = app;

        this.events = (events instanceof Array) ? events : [events];

        const cwd = path.dirname(Callsite()[1].getFileName());
        this.watcher = new Watcher(glob, {cwd});
        
        for (const eventType of this.events) {

            this.watcher.on(eventType, () => this.Reload());
        }
        this.watcher.Start();

        this.app.on("browser-window-created", (event: Event, window: BrowserWindow) => {
            this.browserWindows.push(window);
            window.on("closed", () => {
                const i  = this.browserWindows.indexOf(window);
                this.browserWindows.splice(i, 1);
            })
        });
    }

    protected Reload(): void {
        for (const win of this.browserWindows) {
            win.webContents.reloadIgnoringCache();
        }
    }
}