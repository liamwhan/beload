import { App, BrowserWindow } from "electron";
import { Bewatch, WatcherOptions, LegalEvents } from "bewatch";
export declare class Reload {
    protected app: App;
    protected browserWindows: BrowserWindow[];
    protected watcher: Bewatch;
    protected events: LegalEvents[];
    protected options: WatcherOptions;
    constructor(glob: string | string[], app: App, events?: LegalEvents | LegalEvents[], watcherOptions?: WatcherOptions);
    protected log(...logargs: any[]): void;
    protected reload(): void;
}
