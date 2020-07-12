"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeData = void 0;
const names = [
    'Adomas',
    'Jonas',
    'George',
    'Gediminas',
    'Vytautas',
    'Paulius',
    'Saulius',
    'Giedrius',
    'Sarunas',
    'Mykolas',
    'Augustas',
    'Augustinas',
    'Rytis',
    'Gytis',
    'Rimvydas',
    'Laurynas',
    'Lukas',
    'Gintaras',
];
const lastnames = [
    'Jasikevicius',
    'Adomaitis',
    'Jonaitis',
    'Markunas',
    'Balkus',
    'Launius',
    'Jaraminas',
    'Mickevicius',
    'Pinkevicius',
    'Skidzevicius',
    'Spitrys',
    'Savickas',
    'Kacinskas',
    'Lunskis',
];
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
    while (plates.length < entriesNumber) {
        const plate = randomPlate();
        if (plates.includes(plate)) {
            continue;
        }
        plates.push(plate);
    }
    return plates;
};
const createRandomFullName = () => `${names[randomUpTo(names.length)]} ${lastnames[randomUpTo(lastnames.length)]}`;
exports.createFakeData = (entriesNumber) => {
    return createRandomPlates(entriesNumber).map((plate) => ({
        plate,
        owner: createRandomFullName(),
    }));
};
//# sourceMappingURL=faker.js.map