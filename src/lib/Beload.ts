import {App, BrowserWindow, Event} from "electron";
import {Bewatch, WatcherOptions, LegalEvents} from "bewatch";
import {Colours} from "colours-ts";
import {EOL} from "os";
import Callsite from "callsite";
import path = require("path");

export class Beload {
    protected app: App;
    protected browserWindows: BrowserWindow[] = [];
    protected watcher: Bewatch;
    protected events: LegalEvents[];
    protected options: WatcherOptions;

    constructor(glob: string|string[], app: App, events: LegalEvents|LegalEvents[] = "all", watcherOptions: WatcherOptions = {}) {
        this.app = app;
        this.options = watcherOptions;
        this.options.cwd = this.options.cwd || path.dirname(Callsite()[1].getFileName());
        this.log("Working Directory:", this.options.cwd);
        this.log("Glob", glob);
        this.events = (events instanceof Array) ? events : [events];
        this.watcher = new Bewatch(glob, this.options);
        
        for (const eventType of this.events) {
            this.log(`Adding Listener for event ${eventType}`);
            this.watcher.on(eventType, () => this.reload());
        }
        
        this.watcher.Start();

        this.app.on("browser-window-created", (event: Event, window: BrowserWindow) => {
            this.log("New BrowserWindow created, adding to watch list.")
            this.browserWindows.push(window);
            window.on("closed", () => {
                const i  = this.browserWindows.indexOf(window);
                this.browserWindows.splice(i, 1);
            })
        });
    }

    protected log(...logargs: any[]): void {
        if (this.options.verbose) {
            // tslint:disable-next-line:no-console
            console.log(`${Colours(`Reloader::${Callsite()[1].getFunctionName()}`, "green") }`, ...logargs, EOL);
        }
    }

    protected reload(): void {
        for (const win of this.browserWindows) {
            win.webContents.reloadIgnoringCache();
        }
    }
}