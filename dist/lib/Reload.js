"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Watch_1 = require("./Watch");
const callsite_1 = __importDefault(require("callsite"));
const path = require("path");
class Reload {
    constructor(glob, app, events = "all", watcherOptions = {}) {
        this.browserWindows = [];
        this.app = app;
        this.events = (events instanceof Array) ? events : [events];
        const cwd = path.dirname(callsite_1.default()[1].getFileName());
        this.watcher = new Watch_1.Watcher(glob, { cwd });
        for (const eventType of this.events) {
            this.watcher.on(eventType, () => this.Reload());
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
    Reload() {
        for (const win of this.browserWindows) {
            win.webContents.reloadIgnoringCache();
        }
    }
}
exports.Reload = Reload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtQ0FBNkQ7QUFDN0Qsd0RBQWdDO0FBQ2hDLDZCQUE4QjtBQUU5QjtJQU1JLFlBQVksSUFBcUIsRUFBRSxHQUFRLEVBQUUsU0FBb0MsS0FBSyxFQUFFLGlCQUFpQyxFQUFFO1FBSmpILG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQUszQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFPLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztRQUV4QyxLQUFLLE1BQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQVksRUFBRSxNQUFxQixFQUFFLEVBQUU7WUFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNyQixNQUFNLENBQUMsR0FBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsTUFBTTtRQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDO0NBQ0o7QUFsQ0Qsd0JBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHAsIEJyb3dzZXJXaW5kb3csIEV2ZW50fSBmcm9tIFwiZWxlY3Ryb25cIjtcclxuaW1wb3J0IHtXYXRjaGVyLCBXYXRjaGVyT3B0aW9ucywgTGVnYWxFdmVudHN9IGZyb20gXCIuL1dhdGNoXCI7XHJcbmltcG9ydCBDYWxsc2l0ZSBmcm9tIFwiY2FsbHNpdGVcIjtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWxvYWQge1xyXG4gICAgcHJvdGVjdGVkIGFwcDogQXBwO1xyXG4gICAgcHJvdGVjdGVkIGJyb3dzZXJXaW5kb3dzOiBCcm93c2VyV2luZG93W10gPSBbXTtcclxuICAgIHByb3RlY3RlZCB3YXRjaGVyOiBXYXRjaGVyO1xyXG4gICAgcHJvdGVjdGVkIGV2ZW50czogTGVnYWxFdmVudHNbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iOiBzdHJpbmd8c3RyaW5nW10sIGFwcDogQXBwLCBldmVudHM6IExlZ2FsRXZlbnRzfExlZ2FsRXZlbnRzW10gPSBcImFsbFwiLCB3YXRjaGVyT3B0aW9uczogV2F0Y2hlck9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50cyA9IChldmVudHMgaW5zdGFuY2VvZiBBcnJheSkgPyBldmVudHMgOiBbZXZlbnRzXTtcclxuXHJcbiAgICAgICAgY29uc3QgY3dkID0gcGF0aC5kaXJuYW1lKENhbGxzaXRlKClbMV0uZ2V0RmlsZU5hbWUoKSk7XHJcbiAgICAgICAgdGhpcy53YXRjaGVyID0gbmV3IFdhdGNoZXIoZ2xvYiwge2N3ZH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAoY29uc3QgZXZlbnRUeXBlIG9mIHRoaXMuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLndhdGNoZXIub24oZXZlbnRUeXBlLCAoKSA9PiB0aGlzLlJlbG9hZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53YXRjaGVyLlN0YXJ0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwLm9uKFwiYnJvd3Nlci13aW5kb3ctY3JlYXRlZFwiLCAoZXZlbnQ6IEV2ZW50LCB3aW5kb3c6IEJyb3dzZXJXaW5kb3cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5icm93c2VyV2luZG93cy5wdXNoKHdpbmRvdyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpICA9IHRoaXMuYnJvd3NlcldpbmRvd3MuaW5kZXhPZih3aW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyV2luZG93cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIFJlbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHdpbiBvZiB0aGlzLmJyb3dzZXJXaW5kb3dzKSB7XHJcbiAgICAgICAgICAgIHdpbi53ZWJDb250ZW50cy5yZWxvYWRJZ25vcmluZ0NhY2hlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19