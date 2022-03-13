import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours");

export const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlus.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: now.toDate(),
    end: nowPlus.toDate(),
  });

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {};

  const startDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const endDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire("Error", "Las fechas no deber ser iguales", "error");
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    // Realizar las acciones a la BD
    setTitleValid(true);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={true}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form onSubmit={submitForm} className="container">
          <div className="mb-3">
            <label className="form-label">
              Fecha y hora inicio{" "}
              <span className="form-text">
                La hora se cambia con las flechas direccionales
              </span>
            </label>
            <DateTimePicker
              onChange={startDateChange}
              value={startDate}
              minDate={now.toDate()}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha y hora fin</label>
            <DateTimePicker
              onChange={endDateChange}
              value={endDate}
              minDate={startDate}
              className="form-control"
            />
          </div>
          <hr />
          <div className="mb-3">
            <label className="form-label">Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!titleValid && "is-invalid"}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text">
              Una descripción corta
            </small>
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text">
              Información adicional
            </small>
          </div>
          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="fa-regular fa-floppy-disk"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
