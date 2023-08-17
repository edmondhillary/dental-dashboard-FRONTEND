import { Row, Col, Divider, Spin, Button } from "antd";
import TableTreatments from "../Tabla/TableTreatments";
import { useContext, useState, useEffect } from "react";
import CreateTreatmentModal from "../Treatments/CreateTreatmentModal";
import { GlobalContext } from "../../context/UserContext/UsersState";
import muela181716262728 from "../../assets/diente18ok.png";
import muela1525 from "../../assets/muela15okok.png";
import diente1121 from "../../assets/diente11ok.png";
import muela1424 from "../../assets/muela14ok.png";
import diente1323 from "../../assets/diente13ok.png";
import muela484746363738 from "../../assets/muela48ok.png";
import diente4333 from "../../assets/diente43ok.png";
import diente42413132 from "../../assets/diente42ok.png";
import diente1222 from "../../assets/diente12ok.png";
// import { useMediaQuery } from "react-responsive";
import "./odontograma.scss";

function Odontograma({
  patientInfo,
  patientData,
  setPatientData,
  createBudgetVisible,
}) {
  const { user } = useContext(GlobalContext);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const toothImages = {
    18: { src: muela181716262728, rotate: false, mirror: false },
    17: { src: muela181716262728, rotate: false, mirror: false },
    16: { src: muela181716262728, rotate: false, mirror: false },
    15: { src: muela1525, rotate: false, mirror: false },
    14: { src: muela1424, rotate: false, mirror: false },
    13: { src: diente1323, rotate: false, mirror: false },
    12: { src: diente1222, rotate: false, mirror: false },
    11: { src: diente1121, rotate: false, mirror: false },
    21: { src: diente1121, rotate: false, mirror: true },
    22: { src: diente1222, rotate: false, mirror: true },
    23: { src: diente1323, rotate: false, mirror: true },
    24: { src: muela1424, rotate: false, mirror: true },
    25: { src: muela1525, rotate: false, mirror: true },
    26: { src: muela181716262728, rotate: false, mirror: true },
    27: { src: muela181716262728, rotate: false, mirror: true },
    28: { src: muela181716262728, rotate: false, mirror: true },
    48: { src: muela484746363738, rotate: false, mirror: false },
    47: { src: muela484746363738, rotate: false, mirror: false },
    46: { src: muela484746363738, rotate: false, mirror: false },
    45: { src: muela1525, rotate: true, mirror: false },
    44: { src: muela1525, rotate: true, mirror: false },
    43: { src: diente4333, rotate: false, mirror: false },
    42: { src: diente42413132, rotate: false, mirror: false },
    41: { src: diente42413132, rotate: false, mirror: false },
    40: { src: diente42413132, rotate: false, mirror: false },
    38: { src: muela484746363738, rotate: false, mirror: true },
    37: { src: muela484746363738, rotate: false, mirror: true },
    36: { src: muela484746363738, rotate: false, mirror: true },
    35: { src: muela1525, rotate: true, mirror: true },
    34: { src: muela1525, rotate: true, mirror: true },
    33: { src: diente4333, rotate: false, mirror: true },
    32: { src: diente42413132, rotate: false, mirror: true },
    31: { src: diente42413132, rotate: false, mirror: true },
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  function handleClick(numero) {
    console.log(`Haz clickeado en el diente número ${numero}`);
    setSelectedTooth(numero);
    setIsModalVisible(true);
  }

  const numerosDientes = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
    45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 0,
  ];

  // const isMediumScreen = useMediaQuery({ query: "(max-width: 10px)" });
  // const isSmallScreen = useMediaQuery({ query: "(max-width: 1px)" });

  // Luego definimos los arrays para las filas
  let row1, row2, row3, row4, row5, row6, row7, row8;

  if (toothImages) {
    row1 = numerosDientes.slice(0, 16);
    row2 = numerosDientes.slice(16, 32);
  }
  function renderCol(numero) {
    return (
      <Col span={1} key={numero}>
        <div style={{ position: "relative" }}>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              color: "black",
            }}
          >
            {numero}
          </h3>
          <br />
          <img
            style={{
              width: "90%",
              height: "130px",
              objectFit: "cover",
              transform: `${
                toothImages[numero].rotate ? "rotate(180deg)" : ""
              } ${toothImages[numero].mirror ? "scaleX(-1)" : ""}`,
            }}
            src={toothImages[numero].src}
            alt={`D${numero}`}
            data-numero={numero}
            onClick={(e) => handleClick(e.target.getAttribute("data-numero"))}
          />
        </div>
      </Col>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const handleClickCheckbox = (event) => {
    setSelectedTooth(0);
    setIsModalVisible(true);
  };

  return (
    <div style={{ margin: "0rem" }}>
      <Spin spinning={loading}>
        <div style={{ background: "white",  margin: "1rem"  }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              color: "black",
            }}
          >
            {row1.map(renderCol)}
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              color: "black",
            }}
          >
            {row2.map(renderCol)}
          </Row>
        </div>
        <Divider />

        <div
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type='primary'
            onClick={handleClickCheckbox}
            style={{ border: "2px  lightblue", color: "white" }}
          >
            TRATAMIENTO PARA TODA LA BOCA
          </Button>
        </div>
        <Divider />

      
          <TableTreatments
            createBudgetVisible={createBudgetVisible}
            isModalVisible={isModalVisible}
            patientInfo={patientInfo}
            patientData={patientData}
            setPatientData={setPatientData}
            updatePatientData={setPatientData}
          />
     
      </Spin>

      <CreateTreatmentModal
        patientData={patientData}
        setPatientData={setPatientData}
        visible={isModalVisible}
        onClose={handleCloseModal}
        selectedTooth={selectedTooth}
        loggedInUser={user}
        patientInfo={patientInfo}
      />
    </div>
  );
}

export default Odontograma;
