import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendarMessages";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es-mx";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es-mx");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = () => {
    dispatch(eventSetActive(null));
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#FF9A00" : "#1DB21A",
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
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: CalendarEvent,
        }}
      />
      {activeEvent && <DeleteEventFab />}

      <AddNewFab />
      <CalendarModal />
    </>
  );
};
