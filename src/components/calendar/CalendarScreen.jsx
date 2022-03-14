import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch } from "react-redux";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendarMessages";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es-mx";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";

moment.locale("es-mx");

const localizer = momentLocalizer(moment);
const events = [
  {
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
];

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "#FFFFFF",
    };
    return { style };
  };

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
    </>
  );
};
