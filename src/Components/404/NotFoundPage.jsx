import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import './NotFoundPage.scss'; // Asegúrate de importar el archivo CSS correspondiente
import { GlobalContext } from '../../context/UserContext/UsersState';

export const NotFoundPage = ({subTitle, stats}) => {
    const { user } = useContext(GlobalContext)
   
  return (
   
    <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">{stats}</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
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
