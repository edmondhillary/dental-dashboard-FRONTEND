import { useContext, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Radio,
  TreeSelect,
} from "antd";
import moment from "moment";
import { treatmentsTreeType } from "../../service/treatmentService/treatmentsAndPrice";
import axios from "axios";
import { TreatmentsContext } from "../../context/TreatmentsContext/TreatmentState";

const { TreeNode } = TreeSelect;
// import { createTreatment } from "../../service/treatmentService/treatmentService";

const { Option } = Select;

const CreateTreatmentModal = ({
  patientData,
  setPatientData,
  visible,
  patients,
  employees,
  onClose,
  selectedTooth,
  loggedInUser,
  patientInfo,
}) => {
  const [form] = Form.useForm();
  const { treatments,  createTreatment } =
    useContext(TreatmentsContext);
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedTreatmentPrice, setSelectedTreatmentPrice] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [customDiscount, setCustomDiscount] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(selectedTreatmentPrice);
  const [loading, setLoading] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const handleDiscountChange = (value) => {
    setDiscount(value);
  };

  useEffect(() => {
    const newPrice =
      selectedTreatmentPrice - selectedTreatmentPrice * (discount / 100);
    setFinalPrice(newPrice);
    form.setFieldsValue({ cost: newPrice });
  }, [selectedTreatmentPrice, discount, form]);
  const handleDiscountRadioChange = (e) => {
    setSelectedDiscount(e.target.value);
    form.setFieldsValue({ discount: e.target.value });
  };

  const fetchEmployees = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get("https://dental-dashboard-backend-production.up.railway.app/empleados", {
        headers: {
          Authorization: token,
        },
      });
      setEmployeeList(response.data);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePriceChange = (value) => {
    form.setFieldsValue({ cost: value });
    setSelectedTreatmentPrice(value);
  };

  const handleTreatmentChange = (value) => {
    const findTreatment = (treatments) => {
      for (let treatment of treatments) {
        if (treatment.value === value) {
          return treatment;
        } else if (treatment.hijos) {
          const subTreatment = findTreatment(treatment.hijos);
          if (subTreatment) {
            return subTreatment;
          }
        }
      }
      return null;
    };

    const selectedTreatment = findTreatment(treatmentsTreeType);

    if (selectedTreatment) {
      setSelectedTreatment(selectedTreatment.value);
      setSelectedTreatmentPrice(selectedTreatment.precio);
    }
  };

  const handleDiscountToggle = (e) => {
    setDiscountEnabled(e.target.checked);
  };

  const handleCreate = () => {
    form.validateFields().then(async (values) => {
      console.log("soy values del modal de crear TTO:", { values });
      const treatmentData = {
        description: values.description,
        patient: patientInfo._id,
        employee: values.employee,
        teeth: selectedTooth,
        type: selectedTreatment,
        completed: Boolean(values.completed),
        cost: selectedTreatmentPrice,
        isPaid: values.isPaid,
        discount: discountEnabled ? values.discount : 0,
        fechaFin: values.fechaFin || new Date(),
      };

      setLoading(true);
      try {
        const createdTreatment = await createTreatment(treatmentData);
        form.resetFields([
          "description",
          "teeth",
          "type",
          "cost",
          "fechaFin",
          "isPaid",
          "discountEnabled",
          "discount",
        ]);
        // setPatientData({...patientData, treatmentsTreeType: [...patientData.treatmentsTreeType, createdTreatment] });
        console.log("soy patientData en createTreModal", patientData);
        setSelectedTreatment(null);
        setDiscountEnabled(false);
        setPatientData(patientData);
        onClose();
        console.log({ treatments });
        console.log("soy patientData 2", patientData);
      } catch (error) {
        console.error("Error al crear el tratamiento:", error);
      } finally {
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    const treatment = treatmentsTreeType?.find(
      (t) => t.nombre === selectedTreatment
    );
    if (treatment) {
      setSelectedTreatmentPrice(treatment?.precio);
    }
  }, [selectedTreatment]);

  useEffect(() => {
    form.setFieldsValue({ cost: selectedTreatmentPrice });
  }, [selectedTreatmentPrice, form]);

  useEffect(() => {
    if (patientInfo) {
      form.setFieldsValue({
        patient: `${patientInfo.firstName} ${patientInfo.lastName}`,
      });
    }
  }, [patientInfo, form]);
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        teeth: selectedTooth,
        type: undefined,
        cost: undefined,
        fechaFin: moment(),
        isPaid: false,
        discountEnabled: false,
        discount: undefined,
      });
    }
  }, [visible, form]);

  const renderTreeNodes = (data) =>
    data.map((treatment) => (
      <TreeNode
        key={treatment.key}
        value={treatment.value}
        title={`${treatment.nombre}`}
      >
        {treatment.hijos && renderTreeNodes(treatment.hijos)}
      </TreeNode>
    ));

  return (
    <Modal
      style={{
        width: "80%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={visible}
      onCancel={onClose}
      onOk={handleCreate}
      confirmLoading={loading}
    >
      <Form form={form} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label='Paciente'
              name='patient'
              rules={[{ required: true }]}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
            >
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              rules={[{ required: true }]}
              label='Diente'
              name='teeth'
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
            >
              <InputNumber value={selectedTooth} readOnly />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label='Tratamiento:'
              name='type'
              rules={[{ required: true }]}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 24 }}
            >
              <TreeSelect
                style={{ width: "100%" }}
                placeholder='Selecciona un tratamiento'
                onChange={handleTreatmentChange}
                treeDefaultExpandAll
              >
                {renderTreeNodes(treatmentsTreeType)}
              </TreeSelect>
            </Form.Item>
          </Col>
          {selectedTreatment && (
            <Col xs={24} sm={12}>
              <Form.Item
                label='Precio'
                name='cost'
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el precio del tratamiento",
                  },
                ]}
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 18 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={
                    selectedTreatmentPrice === null ? "Ingrese el precio" : ""
                  }
                  min={0}
                  formatter={(value) =>
                    ` ${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/€\s?|(,*)/g, "")}
                  onChange={(value) => handlePriceChange(value)}
                />
              </Form.Item>
            </Col>
          )}
          <Col xs={24}>
            <Form.Item
              label='Odontologo/a'
              name='employee'
              rules={[{ required: true }]}
              initialValue={loggedInUser?._id}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
            >
              <Select>
                {employeeList?.map((e) => (
                  <Option key={e._id} value={e._id}>
                    {e.firstName} {e.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label='Anotaciones del Tratamiento'
              name='description'
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col xs={24} md={12}>
              <Form.Item
                label='¿Tiene descuento?'
                name='discountEnabled'
                valuePropName='checked'
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 18 }}
              >
                <Checkbox onChange={handleDiscountToggle}>Sí</Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
               rules={[
                { required: true ,
                  message: "Por favor, indica si completaste el tratamiento",
                }
              ]}
                label='¿Completado?'
                name='completed'
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 18 }}
              >
                <Radio.Group
                  onChange={(e) => {
                    setShowEndDate(!e.target.value);
                    if (!e.target.value) {
                      form.setFieldsValue({ fechaFin: moment() });
                    }
                  }}
                >
                  <Radio value={true}>Sí</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
              {showEndDate && (
                <Form.Item
                  label='Final tratamiento:'
                  name='fechaFin'
                  initialValue={moment()}
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 18 }}
                >
                  <DatePicker />
                </Form.Item>
              )}
            </Col>
          </Row>

          {discountEnabled && (
            <>
              <Col xs={24} sm={12}>
                <Form.Item label='Descuento' name='discount'>
                  <Radio.Group
                    onChange={(e) => handleDiscountChange(e.target.value)}
                  >
                    <Row>
                      <Col span={24}>
                        <Radio value={5}>5%</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value={10}>10%</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value={15}>15%</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value={20}>20%</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label='Descuento personalizado' name='discount'>
                  <InputNumber
                    min={0}
                    max={100}
                    onChange={handleDiscountChange}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          <Col xs={24} sm={12}>
            <Form.Item
              label='Precio'
              name='cost'
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el precio del tratamiento",
                },
              ]}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder={finalPrice === null ? "Ingrese el precio" : ""}
                min={0}
                formatter={(value) =>
                  ` ${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/€\s?|(,*)/g, "")}
                onChange={(value) => handlePriceChange(value)}
                value={finalPrice}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateTreatmentModal;
