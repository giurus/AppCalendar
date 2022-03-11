import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";

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
  const closeModal = () => {};

  const startDateChange = (e) => {
    setStartDate(e);
  };

  const endDateChange = (e) => {
    setEndDate(e);
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
        <form className="container">
          <div className="mb-3">
            <label className="form-label">Fecha y hora inicio</label>
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
              className="form-control"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
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
