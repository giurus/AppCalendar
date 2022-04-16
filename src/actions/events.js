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

export const eventUpdate = (e) => ({
  type: types.eventUpdate,
  payload: e,
});

export const eventDelete = () => ({
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
