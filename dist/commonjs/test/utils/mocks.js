"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dyfactor_1 = require("dyfactor");
class MockProject {
    constructor() {
        this.config = { navigation: { pages: [] } };
        this.plugins = {};
    }
    pluginsByType() {
        return {};
    }
}
exports.MockProject = MockProject;
class MockPlugin extends dyfactor_1.AbstractDynamicPlugin {
    instrument() { }
    modify(_telemetry) { }
}
exports.MockPlugin = MockPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja3MuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NzdXRhci9saS1zcmMvZHlmYWN0b3IvIiwic291cmNlcyI6WyJ0ZXN0L3V0aWxzL21vY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXFFO0FBRXJFO0lBQUE7UUFDRSxXQUFNLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUN2QyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBSWYsQ0FBQztJQUhDLGFBQWE7UUFDWCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNGO0FBTkQsa0NBTUM7QUFFRCxnQkFBd0IsU0FBUSxnQ0FBcUI7SUFDbkQsVUFBVSxLQUFVLENBQUM7SUFDckIsTUFBTSxDQUFDLFVBQXFCLElBQVMsQ0FBQztDQUN2QztBQUhELGdDQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3REeW5hbWljUGx1Z2luLCBQcm9qZWN0LCBUZWxlbWV0cnkgfSBmcm9tICdkeWZhY3Rvcic7XG5cbmV4cG9ydCBjbGFzcyBNb2NrUHJvamVjdCBpbXBsZW1lbnRzIFByb2plY3Qge1xuICBjb25maWcgPSB7IG5hdmlnYXRpb246IHsgcGFnZXM6IFtdIH0gfTtcbiAgcGx1Z2lucyA9IHt9O1xuICBwbHVnaW5zQnlUeXBlKCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW9ja1BsdWdpbiBleHRlbmRzIEFic3RyYWN0RHluYW1pY1BsdWdpbiB7XG4gIGluc3RydW1lbnQoKTogdm9pZCB7fVxuICBtb2RpZnkoX3RlbGVtZXRyeTogVGVsZW1ldHJ5KTogdm9pZCB7fVxufVxuIl19