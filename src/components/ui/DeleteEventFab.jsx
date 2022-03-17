import React from "react";
import { useDispatch } from "react-redux";
import { eventDelete, eventSetActive } from "../../actions/events";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(eventDelete());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
      <i className="fa-solid fa-trash"></i>
      <span> Delete</span>
    </button>
  );
};
