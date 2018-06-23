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
class Reload {
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
exports.Reload = Reload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxxQ0FBNkQ7QUFDN0QsMkNBQW1DO0FBQ25DLDJCQUF1QjtBQUN2Qix3REFBZ0M7QUFDaEMsNkJBQThCO0FBRTlCO0lBT0ksWUFBWSxJQUFxQixFQUFFLEdBQVEsRUFBRSxTQUFvQyxLQUFLLEVBQUUsaUJBQWlDLEVBQUU7UUFMakgsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBTTNDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0MsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQVksRUFBRSxNQUFxQixFQUFFLEVBQUU7WUFDMUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO1lBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDckIsTUFBTSxDQUFDLEdBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLEdBQUcsQ0FBQyxHQUFHLE9BQWM7UUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN0QixzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG9CQUFPLENBQUMsYUFBYSxrQkFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQUcsQ0FBQyxDQUFDO1NBQ3hHO0lBQ0wsQ0FBQztJQUVTLE1BQU07UUFDWixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztDQUNKO0FBN0NELHdCQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwLCBCcm93c2VyV2luZG93LCBFdmVudH0gZnJvbSBcImVsZWN0cm9uXCI7XHJcbmltcG9ydCB7QmV3YXRjaCwgV2F0Y2hlck9wdGlvbnMsIExlZ2FsRXZlbnRzfSBmcm9tIFwiYmV3YXRjaFwiO1xyXG5pbXBvcnQge0NvbG91cnN9IGZyb20gXCJjb2xvdXJzLXRzXCI7XHJcbmltcG9ydCB7RU9MfSBmcm9tIFwib3NcIjtcclxuaW1wb3J0IENhbGxzaXRlIGZyb20gXCJjYWxsc2l0ZVwiO1xyXG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbG9hZCB7XHJcbiAgICBwcm90ZWN0ZWQgYXBwOiBBcHA7XHJcbiAgICBwcm90ZWN0ZWQgYnJvd3NlcldpbmRvd3M6IEJyb3dzZXJXaW5kb3dbXSA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIHdhdGNoZXI6IEJld2F0Y2g7XHJcbiAgICBwcm90ZWN0ZWQgZXZlbnRzOiBMZWdhbEV2ZW50c1tdO1xyXG4gICAgcHJvdGVjdGVkIG9wdGlvbnM6IFdhdGNoZXJPcHRpb25zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdsb2I6IHN0cmluZ3xzdHJpbmdbXSwgYXBwOiBBcHAsIGV2ZW50czogTGVnYWxFdmVudHN8TGVnYWxFdmVudHNbXSA9IFwiYWxsXCIsIHdhdGNoZXJPcHRpb25zOiBXYXRjaGVyT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gd2F0Y2hlck9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmN3ZCA9IHRoaXMub3B0aW9ucy5jd2QgfHwgcGF0aC5kaXJuYW1lKENhbGxzaXRlKClbMV0uZ2V0RmlsZU5hbWUoKSk7XHJcbiAgICAgICAgdGhpcy5sb2coXCJXb3JraW5nIERpcmVjdG9yeTpcIiwgdGhpcy5vcHRpb25zLmN3ZCk7XHJcbiAgICAgICAgdGhpcy5sb2coXCJHbG9iXCIsIGdsb2IpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0gKGV2ZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/IGV2ZW50cyA6IFtldmVudHNdO1xyXG4gICAgICAgIHRoaXMud2F0Y2hlciA9IG5ldyBCZXdhdGNoKGdsb2IsIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudFR5cGUgb2YgdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coYEFkZGluZyBMaXN0ZW5lciBmb3IgZXZlbnQgJHtldmVudFR5cGV9YCk7XHJcbiAgICAgICAgICAgIHRoaXMud2F0Y2hlci5vbihldmVudFR5cGUsICgpID0+IHRoaXMucmVsb2FkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLndhdGNoZXIuU3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChldmVudDogRXZlbnQsIHdpbmRvdzogQnJvd3NlcldpbmRvdykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5ldyBCcm93c2VyV2luZG93IGNyZWF0ZWQsIGFkZGluZyB0byB3YXRjaCBsaXN0LlwiKVxyXG4gICAgICAgICAgICB0aGlzLmJyb3dzZXJXaW5kb3dzLnB1c2god2luZG93KTtcclxuICAgICAgICAgICAgd2luZG93Lm9uKFwiY2xvc2VkXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgID0gdGhpcy5icm93c2VyV2luZG93cy5pbmRleE9mKHdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJXaW5kb3dzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbG9nKC4uLmxvZ2FyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy52ZXJib3NlKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke0NvbG91cnMoYFJlbG9hZGVyOjoke0NhbGxzaXRlKClbMV0uZ2V0RnVuY3Rpb25OYW1lKCl9YCwgXCJncmVlblwiKSB9YCwgLi4ubG9nYXJncywgRU9MKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHdpbiBvZiB0aGlzLmJyb3dzZXJXaW5kb3dzKSB7XHJcbiAgICAgICAgICAgIHdpbi53ZWJDb250ZW50cy5yZWxvYWRJZ25vcmluZ0NhY2hlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19