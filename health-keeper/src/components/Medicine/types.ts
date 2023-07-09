export type MedType = {
  form: string;
  name: string;
  pack: string;
  power: string;
  registryNumber: string;
  substance: string;
};

export type MedData = Array<MedType>;

export default MedType;
