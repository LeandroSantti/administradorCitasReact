import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
  //Creamos state de cita
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //Creamos state de error
  const [error, setError] = useState(false);

  //Funcion que se ejecuta on change
  const actualizarState = (event) => {
    setCita({
      ...cita,
      [event.target.name]: event.target.value,
    });
  };

  //Extraemos valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Creamos funcion para enviar la cita
  const submitCita = (event) => {
    //prevenimos que envía por get por default
    event.preventDefault();

    //Validamos
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }

    //Eliminamos el mensaje de error
    setError(false);

    //Asignamos ID (agregamos nuevo campo)
    cita.id = uuidv4();
    console.log(cita);

    //Creamos Cita
    crearCita(cita);

    //Reiniciamos form
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <div>
      <h2>Crear cita</h2>

      {error ? (
        <p className="alerta-error">No puede haber campos vacíos</p>
      ) : null}
      <form action="" onSubmit={submitCita}>
        <label>Nombre mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </div>
  );
};

Formulario.propTypes = {
    crearCita: PropTypes.func
}
export default Formulario;
