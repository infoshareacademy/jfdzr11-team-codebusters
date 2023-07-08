import { useContext, useEffect, useState } from 'react';
import { db } from '../../../api/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../../AuthContext/AuthContext';

const MyMedicine = () => {
  const { currentUser } = useContext(AuthContext);

  const [medicines, setMedicines] = useState<string[]>([]);

  useEffect(() => {
    const fetchMedicineNames = async () => {
      try {
        const id: string = currentUser?.uid;
        const data = await getDoc(doc(db, 'users', id));
        const medicines: string[] = data.data()?.medicines;

        setMedicines(medicines);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedicineNames();
  }, []);

  const handleDelete = () => {
    console.log('Usuwam lek');
    console.log(medicines);
  };

  return (
    <div>
      <h1>Moje leki</h1>
      <ul>
        {medicines.map((medicine) => (
          <>
            <h2>{medicine.name}</h2>
            <p>{medicine.form}</p>
            <p>{medicine.substance}</p>
            <p>{medicine.power}</p>
            <p>{medicine.pack}</p>
            <p>{medicine.registryNumber}</p>
            <button type='button' onClick={handleDelete}>
              Usuń lek
            </button>
          </>
        ))}
      </ul>
    </div>
  );
};

export default MyMedicine;
