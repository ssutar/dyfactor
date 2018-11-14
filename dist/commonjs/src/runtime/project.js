"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const SilentError = require("silent-error");
class ProjectImpl {
    constructor() {
        this._pluginsByType = {};
        this.plugins = {};
        const dyfactorPath = `${process.cwd()}/.dyfactor.json`;
        if (!fs.existsSync(dyfactorPath)) {
            throw new SilentError('.dyfactor.json not found in the root of the project. Please run `dyfactor init`.');
        }
        this.config = JSON.parse(fs.readFileSync(dyfactorPath, 'utf8'));
        this.pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8'));
        this.discoverPlugins();
    }
    pluginsByType() {
        Object.keys(this.plugins).forEach(plugin => {
            let type = this.plugins[plugin].type;
            if (!this._pluginsByType[type]) {
                this._pluginsByType[type] = [];
            }
            this._pluginsByType[type].push(this.plugins[plugin]);
        });
        return this._pluginsByType;
    }
    discoverPlugins() {
        let { pkg } = this;
        let deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
        Object.keys(deps).forEach(dep => {
            let pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/node_modules/${dep}/package.json`, 'utf8'));
            if (pkg.dyfactor) {
                this.plugins[pkg.dyfactor.name] = Object.assign({}, { packageName: pkg.name }, pkg.dyfactor);
            }
        });
    }
}
exports.ProjectImpl = ProjectImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc3N1dGFyL2xpLXNyYy9keWZhY3Rvci8iLCJzb3VyY2VzIjpbInNyYy9ydW50aW1lL3Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFFekIsNENBQTRDO0FBMEM1QztJQUtFO1FBSFEsbUJBQWMsR0FBZ0IsRUFBRSxDQUFDO1FBRXpDLFlBQU8sR0FBWSxFQUFFLENBQUM7UUFFcEIsTUFBTSxZQUFZLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLFdBQVcsQ0FDbkIsa0ZBQWtGLENBQ25GLENBQUM7UUFDSixDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUVPLGVBQWU7UUFDckIsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLEdBQUcsR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FDL0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEdBQUcsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUM3RSxDQUFDO1lBQ0YsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUM3QyxFQUFFLEVBQ0YsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxFQUN6QixHQUFHLENBQUMsUUFBUSxDQUNiLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFoREQsa0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk9wdGlvbnMgfSBmcm9tICdwdXBwZXRlZXInO1xuaW1wb3J0ICogYXMgU2lsZW50RXJyb3IgZnJvbSAnc2lsZW50LWVycm9yJztcbmltcG9ydCB7IER5ZmFjdG9yQ29uZmlnIH0gZnJvbSAnLi4vcGx1Z2lucy9wbHVnaW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5hdmlnYXRpb24ge1xuICBwYWdlczogUGFnZVtdO1xuICBvcHRpb25zPzogTmF2aWdhdGlvbk9wdGlvbnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZSB7XG4gIHVybDogc3RyaW5nO1xuICB3YWl0Rm9yPzogbnVtYmVyIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG4gIG5hdmlnYXRpb246IE5hdmlnYXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFja2FnZUpTT04ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGRldkRlcGVuZGVuY2llczogRGVwZW5kZW5jaWVzO1xuICBkZXBlbmRlbmNpZXM6IERlcGVuZGVuY2llcztcbiAgZHlmYWN0b3I/OiBEeWZhY3RvckNvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmNpZXMge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luVHlwZXMge1xuICBba2V5OiBzdHJpbmddOiBEeWZhY3RvckNvbmZpZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsdWdpbnMge1xuICBba2V5OiBzdHJpbmddOiBEeWZhY3RvckNvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0IHtcbiAgY29uZmlnOiBDb25maWc7XG4gIHBsdWdpbnM6IFBsdWdpbnM7XG4gIHBsdWdpbnNCeVR5cGUoKTogUGx1Z2luVHlwZXM7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW1wbCBpbXBsZW1lbnRzIFByb2plY3Qge1xuICBwcml2YXRlIHBrZzogUGFja2FnZUpTT047XG4gIHByaXZhdGUgX3BsdWdpbnNCeVR5cGU6IFBsdWdpblR5cGVzID0ge307XG4gIGNvbmZpZzogQ29uZmlnO1xuICBwbHVnaW5zOiBQbHVnaW5zID0ge307XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGR5ZmFjdG9yUGF0aCA9IGAke3Byb2Nlc3MuY3dkKCl9Ly5keWZhY3Rvci5qc29uYDtcblxuICAgIGlmICghZnMuZXhpc3RzU3luYyhkeWZhY3RvclBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgU2lsZW50RXJyb3IoXG4gICAgICAgICcuZHlmYWN0b3IuanNvbiBub3QgZm91bmQgaW4gdGhlIHJvb3Qgb2YgdGhlIHByb2plY3QuIFBsZWFzZSBydW4gYGR5ZmFjdG9yIGluaXRgLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhkeWZhY3RvclBhdGgsICd1dGY4JykpO1xuICAgIHRoaXMucGtnID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoYCR7cHJvY2Vzcy5jd2QoKX0vcGFja2FnZS5qc29uYCwgJ3V0ZjgnKSk7XG4gICAgdGhpcy5kaXNjb3ZlclBsdWdpbnMoKTtcbiAgfVxuXG4gIHBsdWdpbnNCeVR5cGUoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5wbHVnaW5zKS5mb3JFYWNoKHBsdWdpbiA9PiB7XG4gICAgICBsZXQgdHlwZSA9IHRoaXMucGx1Z2luc1twbHVnaW5dLnR5cGU7XG4gICAgICBpZiAoIXRoaXMuX3BsdWdpbnNCeVR5cGVbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fcGx1Z2luc0J5VHlwZVt0eXBlXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9wbHVnaW5zQnlUeXBlW3R5cGVdLnB1c2godGhpcy5wbHVnaW5zW3BsdWdpbl0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX3BsdWdpbnNCeVR5cGU7XG4gIH1cblxuICBwcml2YXRlIGRpc2NvdmVyUGx1Z2lucygpIHtcbiAgICBsZXQgeyBwa2cgfSA9IHRoaXM7XG4gICAgbGV0IGRlcHMgPSBPYmplY3QuYXNzaWduKHt9LCBwa2cuZGVwZW5kZW5jaWVzLCBwa2cuZGV2RGVwZW5kZW5jaWVzKTtcbiAgICBPYmplY3Qua2V5cyhkZXBzKS5mb3JFYWNoKGRlcCA9PiB7XG4gICAgICBsZXQgcGtnOiBQYWNrYWdlSlNPTiA9IEpTT04ucGFyc2UoXG4gICAgICAgIGZzLnJlYWRGaWxlU3luYyhgJHtwcm9jZXNzLmN3ZCgpfS9ub2RlX21vZHVsZXMvJHtkZXB9L3BhY2thZ2UuanNvbmAsICd1dGY4JylcbiAgICAgICk7XG4gICAgICBpZiAocGtnLmR5ZmFjdG9yKSB7XG4gICAgICAgIHRoaXMucGx1Z2luc1twa2cuZHlmYWN0b3IubmFtZV0gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHsgcGFja2FnZU5hbWU6IHBrZy5uYW1lIH0sXG4gICAgICAgICAgcGtnLmR5ZmFjdG9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==