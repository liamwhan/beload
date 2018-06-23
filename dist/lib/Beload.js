"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bewatch_1 = require("bewatch");
const colours_ts_1 = require("colours-ts");
const os_1 = require("os");
const callsite_1 = __importDefault(require("callsite"));
const path = require("path");
class Beload {
    constructor(glob, app, events = "all", watcherOptions = {}) {
        this.browserWindows = [];
        this.app = app;
        this.options = watcherOptions;
        this.options.cwd = this.options.cwd || path.dirname(callsite_1.default()[1].getFileName());
        this.log("Working Directory:", this.options.cwd);
        this.log("Glob", glob);
        this.events = (events instanceof Array) ? events : [events];
        this.watcher = new bewatch_1.Bewatch(glob, this.options);
        for (const eventType of this.events) {
            this.log(`Adding Listener for event ${eventType}`);
            this.watcher.on(eventType, () => this.reload());
        }
        this.watcher.Start();
        this.app.on("browser-window-created", (event, window) => {
            this.log("New BrowserWindow created, adding to watch list.");
            this.browserWindows.push(window);
            window.on("closed", () => {
                const i = this.browserWindows.indexOf(window);
                this.browserWindows.splice(i, 1);
            });
        });
    }
    log(...logargs) {
        if (this.options.verbose) {
            // tslint:disable-next-line:no-console
            console.log(`${colours_ts_1.Colours(`Reloader::${callsite_1.default()[1].getFunctionName()}`, "green")}`, ...logargs, os_1.EOL);
        }
    }
    reload() {
        for (const win of this.browserWindows) {
            win.webContents.reloadIgnoringCache();
        }
    }
}
exports.Beload = Beload;
