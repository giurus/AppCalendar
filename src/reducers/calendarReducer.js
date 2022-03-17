import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      id: new Date().getDate(),
      title: "Boss Birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      notes: "Buy a cake",
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Andre",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };
    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null,
      };
    default:
      return state;
  }
};
