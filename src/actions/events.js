import Swal from "sweetalert2";
import { eventDate } from "../helpers/eventDate";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken("events", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (e) => ({
  type: types.eventAddNew,
  payload: e,
});

export const eventSetActive = (e) => ({
  type: types.eventSetActive,
  payload: e,
});

export const eventStartUpdate = (event) => async (dispatch) => {
  try {
    const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
    const body = await resp.json();
    if (body.ok) {
      dispatch(eventUpdate(event));
      Swal.fire("Success", "Event updated", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  } catch (error) {
    console.error(error);
  }
};

const eventUpdate = (e) => ({
  type: types.eventUpdate,
  payload: e,
});

export const eventStartDelete = () => async (dispatch, getState) => {
  const { id } = getState().calendar.activeEvent;
  try {
    const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
    const body = await resp.json();
    if (body.ok) {
      dispatch(eventDelete());
      Swal.fire("Success", "Event deleted", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  } catch (error) {
    console.log(error);
  }
};

const eventDelete = () => ({
  type: types.eventDelete,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("events");
      const body = await resp.json();
      const events = eventDate(body.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (e) => ({
  type: types.eventLoaded,
  payload: e,
});

export const eventClearLogout = () => ({
  type: types.eventClearLogout,
});
