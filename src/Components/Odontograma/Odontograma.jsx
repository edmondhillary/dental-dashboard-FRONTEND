import { Row, Col, Divider, Table, Tag } from "antd";
import TableTreatments from "../Tabla/TableTreatments";
import { useContext, useState } from "react";
import CreateTreatmentModal from "../Treatments/CreateTreatmentModal";
import { GlobalContext } from "../../context/UserContext/UsersState";
import muela181716262728 from "../../assets/diente18ok.png"; //mueals 16/17/18 /26/27/28
import muela1525 from "../../assets/muela15okok.png"; // muelas 15/25/ y del reves 44/45/34/35
import diente1121 from "../../assets/diente11ok.png"; //dientes 11/21
import muela1424 from "../../assets/muela14ok.png"; // muelas 14/24
import diente1323 from "../../assets/diente13ok.png"; //dientes 13/23
import muela484746363738 from "../../assets/muela48ok.png"; // muelas 46/47/48/ de lado contrario 36/37/38
import diente4333 from "../../assets/diente43ok.png"; // deintes 43/33
import diente42413132 from "../../assets/diente42ok.png"; // deintes 42/41/31/32
import diente1222 from "../../assets/diente12ok.png"; //dientes 12/22
import { useMediaQuery } from "react-responsive";

function Odontograma({
  patientInfo,
  patientData,
  setPatientData,
  createBudgetVisible,
}) {
  const { user, getUserInfo } = useContext(GlobalContext);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  

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

  const handleCreateTreatment = (values) => {
    // onCreate(values);
    setIsModalVisible(false);
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
    45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  console.log("Selected tooth:", selectedTooth);
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1106px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1000px)" });

  // Luego definimos los arrays para las filas
  let row1, row2, row3, row4, row5, row6, row7, row8;

  if (isSmallScreen) {
    // 8 filas de 4 dientes cada una
    row1 = numerosDientes.slice(0, 4);
    row2 = numerosDientes.slice(4, 8);
    row3 = numerosDientes.slice(8, 12);
    row4 = numerosDientes.slice(12, 16);
    row5 = numerosDientes.slice(16, 20);
    row6 = numerosDientes.slice(20, 24);
    row7 = numerosDientes.slice(24, 28);
    row8 = numerosDientes.slice(28, 32);
  } else if (isMediumScreen) {
    // 4 filas de 8 dientes cada una
    row1 = numerosDientes.slice(0, 8);
    row2 = numerosDientes.slice(8, 16);
    row3 = numerosDientes.slice(16, 24);
    row4 = numerosDientes.slice(24, 32);
    row5 = [];
    row6 = [];
    row7 = [];
    row8 = [];
  } else {
    // 2 filas de 16 dientes cada una
    row1 = numerosDientes.slice(0, 16);
    row2 = numerosDientes.slice(16, 32);
    row3 = [];
    row4 = [];
    row5 = [];
    row6 = [];
    row7 = [];
    row8 = [];
  }
  function renderCol(numero) {
    return (
      <Col span={1} key={numero}>
        <div style={{ position: "relative" }}>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            {numero}
          </h3>
          <br />
          <img
            style={{
              width: "100%",
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
  return (
    <div style={{ margin: " 3rem" }}>
      {/* <GlobalTreatments style="DIENTE NUMERO 0, EJEMPLO LIMPIEZA, BLANQUEMAINETO... ETC0"/> */}
      <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
        {row1.map(renderCol)}
      </Row>
      <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
        {row2.map(renderCol)}
      </Row>
      {isMediumScreen && (
        <>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {row3.map(renderCol)}
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {row4.map(renderCol)}
          </Row>
        </>
      )}
      {isSmallScreen && (
        <>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {row5.map(renderCol)}
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {row6.map(renderCol)}
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {row7.map(renderCol)}
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            {row8.map(renderCol)}
          </Row>
        </>
      )}
      <Divider />

      <TableTreatments
        createBudgetVisible={createBudgetVisible}
        isModalVisible={isModalVisible}
        patientInfo={patientInfo}
        patientData={patientData}
        setPatientData={setPatientData}
        updatePatientData={setPatientData}
      />

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
