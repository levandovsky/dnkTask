import { PlateInfo } from './model';

const names = ['Adomas', 'Jonas', 'George', 'Gediminas', 'Vytautas'];
const lastnames = ['Jasikevicius', 'Adomaitis', 'Jonaitis', 'Markunas'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const randomUpTo = (max: number) => Math.floor(Math.random() * max);
const randomChar = () => alphabet[randomUpTo(alphabet.length)];
const randomPlate = () => {
  const leftSide = randomChar() + randomChar() + randomChar();
  const rightSide = `${randomUpTo(9)}${randomUpTo(9)}${randomUpTo(9)}`;
  return leftSide + rightSide;
};
const createRandomPlates = (entriesNumber: number) => {
  const plates: string[] = [];
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
const createRandomFullName = () =>
  `${names[randomUpTo(names.length - 1)]} ${
    lastnames[randomUpTo(lastnames.length - 1)]
  }`;

export const createFakeData = (entriesNumber: number): PlateInfo[] => {
  return createRandomPlates(entriesNumber).map((plate) => ({
    plate,
    owner: createRandomFullName(),
  }));
};
