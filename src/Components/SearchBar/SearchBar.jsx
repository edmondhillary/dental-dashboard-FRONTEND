// import React, { useState } from 'react';
// import { Input, Button, List } from 'antd';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export const SearchBar = () => {
//   const [displayName, setDisplayName] = useState('');
//   const [patients, setPatients] = useState([]);

//   const handleSearch = () => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     axios.get(`https://dental-dashboard-backend-production.up.railway.app/pacientes?displayName=${displayName}`, {
//       headers: {
//         Authorization: token
//       }
//     })
//       .then(response => {
//         setPatients(response.data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div>
//       <Input.Search
//         enterButton='Buscar'
//         size='large'
//         style={{ width: '100%', margin: '1rem', top: '0', color: 'white' }}
//         placeholder="Buscar paciente"
//         value={displayName}
//         onChange={e => setDisplayName(e.target.value)}
//         onSearch={handleSearch}
//         onBlur={handleSearch}
//       />

//       <List
//        style={{ background: 'white', cursor: 'pointer' }}
//         dataSource={patients}
//         renderItem={patient => (
//           <List.Item style={{ background: 'white', cursor: 'pointer' }}>
//             <Link  style={{ background: 'white', cursor: 'pointer' }} to={`/pacientes/${patient?._id}`}>{`${patient?.firstName} ${patient?.lastName}`}</Link>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Dropdown } from 'antd';
import { searchByDisplayName } from '../../service/patientService/patientsService';

export const Header = () => {
  const [isLoading, setIsLoading] = useState('')
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchResult, setSearchResult] = useState()
  const navigate = useNavigate()

  const onSearch = async (input) => {
    if (!input) return;
    setIsLoading(true);
    const result = await searchByDisplayName(input);
    setSearchResult(result);
    setDropdownOpen(true);
    setIsLoading(false);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' , background: 'white'}} onMouseLeave={() => setDropdownOpen(false)}>
      <Dropdown
        menu={{
          items: searchResult,
          onClick: (item) => {
            console.log({item})
            navigate(item.key)}
        }}
        open={isDropdownOpen}
        destroyPopupOnHide={true}
        autoAdjustOverflow={true}
        size='small'

      >
        <Input.Search
          bordered={true}
          allowClear={true}
          loading={isLoading}
          onSearch={(input) => onSearch(input)}
          placeholder='Find users in Nomad'
          enterButton='Search'
          style={{width:'65%'}}
        />
      </Dropdown>
    </div>
  )
}