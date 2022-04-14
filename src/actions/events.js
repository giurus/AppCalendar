import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch) => {
    console.log(event);
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
