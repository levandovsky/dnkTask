"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faker_1 = require("./database/faker");
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const model_1 = require("./database/model");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = require("path");
// setup
const fakeEntryNumber = 100;
const dbURL = path_1.resolve(__dirname, '../src/database/db.json');
const fakeData = faker_1.createFakeData(fakeEntryNumber);
const writeFakeData = () => fs_1.default.writeFileSync(dbURL, JSON.stringify(fakeData));
writeFakeData();
const app = express_1.default();
const morganLogger = morgan_1.default('dev');
app.use(morganLogger);
const port = process.env.PORT || 3000;
const readPlates = fs_1.default.readFileSync(dbURL, 'utf8');
const plateInfoArr = JSON.parse(readPlates);
const updateDB = (data) => fs_1.default.writeFileSync(dbURL, JSON.stringify(data));
const parser = body_parser_1.default.json();
const updatePlate = (req, res) => {
    const plateIndex = plateInfoArr.findIndex((plateInfo) => plateInfo.plate === req.params.plateNumber);
    const plateData = plateInfoArr[plateIndex];
    const newPlate = req.body;
    if (plateIndex < 0) {
        res.status(404);
        res.json({ notExist: req.params.plateNumber });
        return;
    }
    if (!newPlate || Object.keys(newPlate).length !== 1 || !newPlate.owner) {
        res.status(400);
        res.json({ wrongValue: true });
        return;
    }
    plateInfoArr.splice(plateIndex, 1, Object.assign(Object.assign({}, plateData), newPlate));
    updateDB(plateInfoArr);
    res.status(200);
    res.json({ updated: plateData.plate, newOwner: plateData.owner });
};
const deletePlate = (req, res) => {
    const plateIndex = plateInfoArr.findIndex((plateInfo) => plateInfo.plate === req.params.plateNumber);
    const plateData = plateInfoArr[plateIndex];
    if (!plateData) {
        res.status(404);
        res.json({ notExist: req.params.plateNumber });
        return;
    }
    plateInfoArr.splice(plateIndex, 1);
    updateDB(plateInfoArr);
    res.status(200);
    res.send({ deleted: plateData.plate });
};
const addPlate = (req, res) => {
    const newPlate = req.body;
    const dublicatePlate = plateInfoArr.find((plate) => plate.plate === newPlate.plate);
    if (!newPlate || !model_1.instanceOfPlateInfo(newPlate)) {
        res.status(400);
        res.json({ wrongSchema: true });
        return;
    }
    if (dublicatePlate) {
        res.sendStatus(409);
        // res.json({ dublicatePlate: true, owner: dublicatePlate.owner });
        return;
    }
    plateInfoArr.push(newPlate);
    updateDB(plateInfoArr);
    res.status(201);
    res.json({ addedPlate: newPlate });
};
const getPlate = (req, res) => {
    const plateData = plateInfoArr.find((plateInfo) => plateInfo.plate === req.params.plateNumber);
    if (!plateData) {
        res.status(404);
        res.json({ notExist: req.params.plateNumber });
        return;
    }
    res.status(200);
    res.json(plateData);
};
const getPlates = (_, res) => res.json(plateInfoArr);
app.get('/api/plates', getPlates);
app.post('/api/plates', parser, addPlate);
app.get('/api/plate/:plateNumber', getPlate);
app.delete('/api/plate/:plateNumber', deletePlate);
app.patch('/api/plate/:plateNumber', parser, updatePlate);
app.listen(port, () => console.log(`Listening on port: ${port}`));
//# sourceMappingURL=index.js.map