"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const execa_1 = require("execa");
const resolve = require("resolve");
const SilentError = require("silent-error");
const error_1 = require("../util/error");
const project_1 = require("./project");
function normalizePages(page) {
    if (typeof page === 'string') {
        return { url: page };
    }
    return page;
}
class Environment {
    constructor(project) {
        this.guid = 0;
        this._currentScratchBranch = '';
        this.project = project;
        let { config } = project;
        let normalized = config.navigation.pages.map(normalizePages);
        this.navigation = Object.assign({}, config.navigation, { pages: normalized });
    }
    static create() {
        let project = new project_1.ProjectImpl();
        return new this(project);
    }
    get types() {
        let { project } = this;
        return Object.keys(project.plugins).map(plugin => {
            return project.plugins[plugin].type;
        });
    }
    get plugins() {
        let { project } = this;
        return project.plugins;
    }
    lookupPlugin(type, plugin) {
        let { project } = this;
        let types = project.pluginsByType();
        if (!types[type]) {
            error_1.default(`No type "${type}" found.`);
        }
        let selectedPlugin = types[type].find(p => {
            return p.name === plugin;
        });
        if (!selectedPlugin) {
            error_1.default(`No plugin called "${plugin}" was found.`);
        }
        let resolved = resolve.sync(selectedPlugin.packageName, {
            basedir: process.cwd()
        });
        return require(resolved).default;
    }
    scratchBranch(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let scratchName = (this._currentScratchBranch = this._scratchBranchName(name));
            let branch;
            try {
                branch = this.git(`checkout -b ${scratchName}`);
            }
            catch (e) {
                console.warn('retrying branch');
                return this.scratchBranch(name);
            }
            return branch;
        });
    }
    get scratchBranchName() {
        return this._currentScratchBranch;
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.git('add .');
            return this.git(`commit --no-verify -m "done"`);
        });
    }
    deleteScratchBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.git(`branch -D ${this._currentScratchBranch}`);
        });
    }
    checkoutBranch(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.git(`checkout ${name}`);
        });
    }
    currentBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            let branches = yield this.git(`branch`);
            let branch = branches.split('\n').find((b) => b.charAt(0) === '*');
            return branch.slice(2, branch.length);
        });
    }
    _scratchBranchName(name) {
        return `scratch-${name}-${this.guid++}`;
    }
    git(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return exec(`git ${command}`);
        });
    }
}
exports.Environment = Environment;
function exec(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        return execa_1.shell(cmd).then((result) => {
            return result.stdout;
        }, (r) => {
            let err = new Error(r.stderr);
            if (err.stack) {
                err.stack = err.stack.replace('Error:', chalk_1.default.red('Error:'));
            }
            throw new SilentError(err);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NzdXRhci9saS1zcmMvZHlmYWN0b3IvIiwic291cmNlcyI6WyJzcmMvcnVudGltZS9lbnZpcm9ubWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTBCO0FBQzFCLGlDQUE0QztBQUM1QyxtQ0FBbUM7QUFDbkMsNENBQTRDO0FBRzVDLHlDQUFrQztBQUNsQyx1Q0FBbUU7QUFFbkUsd0JBQXdCLElBQW1CO0lBQ3pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEO0lBV0UsWUFBWSxPQUFnQjtRQUpwQixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBSWpDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFmRCxNQUFNLENBQUMsTUFBTTtRQUNYLElBQUksT0FBTyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBY0QsSUFBSSxLQUFLO1FBQ1AsSUFBSSxFQUFFLE9B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LENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgeyBFeGVjYVJldHVybnMsIHNoZWxsIH0gZnJvbSAnZXhlY2EnO1xuaW1wb3J0ICogYXMgcmVzb2x2ZSBmcm9tICdyZXNvbHZlJztcbmltcG9ydCAqIGFzIFNpbGVudEVycm9yIGZyb20gJ3NpbGVudC1lcnJvcic7XG5pbXBvcnQgeyBEeWZhY3RvckNvbmZpZywgUGx1Z2luQ29uc3RydWN0b3IsIFBsdWdpblR5cGUgfSBmcm9tICcuLi9wbHVnaW5zL3BsdWdpbic7XG5pbXBvcnQgeyBEaWN0IH0gZnJvbSAnLi4vdXRpbC9jb3JlJztcbmltcG9ydCBlcnJvciBmcm9tICcuLi91dGlsL2Vycm9yJztcbmltcG9ydCB7IE5hdmlnYXRpb24sIFBhZ2UsIFByb2plY3QsIFByb2plY3RJbXBsIH0gZnJvbSAnLi9wcm9qZWN0JztcblxuZnVuY3Rpb24gbm9ybWFsaXplUGFnZXMocGFnZTogc3RyaW5nIHwgUGFnZSk6IFBhZ2Uge1xuICBpZiAodHlwZW9mIHBhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHsgdXJsOiBwYWdlIH07XG4gIH1cbiAgcmV0dXJuIHBhZ2U7XG59XG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudCB7XG4gIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdEltcGwoKTtcbiAgICByZXR1cm4gbmV3IHRoaXMocHJvamVjdCk7XG4gIH1cblxuICBuYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uO1xuICBwcml2YXRlIGd1aWQgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50U2NyYXRjaEJyYW5jaCA9ICcnO1xuICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XG5cbiAgY29uc3RydWN0b3IocHJvamVjdDogUHJvamVjdCkge1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgbGV0IHsgY29uZmlnIH0gPSBwcm9qZWN0O1xuICAgIGxldCBub3JtYWxpemVkID0gY29uZmlnLm5hdmlnYXRpb24ucGFnZXMubWFwKG5vcm1hbGl6ZVBhZ2VzKTtcbiAgICB0aGlzLm5hdmlnYXRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcubmF2aWdhdGlvbiwgeyBwYWdlczogbm9ybWFsaXplZCB9KTtcbiAgfVxuXG4gIGdldCB0eXBlcygpIHtcbiAgICBsZXQgeyBwcm9qZWN0IH0gPSB0aGlzO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9qZWN0LnBsdWdpbnMpLm1hcChwbHVnaW4gPT4ge1xuICAgICAgcmV0dXJuIHByb2plY3QucGx1Z2luc1twbHVnaW5dLnR5cGU7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcGx1Z2lucygpOiBEaWN0PER5ZmFjdG9yQ29uZmlnPiB7XG4gICAgbGV0IHsgcHJvamVjdCB9ID0gdGhpcztcbiAgICByZXR1cm4gcHJvamVjdC5wbHVnaW5zO1xuICB9XG5cbiAgbG9va3VwUGx1Z2luKHR5cGU6IHN0cmluZywgcGx1Z2luOiBzdHJpbmcpOiBQbHVnaW5Db25zdHJ1Y3RvcjxQbHVnaW5UeXBlPiB7XG4gICAgbGV0IHsgcHJvamVjdCB9ID0gdGhpcztcbiAgICBsZXQgdHlwZXMgPSBwcm9qZWN0LnBsdWdpbnNCeVR5cGUoKTtcblxuICAgIGlmICghdHlwZXNbdHlwZV0pIHtcbiAgICAgIGVycm9yKGBObyB0eXBlIFwiJHt0eXBlfVwiIGZvdW5kLmApO1xuICAgIH1cblxuICAgIGxldCBzZWxlY3RlZFBsdWdpbiA9IHR5cGVzW3R5cGVdLmZpbmQocCA9PiB7XG4gICAgICByZXR1cm4gcC5uYW1lID09PSBwbHVnaW47XG4gICAgfSk7XG5cbiAgICBpZiAoIXNlbGVjdGVkUGx1Z2luKSB7XG4gICAgICBlcnJvcihgTm8gcGx1Z2luIGNhbGxlZCBcIiR7cGx1Z2lufVwiIHdhcyBmb3VuZC5gKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZWQgPSByZXNvbHZlLnN5bmMoc2VsZWN0ZWRQbHVnaW4hLnBhY2thZ2VOYW1lISwge1xuICAgICAgYmFzZWRpcjogcHJvY2Vzcy5jd2QoKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcXVpcmUocmVzb2x2ZWQpLmRlZmF1bHQ7XG4gIH1cblxuICBhc3luYyBzY3JhdGNoQnJhbmNoKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IHNjcmF0Y2hOYW1lID0gKHRoaXMuX2N1cnJlbnRTY3JhdGNoQnJhbmNoID0gdGhpcy5fc2NyYXRjaEJyYW5jaE5hbWUobmFtZSkpO1xuICAgIGxldCBicmFuY2g7XG4gICAgdHJ5IHtcbiAgICAgIGJyYW5jaCA9IHRoaXMuZ2l0KGBjaGVja291dCAtYiAke3NjcmF0Y2hOYW1lfWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybigncmV0cnlpbmcgYnJhbmNoJyk7XG4gICAgICByZXR1cm4gdGhpcy5zY3JhdGNoQnJhbmNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gYnJhbmNoO1xuICB9XG5cbiAgZ2V0IHNjcmF0Y2hCcmFuY2hOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2NyYXRjaEJyYW5jaDtcbiAgfVxuXG4gIGFzeW5jIGNvbW1pdCgpIHtcbiAgICBhd2FpdCB0aGlzLmdpdCgnYWRkIC4nKTtcbiAgICByZXR1cm4gdGhpcy5naXQoYGNvbW1pdCAtLW5vLXZlcmlmeSAtbSBcImRvbmVcImApO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2NyYXRjaEJyYW5jaCgpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5naXQoYGJyYW5jaCAtRCAke3RoaXMuX2N1cnJlbnRTY3JhdGNoQnJhbmNofWApO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tvdXRCcmFuY2gobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2l0KGBjaGVja291dCAke25hbWV9YCk7XG4gIH1cblxuICBhc3luYyBjdXJyZW50QnJhbmNoKCkge1xuICAgIGxldCBicmFuY2hlcyA9IGF3YWl0IHRoaXMuZ2l0KGBicmFuY2hgKTtcbiAgICBsZXQgYnJhbmNoID0gYnJhbmNoZXMuc3BsaXQoJ1xcbicpLmZpbmQoKGI6IHN0cmluZykgPT4gYi5jaGFyQXQoMCkgPT09ICcqJykhO1xuICAgIHJldHVybiBicmFuY2guc2xpY2UoMiwgYnJhbmNoLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIF9zY3JhdGNoQnJhbmNoTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYHNjcmF0Y2gtJHtuYW1lfS0ke3RoaXMuZ3VpZCsrfWA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdpdChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZXhlYyhgZ2l0ICR7Y29tbWFuZH1gKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBleGVjKGNtZDogc3RyaW5nKSB7XG4gIHJldHVybiBzaGVsbChjbWQpLnRoZW4oXG4gICAgKHJlc3VsdDogRXhlY2FSZXR1cm5zKSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0LnN0ZG91dDtcbiAgICB9LFxuICAgIChyOiBFeGVjYVJldHVybnMpID0+IHtcbiAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3Ioci5zdGRlcnIpO1xuICAgICAgaWYgKGVyci5zdGFjaykge1xuICAgICAgICBlcnIuc3RhY2sgPSBlcnIuc3RhY2shLnJlcGxhY2UoJ0Vycm9yOicsIGNoYWxrLnJlZCgnRXJyb3I6JykpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFNpbGVudEVycm9yKGVycik7XG4gICAgfVxuICApO1xufVxuIl19