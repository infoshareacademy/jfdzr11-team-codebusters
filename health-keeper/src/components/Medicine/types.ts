export type MedType = {
  form: string;
  name: string;
  pack: string;
  power: string;
  registryNumber: string;
  substance: string;
  currentAmount: number;
};

export type MedData = Array<MedType>;

export default MedType;
