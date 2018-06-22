import { App, BrowserWindow } from "electron";
import { Watcher, WatcherOptions, LegalEvents } from "./Watch";
export declare class Reload {
    protected app: App;
    protected browserWindows: BrowserWindow[];
    protected watcher: Watcher;
    protected events: LegalEvents[];
    constructor(glob: string | string[], app: App, events?: LegalEvents | LegalEvents[], watcherOptions?: WatcherOptions);
    protected Reload(): void;
}
