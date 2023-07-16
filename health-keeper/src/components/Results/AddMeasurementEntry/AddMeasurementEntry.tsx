import { useParams } from "react-router-dom";
import { AddMeasurementForm } from "../../index";
const AddMeasurementEntry = () => {
  const params = useParams();

  const isNewMeasurement = false;
  return (
    <AddMeasurementForm
      isNewMeasurement={isNewMeasurement}
      param={isNewMeasurement ? undefined : params.measurementName}
    />
  );
};

export default AddMeasurementEntry;
