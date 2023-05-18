import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Form,
  InputNumber,
  Select,
  DatePicker,
  message,
  Input,
  Checkbox
} from "antd";
import axios from "axios";
import { PatientProfileContext } from "../Patients/PatientProfile";
import { TreatmentsContext } from "../../context/TreatmentsContext/TreatmentState";

const { Option } = Select;

const CreateBudget = ({ visible, onCreate, onCancel }) => {
  const { treatments, treatment, getTreatmentsByQuery } =
    useContext(TreatmentsContext);

  const [form] = Form.useForm();
  const [treatmentsBudget, setTreatmentsBuget] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { patientData, setPatientData } = useContext(PatientProfileContext);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const token = JSON.parse(localStorage.getItem("token"));
  const [isPaid, setIsPaid] = useState(false);

  const query = `patient=${patientData?._id}&completed=true&isAddedToBudget=false`;
  useEffect(() => {
    if (patientData && patientData?._id) {
      getTreatmentsByQuery(query);
      console.log(treatments, treatment);
    }
  }, [patientData, token]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:4002/empleados/", {
          headers: {
            Authorization: token,
          },
        });
        setEmployees(response.data.displayName);
      } catch (error) {
        message.error("Error al cargar empleados.");
      }
    };

    fetchEmployees();
  }, []);
  const updateTreatments = () => {
    getTreatmentsByQuery(query);
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      // await updateTreatmentsIsAddedToBudget();
      console.log({ patientData })
      onCreate({
        ...values,
        patient: patientData?._id,
        treatment: selectedTreatments,
      });

      form.resetFields();
      updateTreatments();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleTreatmentChange = (values) => {
    setSelectedTreatments(values);
    // calcular costo total de los tratamientos seleccionados
    const cost = values.reduce((acc, val) => {
      const treatment = treatments?.find((t) => t._id === val);
      return acc + treatment?.cost;
    }, 0);
    setTotalCost(cost);

    // calcular costo con descuento para cada tratamiento y sumarlos
    const costWithDiscount = values.reduce((acc, val) => {
      const treatment = treatments?.find((t) => t._id === val);
      const discountedCost =
        treatment?.cost - treatment?.cost * (treatment?.discount / 100);
      return acc + discountedCost;
    }, 0);

    form.setFieldsValue({ costWithDiscount: costWithDiscount });
  };

  const handleDiscountChange = (value) => {
    // aplicar descuento
    const costWithDiscount = totalCost - totalCost * (value / 100);
    form.setFieldsValue({ costWithDiscount });
  };


// ...

const handleCheckboxChange = (e) => {
    setIsPaid(e.target.checked);
    if (e.target.checked) {
        form.setFieldsValue({ paid: form.getFieldValue('costWithDiscount') });
    } else {
        form.setFieldsValue({ paid: 0 });
    }
};

  return (
    <Modal
      open={visible}
      title='Crear factura'
      okText='Crear'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      {console.log("soy log de createBudget fetchTreaats", treatments)}
      {console.log("SELECIONABLES", { treatments })}
      <Form form={form} layout='vertical' name='create_budget_form'>
        <Form.Item
          name='treatment'
          label='Tratamientos'
          rules={[
            { required: true, message: "Selecciona al menos un tratamiento" },
          ]}
        >
          <Select
            mode='multiple'
            placeholder='Selecciona tratamientos'
            onChange={handleTreatmentChange}
          >
            {treatments?.map((treatment) => (
              <Option key={treatment?._id} value={treatment?._id}>
                {treatment?.type} , {treatment?.cost} €, DTO:{" "}
                {treatment?.discount}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Costo Total'>
          <InputNumber
            disabled
            value={totalCost}
            addonAfter="€"
            min={0}
            style={{ width: "40%" }}
          />
        </Form.Item>
        {/* <Form.Item name="discount" label="Descuento" initialValue={0} disabled>
                  <InputNumber min={0} max={100} style={{ width: '100%' }} onChange={handleDiscountChange} />
                </Form.Item> */}
        <Form.Item
     
          disabled
          name='costWithDiscount'
          label='Costo con descuento'
          rules={[
            { required: true, message: "Ingresa el costo con descuento" },
          ]}
        >
          <InputNumber disabled min={0} style={{ width: "40%" }}  addonAfter="€"/>
        </Form.Item>
        <Form.Item label='¿Cuánto paga el paciente?:'>
          <Checkbox checked={isPaid} onChange={handleCheckboxChange}>
            Todo pagado
          </Checkbox>
        </Form.Item>
        <Form.Item
          name='paid'
          initialValue={0}
          rules={[{ required: true, message: "Ingresa el monto pagado" }]}
        >
          
          <InputNumber addonAfter="€" min={0} style={{ width: "40%" }} disabled={isPaid} />
        </Form.Item>
        {/* <Form.Item name="patient" label="Paciente" rules={[{ required: true, message: 'paciente no esta seleccionado/a' }]}  >
  <Input defaultValue={patientData.firstName + ' ' + patientData.lastName}  disabled />
</Form.Item> */}
      </Form>
    </Modal>
  );
};

export default CreateBudget;
