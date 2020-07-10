"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faker_1 = require("./database/faker");
const app = express_1.default();
const port = process.env.PORT || 3000;
console.log(faker_1.createFakeData(10));
// app.listen(port, () => console.log(`Listening on port: ${port}`));
//# sourceMappingURL=server.js.map