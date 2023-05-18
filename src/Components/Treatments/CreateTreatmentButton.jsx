import { useState } from 'react';
import { Button } from 'antd';
import CreateTreatmentModal from './CreateTreatmentModal';

const CreateTreatmentButton = ({ patients, employees, treatments, onCreate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateTreatment = (values) => {
    onCreate(values);
    setIsModalVisible(false);
  };

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Button onClick={handleToggleModal}>Crear tratamiento</Button>
      <CreateTreatmentModal
        patients={patients}
        employees={employees}
        treatments={treatments}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCreateTreatment}
      />
    </>
  );
};

export default CreateTreatmentButton;
