"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Watch_1 = require("./Watch");
const Colors_1 = require("./Colors");
const os_1 = require("os");
const callsite_1 = __importDefault(require("callsite"));
const path = require("path");
class Reload {
    constructor(glob, app, events = "all", watcherOptions = {}) {
        this.browserWindows = [];
        this.app = app;
        this.options = watcherOptions;
        this.options.cwd = this.options.cwd || path.dirname(callsite_1.default()[1].getFileName());
        this.events = (events instanceof Array) ? events : [events];
        this.watcher = new Watch_1.Watcher(glob, watcherOptions);
        for (const eventType of this.events) {
            this.log(`Adding Listener for event ${eventType}`);
            this.watcher.on(eventType, () => this.reload());
        }
        this.watcher.Start();
        this.app.on("browser-window-created", (event, window) => {
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
            console.log(`${os_1.EOL}${Colors_1.Colors(`Reloader::${callsite_1.default()[1].getFunctionName()}`, "green")}`, ...logargs, os_1.EOL);
        }
    }
    reload() {
        for (const win of this.browserWindows) {
            win.webContents.reloadIgnoringCache();
        }
    }
}
exports.Reload = Reload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtQ0FBNkQ7QUFDN0QscUNBQWdDO0FBQ2hDLDJCQUF1QjtBQUN2Qix3REFBZ0M7QUFDaEMsNkJBQThCO0FBRTlCO0lBT0ksWUFBWSxJQUFxQixFQUFFLEdBQVEsRUFBRSxTQUFvQyxLQUFLLEVBQUUsaUJBQWlDLEVBQUU7UUFMakgsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBTTNDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQU8sQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFakQsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQVksRUFBRSxNQUFxQixFQUFFLEVBQUU7WUFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNyQixNQUFNLENBQUMsR0FBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsR0FBRyxDQUFDLEdBQUcsT0FBYztRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3RCLHNDQUFzQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBRyxHQUFHLGVBQU0sQ0FBQyxhQUFhLGtCQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsUUFBRyxDQUFDLENBQUM7U0FDN0c7SUFDTCxDQUFDO0lBRVMsTUFBTTtRQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDO0NBQ0o7QUExQ0Qsd0JBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHAsIEJyb3dzZXJXaW5kb3csIEV2ZW50fSBmcm9tIFwiZWxlY3Ryb25cIjtcclxuaW1wb3J0IHtXYXRjaGVyLCBXYXRjaGVyT3B0aW9ucywgTGVnYWxFdmVudHN9IGZyb20gXCIuL1dhdGNoXCI7XHJcbmltcG9ydCB7Q29sb3JzfSBmcm9tIFwiLi9Db2xvcnNcIjtcclxuaW1wb3J0IHtFT0x9IGZyb20gXCJvc1wiO1xyXG5pbXBvcnQgQ2FsbHNpdGUgZnJvbSBcImNhbGxzaXRlXCI7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVsb2FkIHtcclxuICAgIHByb3RlY3RlZCBhcHA6IEFwcDtcclxuICAgIHByb3RlY3RlZCBicm93c2VyV2luZG93czogQnJvd3NlcldpbmRvd1tdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgd2F0Y2hlcjogV2F0Y2hlcjtcclxuICAgIHByb3RlY3RlZCBldmVudHM6IExlZ2FsRXZlbnRzW107XHJcbiAgICBwcm90ZWN0ZWQgb3B0aW9uczogV2F0Y2hlck9wdGlvbnM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2xvYjogc3RyaW5nfHN0cmluZ1tdLCBhcHA6IEFwcCwgZXZlbnRzOiBMZWdhbEV2ZW50c3xMZWdhbEV2ZW50c1tdID0gXCJhbGxcIiwgd2F0Y2hlck9wdGlvbnM6IFdhdGNoZXJPcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB3YXRjaGVyT3B0aW9ucztcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY3dkID0gdGhpcy5vcHRpb25zLmN3ZCB8fCBwYXRoLmRpcm5hbWUoQ2FsbHNpdGUoKVsxXS5nZXRGaWxlTmFtZSgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IChldmVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyBldmVudHMgOiBbZXZlbnRzXTtcclxuICAgICAgICB0aGlzLndhdGNoZXIgPSBuZXcgV2F0Y2hlcihnbG9iLCB3YXRjaGVyT3B0aW9ucyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudFR5cGUgb2YgdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coYEFkZGluZyBMaXN0ZW5lciBmb3IgZXZlbnQgJHtldmVudFR5cGV9YCk7XHJcbiAgICAgICAgICAgIHRoaXMud2F0Y2hlci5vbihldmVudFR5cGUsICgpID0+IHRoaXMucmVsb2FkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLndhdGNoZXIuU3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChldmVudDogRXZlbnQsIHdpbmRvdzogQnJvd3NlcldpbmRvdykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJyb3dzZXJXaW5kb3dzLnB1c2god2luZG93KTtcclxuICAgICAgICAgICAgd2luZG93Lm9uKFwiY2xvc2VkXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgID0gdGhpcy5icm93c2VyV2luZG93cy5pbmRleE9mKHdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJXaW5kb3dzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbG9nKC4uLmxvZ2FyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy52ZXJib3NlKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke0VPTH0ke0NvbG9ycyhgUmVsb2FkZXI6OiR7Q2FsbHNpdGUoKVsxXS5nZXRGdW5jdGlvbk5hbWUoKX1gLCBcImdyZWVuXCIpIH1gLCAuLi5sb2dhcmdzLCBFT0wpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3Qgd2luIG9mIHRoaXMuYnJvd3NlcldpbmRvd3MpIHtcclxuICAgICAgICAgICAgd2luLndlYkNvbnRlbnRzLnJlbG9hZElnbm9yaW5nQ2FjaGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=