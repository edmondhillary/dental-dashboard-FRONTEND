# dental-dashboard-FRONTEND
Aplicacion de gestion dental para pacientes y empleados , roles y odontograma
# Aplicación de Gestión Dental

Esta aplicación de gestión dental permite a los dentistas gestionar esquemas de pacientes, tratamientos, facturas, dientes y presupuestos de manera eficiente y organizada. La aplicación utiliza un stack de tecnologías modernas, incluyendo MongoDB, Express.js, React.js, Node.js, SASS, Syncfusion y Ant Design.

## Características

- **Gestión de pacientes**: Facilita la gestión de esquemas de pacientes, incluyendo sus tratamientos, citas, historial médico y detalles de facturación.
- **Gestión de tratamientos**: Permite gestionar tratamientos, con detalles sobre el procedimiento, coste, y notas relevantes.
- **Gestión de facturas**: Facilita la creación, modificación y seguimiento de facturas de los pacientes.
- **Gestión de dientes**: Permite a los dentistas visualizar y actualizar esquemas dentales para cada paciente.
- **Gestión de presupuestos**: Ayuda a crear y gestionar presupuestos de tratamientos para los pacientes.

## Tecnologías utilizadas

- **Backend**: MongoDB, Express.js, Node.js
- **Frontend**: React.js
- **Estilizadores**: SASS, Syncfusion, Ant Design

## Instalación

Asegúrate de tener instalado Node.js y MongoDB en tu sistema antes de seguir estos pasos.

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/edmondhillary/dental-dashboard-FRONTEND
   ```

2. **Ir al directorio de la aplicación**:
   ```sh
   cd dental-dashboard-FRONTEND
   ```

3. **Instalar las dependencias necesarias**. Esto se hace con el comando npm install en ambos directorios, /frontend y /backend.
   ```sh
   cd frontend && npm install
   cd ..
   cd backend && npm install
   ```

4. **Configurar las variables de entorno**. En el directorio /backend, crea un archivo `.env` y añade lo siguiente (reemplaza `yourMongoDBUrl` por la URL de conexión de tu MongoDB):
   ```sh
   MONGO_DB_URL=*****
   ```

5. **Iniciar el servidor y el cliente**. Primero, inicia el servidor desde el directorio /backend con `npm start`, luego inicia el cliente desde el directorio /frontend también con `npm start`.
   ```sh
   cd ../backend && npm start
   cd ../frontend && npm start
   ```

¡Eso es todo! Ahora deberías poder acceder a la aplicación en `http://localhost:3000`.


Por favor asegúrate de actualizar las pruebas según corresponda.





## Contacto

Eduardo González - eduardog.carbonell@gmail.com - 617680026
