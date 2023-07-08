import { db } from '../../../api/firebase/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';

const MyMedicine = () => {
  const getMedicines = async () => {
    const querySnapshot = await getDocs(collection(db, 'medicines'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  };
  getMedicines();
  return (
    <div>
      <h2>Leki</h2>
      <ul></ul>
    </div>
  );
};

export default MyMedicine;
