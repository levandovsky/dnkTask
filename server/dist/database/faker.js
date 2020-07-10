"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeData = void 0;
const names = ['Adomas', 'Jonas', 'George', 'Gediminas', 'Vytautas'];
const lastnames = ['Jasikevicius', 'Adomaitis', 'Jonaitis', 'Markunas'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomUpTo = (max) => Math.floor(Math.random() * max);
const randomChar = () => alphabet[randomUpTo(alphabet.length)];
const randomPlate = () => {
    const leftSide = randomChar() + randomChar() + randomChar();
    const rightSide = `${randomUpTo(9)}${randomUpTo(9)}${randomUpTo(9)}`;
    return leftSide + rightSide;
};
const createRandomPlates = (entriesNumber) => {
    const plates = [];
    for (let i = 0; i < entriesNumber; i++) {
        const plate = randomPlate();
        if (plates.includes(plate)) {
            entriesNumber++;
            continue;
        }
        plates.push(plate);
    }
    return plates;
};
const createRandomFullName = () => `${names[randomUpTo(names.length - 1)]} ${lastnames[randomUpTo(lastnames.length - 1)]}`;
exports.createFakeData = (entriesNumber) => {
    return createRandomPlates(entriesNumber).map((plate) => ({
        plate,
        owner: createRandomFullName(),
    }));
};
//# sourceMappingURL=faker.js.map