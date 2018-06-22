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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtQ0FBNkQ7QUFDN0Qsd0RBQWdDO0FBQ2hDLDZCQUE4QjtBQUU5QjtJQU1JLFlBQVksSUFBbUIsRUFBRSxHQUFRLEVBQUUsU0FBb0MsS0FBSyxFQUFFLGlCQUFpQyxFQUFFO1FBSi9HLG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQUszQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFPLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztRQUV4QyxLQUFLLE1BQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQVksRUFBRSxNQUFxQixFQUFFLEVBQUU7WUFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNyQixNQUFNLENBQUMsR0FBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsTUFBTTtRQUNaLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDO0NBQ0o7QUFsQ0Qsd0JBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHAsIEJyb3dzZXJXaW5kb3csIEV2ZW50fSBmcm9tIFwiZWxlY3Ryb25cIjtcclxuaW1wb3J0IHtXYXRjaGVyLCBXYXRjaGVyT3B0aW9ucywgTGVnYWxFdmVudHN9IGZyb20gXCIuL1dhdGNoXCI7XHJcbmltcG9ydCBDYWxsc2l0ZSBmcm9tIFwiY2FsbHNpdGVcIjtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWxvYWQge1xyXG4gICAgcHJvdGVjdGVkIGFwcDogQXBwO1xyXG4gICAgcHJvdGVjdGVkIGJyb3dzZXJXaW5kb3dzOiBCcm93c2VyV2luZG93W10gPSBbXTtcclxuICAgIHByb3RlY3RlZCB3YXRjaGVyOiBXYXRjaGVyO1xyXG4gICAgcHJvdGVjdGVkIGV2ZW50czogTGVnYWxFdmVudHNbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iOiBzdHJpbmd8c3RyaW5nLCBhcHA6IEFwcCwgZXZlbnRzOiBMZWdhbEV2ZW50c3xMZWdhbEV2ZW50c1tdID0gXCJhbGxcIiwgd2F0Y2hlck9wdGlvbnM6IFdhdGNoZXJPcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSAoZXZlbnRzIGluc3RhbmNlb2YgQXJyYXkpID8gZXZlbnRzIDogW2V2ZW50c107XHJcblxyXG4gICAgICAgIGNvbnN0IGN3ZCA9IHBhdGguZGlybmFtZShDYWxsc2l0ZSgpWzFdLmdldEZpbGVOYW1lKCkpO1xyXG4gICAgICAgIHRoaXMud2F0Y2hlciA9IG5ldyBXYXRjaGVyKGdsb2IsIHtjd2R9KTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50VHlwZSBvZiB0aGlzLmV2ZW50cykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy53YXRjaGVyLm9uKGV2ZW50VHlwZSwgKCkgPT4gdGhpcy5SZWxvYWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2F0Y2hlci5TdGFydCgpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcC5vbihcImJyb3dzZXItd2luZG93LWNyZWF0ZWRcIiwgKGV2ZW50OiBFdmVudCwgd2luZG93OiBCcm93c2VyV2luZG93KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnJvd3NlcldpbmRvd3MucHVzaCh3aW5kb3cpO1xyXG4gICAgICAgICAgICB3aW5kb3cub24oXCJjbG9zZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaSAgPSB0aGlzLmJyb3dzZXJXaW5kb3dzLmluZGV4T2Yod2luZG93KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlcldpbmRvd3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBSZWxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCB3aW4gb2YgdGhpcy5icm93c2VyV2luZG93cykge1xyXG4gICAgICAgICAgICB3aW4ud2ViQ29udGVudHMucmVsb2FkSWdub3JpbmdDYWNoZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==