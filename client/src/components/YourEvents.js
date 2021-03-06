import React, { useEffect, useState, useCallback } from "react";
import CardForYourEvents from "./CardForYourEvents";

import Alert from "react-bootstrap/Alert";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function YourEvents({ user }) {
  const [yourEventsData, setYourEventsData] = useState([]);

  const [editState, setEditState] = useState([]);
  const [showDeletedState, setShowDeletedState] = useState(false);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < yourEventsData.length; i++) {
      arr.push(false);
    }
    setEditState(arr);
  }, [yourEventsData]);

  useEffect(() => {
    fetch(`/my-events/${user.id}`)
      .then((resp) => resp.json())
      .then((data) => setYourEventsData(data));
  }, [user]);

  let deleteEvent = (event) => {
    let id = event.event.id;
    let newArr = [...yourEventsData];

    fetch(`/delete-my-event/${id}`, {
      method: "DELETE",
    })
      .then(setYourEventsData(newArr.filter((item) => item.id !== id)))
      .then(changeStateTrue());
  };

  const changeStateTrue = () => {
    setShowDeletedState(true);
    setTimeout(changeStateToFalse, 2000);
  };

  const changeStateToFalse = () => {
    setShowDeletedState(false);
  };

  return (
    <>
      {showDeletedState ? (
        <span className="text-center">
          <Alert variant={"danger"} className="fs-3 sticky-top">
            Your Event Was Deleted!
          </Alert>
        </span>
      ) : null}

      {yourEventsData.length === 0 ? (
        <span className="text-center">
          <Alert variant={"danger"} className="fs-3 sticky-top">
            You Have No Events
          </Alert>
        </span>
      ) : (
        <CardForYourEvents events={yourEventsData} handleDelete={deleteEvent} />
      )}
    </>
  );
}

export default YourEvents;
