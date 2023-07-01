import styles from './Medicine.module.css';

const getMedicine = async () => {
  const searchCode = (document.getElementById('codeEAN') as HTMLInputElement)
    .value;

  const response = await fetch(
    'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?eanGtin=' +
      searchCode,
    {
      method: 'GET',
    }
  );

  const data = await response.json();
  console.log(searchCode);
  const medicineData = data.content[0];
  console.log(medicineData.medicinalProductName);
  console.log(medicineData.medicinalProductPower);
  console.log(medicineData.commonName);
  console.log(medicineData.pharmaceuticalFormName);
  console.log(medicineData.registryNumber);
  const gtin = medicineData.gtin;
  const gtinArr = gtin.split('\\n');

  const packIndx = gtinArr.indexOf('0' + searchCode);
  console.log(gtinArr[packIndx]);
  const packs = medicineData.packaging;
  const packsArr = packs.split('\\n');
  console.log(packsArr[packIndx]);
};

const Medicine = () => {
  return (
    <div className={styles.bigDiv}>
      <label htmlFor='codeEAN'>Znajdź lek</label>
      <input name='codeEAN' id='codeEAN' placeholder='Podaj kod EAN leku' />
      <button type='button' onClick={getMedicine}>
        Wyszukaj lek
      </button>
    </div>
  );
};

export default Medicine;
