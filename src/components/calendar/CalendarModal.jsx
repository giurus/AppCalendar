import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import { eventSetActive, eventStartAddNew, eventStartUpdate } from "../../actions/events";

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

const initFormValues = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initFormValues);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initFormValues);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventSetActive(null));
    setFormValues(initFormValues);
  };

  const startDateChange = (e) => {
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const endDateChange = (e) => {
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
    // TODO: Realizar las acciones a la BD
    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h2> {activeEvent ? "Editando Evento" : "Nuevo Evento"} </h2>
      <hr />
      <form onSubmit={submitForm} className="container">
        <div className="mb-3">
          <label className="form-label">
            Fecha y hora inicio <span className="form-text">La hora se cambia con las flechas direccionales</span>
          </label>
          <DateTimePicker onChange={startDateChange} value={start} minDate={now.toDate()} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha y hora fin</label>
          <DateTimePicker onChange={endDateChange} value={end} minDate={start} className="form-control" />
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
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-outline-primary">
            <i className="fa-regular fa-floppy-disk"></i>
            <span> Guardar</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
