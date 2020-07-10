export interface PlateInfo {
  plate: string;
  owner: string;
}

export const instanceOfPlateInfo = (obj: any): obj is PlateInfo =>
  'plate' in obj && 'owner' in obj;
