import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Input, Dropdown } from "antd";
import { searchByDisplayName } from "../../service/patientService/patientsService";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header = ({size}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Agrega el estado para el valor de búsqueda
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const onSearch = async (input) => {
    if (!input) return;
    setIsLoading(true);

    try {
      const result = await searchByDisplayName(input);
      setSearchResult(result);
      setDropdownOpen(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
       // Restablece el valor de búsqueda a vacío
      inputRef.current.blur(); // Remover el foco del input
    }
  };

  const onItemClick = (item) => {
    console.log(item);
    navigate(`/pacientes/${item?._id}`);
    setSearchValue("");
    setDropdownOpen(false); 
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "2em" }}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {console.log({ searchResult })}
      <Dropdown
        menu={{
          items: searchResult?.map((item) => ({
            key: item?._id,
            onClick: () => (
              <>
                <Link to={`/pacientes/${item?._id}`}>{item?.displayName}</Link>
                {onItemClick(item)}
              </>
            ),
            label: item?.displayName, // Agrega el displayName como label
          })),
        }}
        open={isDropdownOpen}
        destroyPopupOnHide={true}
        autoAdjustOverflow={true}
        size='large'
      >
        <Input.Search
          bordered={true}
          allowClear={true}
          loading={isLoading}
          onSearch={onSearch}
          size={size='large'}
          onChange={(e) => setSearchValue(e.target.value)} // Actualiza el estado de búsqueda al cambiar el valor del input
          value={searchValue} // Establece el valor del input
          placeholder='Buscar paciente'
          enterButton='Buscar'
          style={{ width: "65%" }}
          ref={inputRef} // Asignar la referencia al componente Input.Search
        />
      </Dropdown>
    </div>
  );
};
