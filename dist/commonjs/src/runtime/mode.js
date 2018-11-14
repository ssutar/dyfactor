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
const fs = require("fs");
const inquirer_1 = require("inquirer");
const puppeteer_1 = require("puppeteer");
const error_1 = require("../util/error");
var Levels;
(function (Levels) {
    Levels[Levels["modify"] = 0] = "modify";
    Levels[Levels["extract"] = 1] = "extract";
    Levels[Levels["wizard"] = 2] = "wizard";
})(Levels = exports.Levels || (exports.Levels = {}));
function toLevel(level) {
    switch (level) {
        case 'extract':
            return Levels.extract;
        case 'modify':
            return Levels.modify;
        case 'wizard':
            return Levels.wizard;
    }
    return error_1.default(`Level "${level} is not a supported level.`);
}
function modeFactory(capabilities, level, env, plugin) {
    if (!capabilities.runtime) {
        return new StaticModeImpl(env, plugin);
    }
    let convertedLevel = toLevel(level);
    switch (convertedLevel) {
        case Levels.extract:
            return new ExtractModeImpl(env, plugin);
        case Levels.modify:
            return new ModifyModeImpl(env, plugin);
    }
    throw Error('Could not resolve mode');
}
exports.modeFactory = modeFactory;
class StaticModeImpl {
    constructor(env, plugin) {
        this.env = env;
        this.plugin = plugin;
    }
    modify() {
        this.plugin.modify();
        success('applied codemod');
    }
}
exports.StaticModeImpl = StaticModeImpl;
class ExtractModeImpl {
    constructor(env, plugin) {
        this.env = env;
        this.plugin = plugin;
        this.workingBranch = '';
    }
    instrument() {
        return __awaiter(this, void 0, void 0, function* () {
            yield inquirer_1.prompt([
                {
                    type: 'continue',
                    name: 'server',
                    message: 'Start your dev server and press enter to continue...',
                    default: 'Continue'
                }
            ]);
            let { env } = this;
            let branch = yield env.currentBranch();
            this.workingBranch = branch;
            yield env.scratchBranch('refactor');
            printStep(1, 3, '⚙️  Instrumenting application...');
            this.plugin.instrument();
            yield inquirer_1.prompt([
                {
                    type: 'continue',
                    name: 'server',
                    message: 'Press enter when your dev server is reset...',
                    default: 'Continue'
                }
            ]);
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let { env } = this;
            printStep(2, 3, '🛰️  Collecting telemetry data...');
            let browser = yield puppeteer_1.launch({ headless: false, ignoreHTTPSErrors: true, slowMo: 250 });
            let page = yield browser.newPage();
            let telemetry = { data: [] };
            let navigationOptions = env.navigation.options ? env.navigation.options : {};
            for (let currentPage of env.navigation.pages) {
                let { url, waitFor } = currentPage;
                console.log(dim(`Visiting ${url}...`));
                yield page.goto(url, navigationOptions);
                yield page.waitFor(waitFor || 2000);
                let result = yield page.evaluateHandle(() => window.__dyfactor_telemetry);
                let data = yield result.jsonValue();
                telemetry.data.push(data);
                yield result.dispose();
            }
            yield browser.close();
            yield env.commit();
            yield env.checkoutBranch(this.workingBranch);
            yield env.deleteScratchBranch();
            return telemetry;
        });
    }
    modify(telemetry) {
        printStep(3, 3, '✍️ Writing telementry data to `./dyfactor-telemetry.json...`');
        fs.writeFileSync('dyfactor-telemetry.json', JSON.stringify(telemetry));
        success('collected telementry');
    }
}
exports.ExtractModeImpl = ExtractModeImpl;
class ModifyModeImpl extends ExtractModeImpl {
    modify(telemetry) {
        printStep(3, 3, '😎 Modifying application with telemetry data...');
        this.plugin.modify(telemetry);
        success('updated application');
    }
}
exports.ModifyModeImpl = ModifyModeImpl;
function dim(str) {
    return chalk_1.default.dim(str);
}
function printStep(step, total, message) {
    console.log(`${dim(`[${step}/${total}]`)} ${message}`);
}
function success(message) {
    console.log(`${chalk_1.default.green(`Success:`)} ${message}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc3N1dGFyL2xpLXNyYy9keWZhY3Rvci8iLCJzb3VyY2VzIjpbInNyYy9ydW50aW1lL21vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUEwQjtBQUMxQix5QkFBeUI7QUFDekIsdUNBQWtDO0FBQ2xDLHlDQUFtQztBQUduQyx5Q0FBa0M7QUFHbEMsSUFBWSxNQUlYO0FBSkQsV0FBWSxNQUFNO0lBQ2hCLHVDQUFNLENBQUE7SUFDTix5Q0FBTyxDQUFBO0lBQ1AsdUNBQU0sQ0FBQTtBQUNSLENBQUMsRUFKVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFJakI7QUFFRCxpQkFBaUIsS0FBYTtJQUM1QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxTQUFTO1lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDeEIsS0FBSyxRQUFRO1lBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdkIsS0FBSyxRQUFRO1lBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFLLENBQUMsVUFBVSxLQUFLLDRCQUE0QixDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVELHFCQUNFLFlBQTBCLEVBQzFCLEtBQWEsRUFDYixHQUFnQixFQUNoQixNQUFrQjtJQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBc0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN2QixLQUFLLE1BQU0sQ0FBQyxP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O0lBQ2pDLENBQUM7Q0FDRjtBQU5ELHdDQU1DO0FBRUQsYUFBYSxHQUFXO0lBQ3RCLE1BQU0sQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxtQkFBbUIsSUFBWSxFQUFFLEtBQWEsRUFBRSxPQUFlO0lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxpQkFBaUIsT0FBZTtJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSAnaW5xdWlyZXInO1xuaW1wb3J0IHsgbGF1bmNoIH0gZnJvbSAncHVwcGV0ZWVyJztcbmltcG9ydCB7IEFic3RyYWN0RHluYW1pY1BsdWdpbiwgQWJzdHJhY3RTdGF0aWNQbHVnaW4sIENhcGFiaWxpdGllcywgRHluYW1pY1BsdWdpbiwgUGx1Z2luVHlwZSwgU3RhdGljUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2lucy9wbHVnaW4nO1xuaW1wb3J0IHsgVGVsZW1ldHJ5IH0gZnJvbSAnLi4vcGx1Z2lucy90ZWxlbWV0cnknO1xuaW1wb3J0IGVycm9yIGZyb20gJy4uL3V0aWwvZXJyb3InO1xuaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50JztcblxuZXhwb3J0IGVudW0gTGV2ZWxzIHtcbiAgbW9kaWZ5LFxuICBleHRyYWN0LFxuICB3aXphcmRcbn1cblxuZnVuY3Rpb24gdG9MZXZlbChsZXZlbDogc3RyaW5nKSB7XG4gIHN3aXRjaCAobGV2ZWwpIHtcbiAgICBjYXNlICdleHRyYWN0JzpcbiAgICAgIHJldHVybiBMZXZlbHMuZXh0cmFjdDtcbiAgICBjYXNlICdtb2RpZnknOlxuICAgICAgcmV0dXJuIExldmVscy5tb2RpZnk7XG4gICAgY2FzZSAnd2l6YXJkJzpcbiAgICAgIHJldHVybiBMZXZlbHMud2l6YXJkO1xuICB9XG5cbiAgcmV0dXJuIGVycm9yKGBMZXZlbCBcIiR7bGV2ZWx9IGlzIG5vdCBhIHN1cHBvcnRlZCBsZXZlbC5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vZGVGYWN0b3J5KFxuICBjYXBhYmlsaXRpZXM6IENhcGFiaWxpdGllcyxcbiAgbGV2ZWw6IHN0cmluZyxcbiAgZW52OiBFbnZpcm9ubWVudCxcbiAgcGx1Z2luOiBQbHVnaW5UeXBlXG4pOiBTdGF0aWNNb2RlIHwgRHluYW1pY01vZGUge1xuICBpZiAoIWNhcGFiaWxpdGllcy5ydW50aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBTdGF0aWNNb2RlSW1wbChlbnYsIHBsdWdpbiBhcyBTdGF0aWNQbHVnaW4pO1xuICB9XG5cbiAgbGV0IGNvbnZlcnRlZExldmVsID0gdG9MZXZlbChsZXZlbCk7XG5cbiAgc3dpdGNoIChjb252ZXJ0ZWRMZXZlbCkge1xuICAgIGNhc2UgTGV2ZWxzLmV4dHJhY3Q6XG4gICAgICByZXR1cm4gbmV3IEV4dHJhY3RNb2RlSW1wbChlbnYsIHBsdWdpbiBhcyBEeW5hbWljUGx1Z2luKTtcbiAgICBjYXNlIExldmVscy5tb2RpZnk6XG4gICAgICByZXR1cm4gbmV3IE1vZGlmeU1vZGVJbXBsKGVudiwgcGx1Z2luIGFzIER5bmFtaWNQbHVnaW4pO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0NvdWxkIG5vdCByZXNvbHZlIG1vZGUnKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNNb2RlIHtcbiAgbW9kaWZ5KCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1pY01vZGUge1xuICBpbnN0cnVtZW50KCk6IFByb21pc2U8dm9pZD47XG4gIHJ1bigpOiBQcm9taXNlPFRlbGVtZXRyeT47XG4gIG1vZGlmeSh0ZWxlbWV0cnk6IFRlbGVtZXRyeSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNNb2RlSW1wbCBpbXBsZW1lbnRzIFN0YXRpY01vZGUge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZW52OiBFbnZpcm9ubWVudCwgcHJvdGVjdGVkIHBsdWdpbjogQWJzdHJhY3RTdGF0aWNQbHVnaW4pIHt9XG4gIG1vZGlmeSgpOiB2b2lkIHtcbiAgICB0aGlzLnBsdWdpbi5tb2RpZnkoKTtcbiAgICBzdWNjZXNzKCdhcHBsaWVkIGNvZGVtb2QnKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXh0cmFjdE1vZGVJbXBsIGltcGxlbWVudHMgRHluYW1pY01vZGUge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZW52OiBFbnZpcm9ubWVudCwgcHJvdGVjdGVkIHBsdWdpbjogQWJzdHJhY3REeW5hbWljUGx1Z2luKSB7fVxuICBwcml2YXRlIHdvcmtpbmdCcmFuY2g6IHN0cmluZyA9ICcnO1xuICBhc3luYyBpbnN0cnVtZW50KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHByb21wdChbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdjb250aW51ZScsXG4gICAgICAgIG5hbWU6ICdzZXJ2ZXInLFxuICAgICAgICBtZXNzYWdlOiAnU3RhcnQgeW91ciBkZXYgc2VydmVyIGFuZCBwcmVzcyBlbnRlciB0byBjb250aW51ZS4uLicsXG4gICAgICAgIGRlZmF1bHQ6ICdDb250aW51ZSdcbiAgICAgIH1cbiAgICBdKTtcblxuICAgIGxldCB7IGVudiB9ID0gdGhpcztcblxuICAgIGxldCBicmFuY2ggPSBhd2FpdCBlbnYuY3VycmVudEJyYW5jaCgpO1xuXG4gICAgdGhpcy53b3JraW5nQnJhbmNoID0gYnJhbmNoO1xuXG4gICAgYXdhaXQgZW52LnNjcmF0Y2hCcmFuY2goJ3JlZmFjdG9yJyk7XG5cbiAgICBwcmludFN0ZXAoMSwgMywgJ+Kame+4jyAgSW5zdHJ1bWVudGluZyBhcHBsaWNhdGlvbi4uLicpO1xuICAgIHRoaXMucGx1Z2luLmluc3RydW1lbnQoKTtcblxuICAgIGF3YWl0IHByb21wdChbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdjb250aW51ZScsXG4gICAgICAgIG5hbWU6ICdzZXJ2ZXInLFxuICAgICAgICBtZXNzYWdlOiAnUHJlc3MgZW50ZXIgd2hlbiB5b3VyIGRldiBzZXJ2ZXIgaXMgcmVzZXQuLi4nLFxuICAgICAgICBkZWZhdWx0OiAnQ29udGludWUnXG4gICAgICB9XG4gICAgXSk7XG4gIH1cblxuICBhc3luYyBydW4oKTogUHJvbWlzZTxUZWxlbWV0cnk+IHtcbiAgICBsZXQgeyBlbnYgfSA9IHRoaXM7XG5cbiAgICBwcmludFN0ZXAoMiwgMywgJ+2gve27sO+4jyAgQ29sbGVjdGluZyB0ZWxlbWV0cnkgZGF0YS4uLicpO1xuICAgIGxldCBicm93c2VyID0gYXdhaXQgbGF1bmNoKHsgaGVhZGxlc3M6IGZhbHNlLCBpZ25vcmVIVFRQU0Vycm9yczogdHJ1ZSwgIHNsb3dNbzogMjUwIH0pO1xuICAgIGxldCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG5cbiAgICBsZXQgdGVsZW1ldHJ5OiBUZWxlbWV0cnkgPSB7IGRhdGE6IFtdIH07XG5cbiAgICBsZXQgbmF2aWdhdGlvbk9wdGlvbnMgPSBlbnYubmF2aWdhdGlvbiEub3B0aW9ucyA/IGVudi5uYXZpZ2F0aW9uIS5vcHRpb25zIDoge307XG4gICAgZm9yIChsZXQgY3VycmVudFBhZ2Ugb2YgZW52Lm5hdmlnYXRpb24hLnBhZ2VzKSB7XG4gICAgICBsZXQgeyB1cmwsIHdhaXRGb3IgfSA9IGN1cnJlbnRQYWdlO1xuICAgICAgY29uc29sZS5sb2coZGltKGBWaXNpdGluZyAke3VybH0uLi5gKSk7XG5cbiAgICAgIGF3YWl0IHBhZ2UuZ290byh1cmwsIG5hdmlnYXRpb25PcHRpb25zKTtcbiAgICAgIGF3YWl0IHBhZ2Uud2FpdEZvcih3YWl0Rm9yIHx8IDIwMDApO1xuICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHBhZ2UuZXZhbHVhdGVIYW5kbGUoKCkgPT4gKHdpbmRvdyBhcyBhbnkpLl9fZHlmYWN0b3JfdGVsZW1ldHJ5KTtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzdWx0Lmpzb25WYWx1ZSgpO1xuICAgICAgdGVsZW1ldHJ5LmRhdGEucHVzaChkYXRhKTtcbiAgICAgIGF3YWl0IHJlc3VsdC5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuXG4gICAgYXdhaXQgZW52LmNvbW1pdCgpO1xuICAgIGF3YWl0IGVudi5jaGVja291dEJyYW5jaCh0aGlzLndvcmtpbmdCcmFuY2gpO1xuICAgIGF3YWl0IGVudi5kZWxldGVTY3JhdGNoQnJhbmNoKCk7XG5cbiAgICByZXR1cm4gdGVsZW1ldHJ5O1xuICB9XG5cbiAgbW9kaWZ5KHRlbGVtZXRyeTogVGVsZW1ldHJ5KTogdm9pZCB7XG4gICAgcHJpbnRTdGVwKDMsIDMsICfinI3vuI8gV3JpdGluZyB0ZWxlbWVudHJ5IGRhdGEgdG8gYC4vZHlmYWN0b3ItdGVsZW1ldHJ5Lmpzb24uLi5gJyk7XG4gICAgZnMud3JpdGVGaWxlU3luYygnZHlmYWN0b3ItdGVsZW1ldHJ5Lmpzb24nLCBKU09OLnN0cmluZ2lmeSh0ZWxlbWV0cnkpKTtcbiAgICBzdWNjZXNzKCdjb2xsZWN0ZWQgdGVsZW1lbnRyeScpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb2RpZnlNb2RlSW1wbCBleHRlbmRzIEV4dHJhY3RNb2RlSW1wbCB7XG4gIG1vZGlmeSh0ZWxlbWV0cnk6IFRlbGVtZXRyeSk6IHZvaWQge1xuICAgIHByaW50U3RlcCgzLCAzLCAn7aC97biOIE1vZGlmeWluZyBhcHBsaWNhdGlvbiB3aXRoIHRlbGVtZXRyeSBkYXRhLi4uJyk7XG4gICAgdGhpcy5wbHVnaW4ubW9kaWZ5KHRlbGVtZXRyeSk7XG4gICAgc3VjY2VzcygndXBkYXRlZCBhcHBsaWNhdGlvbicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpbShzdHI6IHN0cmluZykge1xuICByZXR1cm4gY2hhbGsuZGltKHN0cik7XG59XG5cbmZ1bmN0aW9uIHByaW50U3RlcChzdGVwOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICBjb25zb2xlLmxvZyhgJHtkaW0oYFske3N0ZXB9LyR7dG90YWx9XWApfSAke21lc3NhZ2V9YCk7XG59XG5cbmZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKSB7XG4gIGNvbnNvbGUubG9nKGAke2NoYWxrLmdyZWVuKGBTdWNjZXNzOmApfSAke21lc3NhZ2V9YCk7XG59XG4iXX0=