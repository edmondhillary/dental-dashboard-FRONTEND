import React, { useState } from "react";
import { Table, Input } from "antd";
import { treatmentsTreeType } from "../../service/treatmentService/treatmentsAndPrice";
const { Search } = Input;
const TreatmentTable = () => {
  const [searchText, setSearchText] = useState("");

  // const handleSearch = (value) => {
  //   setSearchText(value);
  // };

  const filterTreatments = (treatments, searchText) => {
    return treatments.filter(
      (treatment) =>
        treatment.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        treatment.hijos.some((child) =>
          child.nombre.toLowerCase().includes(searchText.toLowerCase())
        ) ||
        treatment.precio?.toString().includes(searchText)
    );
  };

  const generateColumns = () => {
    const columns = [
        {
          title: <u style={{ textTransform: "uppercase",
          fontWeight: "bold", color:'#fff', alignItems:'center'}}>Tratamientos</u>,
          dataIndex: "nombre",
          key: "nombre",
          render: (text, record) => {
            return record.isParent ? <b>{text}</b> : text;
          },
        },
        {
          title: <u style={{ textTransform: "uppercase",
          fontWeight: "bold", color:'#fff'}}>Precio</u>,
          dataIndex: "precio",
          key: "precio",
        },
      ];

    return columns;
  };

  const generateDataSource = () => {
    const filteredTreatments = filterTreatments(treatmentsTreeType, searchText);
    const dataSource = [];

    filteredTreatments.forEach((treatment) => {
      const parent = {
        key: treatment.key,
        nombre: treatment.nombre,
        precio: treatment.precio ? `${treatment.precio} €` : "Variable",
        isParent: true,
      };

      dataSource.push(parent);

      if (treatment.hijos && treatment.hijos.length > 0) {
        treatment.hijos.forEach((child) => {
          const childData = {
            key: child.key,
            nombre: child.nombre,
            precio: child.precio ? `${child.precio} €` : "Variable",
            isParent: false,
          };

          dataSource.push(childData);
        });
      }
    });

    return dataSource;
  };

  const columns = generateColumns();
  const dataSource = generateDataSource();

  const tableHeaderStyle = {
    background: "#D9AAF1",
    color: "white",
   
    // borderBottom: "2px solid #ccc",
  };

  return (
    <div
    style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        color:'black'
   
     }}
    >
      {/* <Search
        size='large'
        placeholder='Buscar tratamiento'
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        // style={{ alignItems: 'center', marginBottom: 16, margin: "3rem", width: "30%"  }}
      /> */}
      <Table
      
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ background: "transparent", margin: "3rem", width: "70%" , color: "white" }}
        bordered
        size='middle'
        // components={{
        //   header: {
        //     cell: () => <th className="th-head" s />
        //   },
        // }}
      />
    </div>
  );
};

export default TreatmentTable;
