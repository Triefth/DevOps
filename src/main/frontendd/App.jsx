import { useState, useEffect } from 'react';
import './App.css'; // Importamos los estilos

function App() {
  // Aquí guardamos los datos que vienen del backend
  const [planes, setPlanes] = useState([]);
  const [cargandoPlanes, setCargandoPlanes] = useState(true); // Nuevo estado para la carga inicial
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [horarios, setHorarios] = useState([]);

  // useEffect hace que esto se ejecute apenas carga la página
  useEffect(() => {
    // Llamamos a nuestro Spring Boot para obtener los planes
    fetch('http://localhost:8080/api/planes')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setPlanes(datos);
        setCargandoPlanes(false); // Indicamos que ya se cargaron los planes
      })
      .catch(error => console.error("Error cargando planes:", error));
  }, []);


  // Función que se ejecuta al hacer clic en un cuadrado
  const abrirVentanaPlan = (plan) => {
    setPlanSeleccionado(plan); // Guardamos qué plan se clickeó para abrir la ventana
    
    // Llamamos al backend para traer solo los horarios de ESE plan
    fetch(`http://localhost:8080/api/horarios/plan/${plan.id}`)
      .then(respuesta => respuesta.json())
      .then(datos => setHorarios(datos));
  };

  // Función para cerrar la ventana grande
  const cerrarVentana = () => {
    setPlanSeleccionado(null);
    setHorarios([]); // Limpiamos los horarios
  };

  return (
    <div className="contenedor-principal">
      {cargandoPlanes ? <p>Cargando planes...</p> : null} {/* Mensaje de carga inicial */}

      {/* 1. Nombre de la tienda */}
      <h1 className="titulo-tienda">La Tienda de Planes</h1>

      {/* 2. Los planes en cuadrados */}
      <div className="grilla-planes">
        {planes.map((plan) => (
          <div key={plan.id} className="cuadrado-plan" onClick={() => abrirVentanaPlan(plan)}>
            <h2>{plan.nombre}</h2>
            <p>{plan.descripcion}</p>
            <p className="precio">${plan.precio}</p>
            <span className="texto-clic">Clic para ver horarios</span>
          </div>
        ))}
      </div>

      {/* 3. La ventana ligeramente más grande (Modal) */}
      {planSeleccionado && (
        <div className="fondo-ventana">
          <div className="ventana-grande">
            <h2>Horarios disponibles: {planSeleccionado.nombre}</h2>
            
            <div className="lista-horarios">
              {horarios.length === 0 ? <p>Cargando horarios...</p> : null}
              
              {horarios.map((horario) => (
                <div key={horario.id} className={`horario-item ${horario.disponible ? 'libre' : 'ocupado'}`}>
                  <span>{horario.dia} | {horario.horaInicio} - {horario.horaFin}</span>
                  {horario.disponible ? (
                    <button className="btn-reservar">Reservar</button>
                  ) : (
                    <span className="texto-ocupado">No disponible</span>
                  )}
                </div>
              ))}
            </div>

            <button className="btn-cerrar" onClick={cerrarVentana}>Cerrar Ventana</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;