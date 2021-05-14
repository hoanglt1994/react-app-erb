"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testApi = express_1.default();
testApi.get('/test', (req, res) => {
    //res.send('The sedulous hyena ate the antelope!');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World...!!!');
});
module.exports = testApi;
//# sourceMappingURL=test-api.js.map