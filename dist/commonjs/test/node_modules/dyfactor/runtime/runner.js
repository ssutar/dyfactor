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
const mode_1 = require("./mode");
class Runner {
    constructor(env) {
        this.env = env;
    }
    run(type, name, path = 'app', level) {
        return __awaiter(this, void 0, void 0, function* () {
            let { env } = this;
            let Plugin = env.lookupPlugin(type, name);
            let { capabilities } = Plugin;
            let plugin = new Plugin(path, env);
            let mode = mode_1.modeFactory(capabilities, level, env, plugin);
            if (isDynamic(mode)) {
                try {
                    yield mode.instrument();
                }
                catch (e) {
                    console.log('\n');
                    console.log(e);
                    process.exit(1);
                }
                let telemetry;
                try {
                    telemetry = yield mode.run();
                    mode.modify(telemetry);
                }
                catch (e) {
                    console.log(e);
                    process.exit(1);
                }
            }
            else {
                mode.modify();
            }
        });
    }
}
exports.Runner = Runner;
function isDynamic(mode) {
    return !!mode.run && !!mode.instrument;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zc3V0YXIvbGktc3JjL2R5ZmFjdG9yLyIsInNvdXJjZXMiOlsic3JjL3J1bnRpbWUvcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxpQ0FBOEQ7QUFFOUQ7SUFDRSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBQUcsQ0FBQztJQUVsQyxHQUFHLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxPQUFlLEtBQUssRUFBRSxLQUFhOztZQUN2RSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxHQUFHLGtCQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDO29CQUNILE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUMxQixDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUVELElBQUksU0FBUyxDQUFDO2dCQUVkLElBQUksQ0FBQztvQkFDSCxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQS9CRCx3QkErQkM7QUFFRCxtQkFBbUIsSUFBOEI7SUFDL0MsTUFBTSxDQUFDLENBQUMsQ0FBZSxJQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBZSxJQUFLLENBQUMsVUFBVSxDQUFDO0FBQ3ZFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnZpcm9ubWVudCB9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgRHluYW1pY01vZGUsIFN0YXRpY01vZGUsIG1vZGVGYWN0b3J5IH0gZnJvbSAnLi9tb2RlJztcblxuZXhwb3J0IGNsYXNzIFJ1bm5lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZW52OiBFbnZpcm9ubWVudCkge31cblxuICBhc3luYyBydW4odHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZyA9ICdhcHAnLCBsZXZlbDogc3RyaW5nKSB7XG4gICAgbGV0IHsgZW52IH0gPSB0aGlzO1xuICAgIGxldCBQbHVnaW4gPSBlbnYubG9va3VwUGx1Z2luKHR5cGUsIG5hbWUpO1xuICAgIGxldCB7IGNhcGFiaWxpdGllcyB9ID0gUGx1Z2luO1xuICAgIGxldCBwbHVnaW4gPSBuZXcgUGx1Z2luKHBhdGgsIGVudik7XG4gICAgbGV0IG1vZGUgPSBtb2RlRmFjdG9yeShjYXBhYmlsaXRpZXMsIGxldmVsLCBlbnYsIHBsdWdpbik7XG4gICAgaWYgKGlzRHluYW1pYyhtb2RlKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbW9kZS5pbnN0cnVtZW50KCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHRlbGVtZXRyeTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGVsZW1ldHJ5ID0gYXdhaXQgbW9kZS5ydW4oKTtcbiAgICAgICAgbW9kZS5tb2RpZnkodGVsZW1ldHJ5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbW9kZS5tb2RpZnkoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNEeW5hbWljKG1vZGU6IFN0YXRpY01vZGUgfCBEeW5hbWljTW9kZSk6IG1vZGUgaXMgRHluYW1pY01vZGUge1xuICByZXR1cm4gISEoPER5bmFtaWNNb2RlPm1vZGUpLnJ1biAmJiAhISg8RHluYW1pY01vZGU+bW9kZSkuaW5zdHJ1bWVudDtcbn1cbiJdfQ==