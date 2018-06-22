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
        this.log("Working Directory:", this.options.cwd);
        this.log("Glob", glob);
        this.events = (events instanceof Array) ? events : [events];
        this.watcher = new Watch_1.Watcher(glob, this.options);
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
            console.log(`${Colors_1.Colors(`Reloader::${callsite_1.default()[1].getFunctionName()}`, "green")}`, ...logargs, os_1.EOL);
        }
    }
    reload() {
        for (const win of this.browserWindows) {
            win.webContents.reloadIgnoringCache();
        }
    }
}
exports.Reload = Reload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtQ0FBNkQ7QUFDN0QscUNBQWdDO0FBQ2hDLDJCQUF1QjtBQUN2Qix3REFBZ0M7QUFDaEMsNkJBQThCO0FBRTlCO0lBT0ksWUFBWSxJQUFxQixFQUFFLEdBQVEsRUFBRSxTQUFvQyxLQUFLLEVBQUUsaUJBQWlDLEVBQUU7UUFMakgsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBTTNDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvQyxLQUFLLE1BQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBWSxFQUFFLE1BQXFCLEVBQUUsRUFBRTtZQUMxRSxJQUFJLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7WUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNyQixNQUFNLENBQUMsR0FBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsR0FBRyxDQUFDLEdBQUcsT0FBYztRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3RCLHNDQUFzQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBTSxDQUFDLGFBQWEsa0JBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxRQUFHLENBQUMsQ0FBQztTQUN2RztJQUNMLENBQUM7SUFFUyxNQUFNO1FBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUN6QztJQUNMLENBQUM7Q0FDSjtBQTdDRCx3QkE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcCwgQnJvd3NlcldpbmRvdywgRXZlbnR9IGZyb20gXCJlbGVjdHJvblwiO1xyXG5pbXBvcnQge1dhdGNoZXIsIFdhdGNoZXJPcHRpb25zLCBMZWdhbEV2ZW50c30gZnJvbSBcIi4vV2F0Y2hcIjtcclxuaW1wb3J0IHtDb2xvcnN9IGZyb20gXCIuL0NvbG9yc1wiO1xyXG5pbXBvcnQge0VPTH0gZnJvbSBcIm9zXCI7XHJcbmltcG9ydCBDYWxsc2l0ZSBmcm9tIFwiY2FsbHNpdGVcIjtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWxvYWQge1xyXG4gICAgcHJvdGVjdGVkIGFwcDogQXBwO1xyXG4gICAgcHJvdGVjdGVkIGJyb3dzZXJXaW5kb3dzOiBCcm93c2VyV2luZG93W10gPSBbXTtcclxuICAgIHByb3RlY3RlZCB3YXRjaGVyOiBXYXRjaGVyO1xyXG4gICAgcHJvdGVjdGVkIGV2ZW50czogTGVnYWxFdmVudHNbXTtcclxuICAgIHByb3RlY3RlZCBvcHRpb25zOiBXYXRjaGVyT3B0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iOiBzdHJpbmd8c3RyaW5nW10sIGFwcDogQXBwLCBldmVudHM6IExlZ2FsRXZlbnRzfExlZ2FsRXZlbnRzW10gPSBcImFsbFwiLCB3YXRjaGVyT3B0aW9uczogV2F0Y2hlck9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHdhdGNoZXJPcHRpb25zO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jd2QgPSB0aGlzLm9wdGlvbnMuY3dkIHx8IHBhdGguZGlybmFtZShDYWxsc2l0ZSgpWzFdLmdldEZpbGVOYW1lKCkpO1xyXG4gICAgICAgIHRoaXMubG9nKFwiV29ya2luZyBEaXJlY3Rvcnk6XCIsIHRoaXMub3B0aW9ucy5jd2QpO1xyXG4gICAgICAgIHRoaXMubG9nKFwiR2xvYlwiLCBnbG9iKTtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IChldmVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyBldmVudHMgOiBbZXZlbnRzXTtcclxuICAgICAgICB0aGlzLndhdGNoZXIgPSBuZXcgV2F0Y2hlcihnbG9iLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAoY29uc3QgZXZlbnRUeXBlIG9mIHRoaXMuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKGBBZGRpbmcgTGlzdGVuZXIgZm9yIGV2ZW50ICR7ZXZlbnRUeXBlfWApO1xyXG4gICAgICAgICAgICB0aGlzLndhdGNoZXIub24oZXZlbnRUeXBlLCAoKSA9PiB0aGlzLnJlbG9hZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy53YXRjaGVyLlN0YXJ0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwLm9uKFwiYnJvd3Nlci13aW5kb3ctY3JlYXRlZFwiLCAoZXZlbnQ6IEV2ZW50LCB3aW5kb3c6IEJyb3dzZXJXaW5kb3cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJOZXcgQnJvd3NlcldpbmRvdyBjcmVhdGVkLCBhZGRpbmcgdG8gd2F0Y2ggbGlzdC5cIilcclxuICAgICAgICAgICAgdGhpcy5icm93c2VyV2luZG93cy5wdXNoKHdpbmRvdyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpICA9IHRoaXMuYnJvd3NlcldpbmRvd3MuaW5kZXhPZih3aW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyV2luZG93cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxvZyguLi5sb2dhcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVyYm9zZSkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtDb2xvcnMoYFJlbG9hZGVyOjoke0NhbGxzaXRlKClbMV0uZ2V0RnVuY3Rpb25OYW1lKCl9YCwgXCJncmVlblwiKSB9YCwgLi4ubG9nYXJncywgRU9MKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHdpbiBvZiB0aGlzLmJyb3dzZXJXaW5kb3dzKSB7XHJcbiAgICAgICAgICAgIHdpbi53ZWJDb250ZW50cy5yZWxvYWRJZ25vcmluZ0NhY2hlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19