import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import './NotFoundPage.scss'; // Asegúrate de importar el archivo CSS correspondiente
import { GlobalContext } from '../../context/UserContext/UsersState';

export const NotFoundPage = ({subTitle, stats}) => {
    const { user } = useContext(GlobalContext)
   
  return (
   
    <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-10 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">{stats}</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		¿Estás perdido? Error: {stats }
		</h3>
		<br />
		<p style={{margin: '2rem'}}>
            
        <strong > {subTitle}</strong>
        </p>
		
        <Link to={`/profile/${user?._id}`} className="link_404">Volver a mi perfil</Link>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
  );
};
