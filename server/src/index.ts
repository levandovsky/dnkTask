import express, { Request, Response } from 'express';
import { createFakeData } from './database/faker';
import fs from 'fs';
import morgan from 'morgan';
import { PlateInfo, instanceOfPlateInfo } from './database/model';
import bodyParser from 'body-parser';
import { resolve } from 'path';

// setup
const fakeEntryNumber = 100;
const dbURL = resolve(__dirname, '../src/database/db.json');
const fakeData = createFakeData(fakeEntryNumber);
const writeFakeData = () => fs.writeFileSync(dbURL, JSON.stringify(fakeData));
writeFakeData();

const app = express();
const morganLogger = morgan('dev');
app.use(morganLogger);
const port = process.env.PORT || 3000;
const readPlates = fs.readFileSync(dbURL, 'utf8');
const plateInfoArr = JSON.parse(readPlates) as PlateInfo[];
const updateDB = (data: PlateInfo[]) =>
  fs.writeFileSync(dbURL, JSON.stringify(data));
const parser = bodyParser.json();

const updatePlate = (req: Request, res: Response) => {
  const plateIndex = plateInfoArr.findIndex(
    (plateInfo) => plateInfo.plate === req.params.plateNumber
  );
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
  plateInfoArr.splice(plateIndex, 1, { ...plateData, ...newPlate });
  updateDB(plateInfoArr);
  res.status(200);
  res.json({ updated: plateData.plate, newOwner: plateData.owner });
};

const deletePlate = (req: Request, res: Response) => {
  const plateIndex = plateInfoArr.findIndex(
    (plateInfo) => plateInfo.plate === req.params.plateNumber
  );
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

const addPlate = (req: Request, res: Response) => {
  const newPlate = req.body;
  const dublicatePlate = plateInfoArr.find(
    (plate) => plate.plate === newPlate.plate
  );
  if (!newPlate || !instanceOfPlateInfo(newPlate)) {
    res.status(400);
    res.json({ wrongSchema: true });
    return;
  }
  if (dublicatePlate) {
    res.status(409);
    res.json({ dublicatePlate: true, owner: dublicatePlate.owner });
    return;
  }
  plateInfoArr.push(newPlate);
  updateDB(plateInfoArr);
  res.status(201);
  res.json({ addedPlate: newPlate });
};

const getPlate = (req: Request, res: Response) => {
  const plateData = plateInfoArr.find(
    (plateInfo) => plateInfo.plate === req.params.plateNumber
  );
  if (!plateData) {
    res.status(404);
    res.json({ notExist: req.params.plateNumber });
    return;
  }
  res.status(200);
  res.json(plateData);
};

const getPlates = (_: Request, res: Response) => res.json(plateInfoArr);

app.get('/api/plates', getPlates);
app.post('/api/plates', parser, addPlate);
app.get('/api/plate/:plateNumber', getPlate);
app.delete('/api/plate/:plateNumber', deletePlate);
app.patch('/api/plate/:plateNumber', parser, updatePlate);

app.listen(port, () => console.log(`Listening on port: ${port}`));
