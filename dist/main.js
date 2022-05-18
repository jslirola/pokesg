"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pokenode_ts_1 = require("pokenode-ts");
var perf_hooks_1 = require("perf_hooks");
var Analyzer = /** @class */ (function () {
    function Analyzer(offset, limit) {
        var _this = this;
        this.responses = [];
        this.promises = [];
        if (limit <= 0) {
            return null;
        }
        else {
            // Enable cache to improve speed for one minute
            this.api = new pokenode_ts_1.PokemonClient({
                cacheOptions: { maxAge: 60 * 1000, exclude: { query: false } }
            });
            this.start = perf_hooks_1.performance.now();
            this.averageWeight = 0;
            this.averageHeight = 0;
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.api
                        .listPokemons(offset, limit)
                        .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data.results.map(function (pokemon) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.promises.push(this.getData(pokemon.name));
                                            return [2 /*return*/];
                                        });
                                    }); });
                                    return [4 /*yield*/, Promise.allSettled(this.promises)];
                                case 1:
                                    _a.sent();
                                    console.log('Average height: ' + (this.averageHeight / limit).toFixed(2));
                                    console.log('Average weight: ' + (this.averageWeight / limit).toFixed(2));
                                    console.log('Execution time: ' + (perf_hooks_1.performance.now() - this.start).toFixed(3) + 'ms');
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function (error) { return console.error(error); });
                    return [2 /*return*/];
                });
            }); })();
        }
    }
    Analyzer.prototype.getData = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.api
                .getPokemonByName(name)
                .then(function (data) {
                _this.averageHeight += data.height;
                _this.averageWeight += data.weight;
                _this.responses.push(data);
                resolve();
            })["catch"](function (error) { return reject(); });
        });
    };
    return Analyzer;
}());
exports["default"] = Analyzer;
function areWeTestingWithJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}
if (!areWeTestingWithJest()) {
    if (process.argv.length != 4) {
        console.log('The required arguments were not passed. Please use the following command: node main.js <offset> <limit>');
    }
    else {
        var analyzer = new Analyzer(parseInt(process.argv[2]), parseInt(process.argv[3]));
    }
}
// // Include cache to improve the speed
// const api = new PokemonClient({
//     cacheOptions: {maxAge: 60 * 1000, exclude: {query: false}},
// });
//const start = Date.now();
// const start = performance.now();
// const offset = process.argv[2];
// const limit = process.argv[3];
// let responses: Pokemon[] = [];
// let promises: any[] = []
// let averageHeight = 0
// let averageWeight = 0
// (async () => {
//
//     if (process.argv.length != 4) {
//         console.log('The required arguments were not passed. Please use the following command: node main.js <offset> <limit>')
//         return;
//     }
//
//     // // Include cache to improve the speed
//     // const api = new PokemonClient({
//     //     cacheOptions: {maxAge: 60 * 1000, exclude: {query: false}},
//     // });
//     //
//     // //const start = Date.now();
//     // const start = performance.now();
//     // const offset = process.argv[2]
//     // const limit = process.argv[3]
//     // let responses: Pokemon[] = [];
//     // let promises: any[] = []
//     // let averageHeight = 0
//     // let averageWeight = 0
//
//      api
//         .listPokemons( parseInt(offset), parseInt(limit) )
//         .then(async (data) => {
//             data.results.map(async (pokemon) => {
//                 promises.push(getData(pokemon.name))
//             })
//
//             await Promise.allSettled(promises)
//
//             // for (let i = 0; i < responses.length; i++) {
//             //     averageHeight += responses[i].height
//             //     averageWeight += responses[i].weight
//             //     //console.log(responses[i].name + ' ' + responses[i].height + ' ' + responses[i].weight )
//             // }
//
//             console.log('Average height: ' + (averageHeight/parseInt(limit)).toFixed(2))
//             console.log('Average weight: ' + (averageWeight/parseInt(limit)).toFixed(2))
//             //console.log('Execution time: ' + (Date.now() - start) + 'ms')
//             console.log('Execution time: ' + (performance.now() - start).toFixed(3) + 'ms')
//
//         })
//         .catch((error) => console.error(error));
//
//     function getData2(name: string) {
//
//         return new Promise<void>((resolve, reject) => {
//             api
//                 .getPokemonByName(name)
//                 .then((data) =>  {
//                     averageHeight += data.height
//                     averageWeight += data.weight
//                     responses.push(data)
//                     resolve();
//                 })
//                 .catch((error) => reject())
//         })
//
//     }
//
// })();
