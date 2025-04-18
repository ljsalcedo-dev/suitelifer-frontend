import React, { useEffect, useState } from "react";
import Calendar from "../Calendar";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import EventCard from "../events/EventCard";
import api from "../../utils/axios";
import { format } from "date-fns";

const EmployeeAside = () => {
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [todayEventCount, setTodayEventCount] = useState(0);
  const [upcommingEventCount, setUpcommingEventCount] = useState(0);
  const [showTodayEvent, setShowTodayEvent] = useState(
    JSON.parse(localStorage.getItem("showTodayEvent")) ?? true
  );
  const [showUpcommingEvent, setShowUpcommingEvent] = useState(
    JSON.parse(localStorage.getItem("showUpcommingEvent")) ?? false
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/all-events");
        setEvents(response.data);

        const dates = response.data.reduce((acc, current) => {
          const formattedDate = format(
            new Date(current.date_time),
            "yyyy-MM-dd"
          );
          acc.push(formattedDate);
          return acc;
        }, []);

        setEventDates(dates);

        const today = new Date().toISOString().split("T")[0];
        const todayCount = dates.filter((date) => date === today).length;
        setTodayEventCount(todayCount);
        const upcomingCount = dates.filter((date) => date > today).length;
        setUpcommingEventCount(upcomingCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      const showToday =
        JSON.parse(localStorage.getItem("showTodayEvent")) ?? true;
      const showUpcomming =
        JSON.parse(localStorage.getItem("showUpcommingEvent")) ?? false;
      setShowTodayEvent(showToday);
      setShowUpcommingEvent(showUpcomming);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTodayDisclosureBtn = () => {
    const updatedShowToday = !showTodayEvent;
    localStorage.setItem("showTodayEvent", updatedShowToday);
    setShowTodayEvent(updatedShowToday);
  };

  const handleUpcommingDisclosureBtn = () => {
    const updatedShowUpcomming = !showUpcommingEvent;
    localStorage.setItem("showUpcommingEvent", updatedShowUpcomming);
    setShowUpcommingEvent(updatedShowUpcomming);
  };

  if (loading) return null;

  return (
    <aside className="w-52 md:w-64 lg:w-72 h-dvh flex flex-col p-2 xl:p-3">
      <section className="flex justify-between items-baseline">
        <h2 className="font-avenir-black">Events</h2>
      </section>
      <Calendar eventDates={eventDates} />
      <section className="mt-5">
        <div className="w-full">
          <div className="">
            <Disclosure as="div" defaultOpen={showTodayEvent}>
              <DisclosureButton
                className="group flex w-full items-center justify-between"
                onClick={handleTodayDisclosureBtn}
              >
                <p className="font-avenir-black text-primary">
                  Today ({todayEventCount})
                </p>
                <ChevronDownIcon className="size-5 text-primary cursor-pointer group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-3 flex flex-col gap-3">
                {events
                  .filter((event) => {
                    const today = new Date().toISOString().split("T")[0];
                    const eventDate = new Date(event.date_time)
                      .toISOString()
                      .split("T")[0];
                    return eventDate === today;
                  })
                  .map((event, index) => (
                    <div key={index}>
                      <EventCard event={event} />
                    </div>
                  ))}
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" defaultOpen={showUpcommingEvent}>
              <DisclosureButton
                className="group my-3 flex w-full items-center justify-between"
                onClick={handleUpcommingDisclosureBtn}
              >
                <p className="font-avenir-black text-black">
                  Upcoming ({upcommingEventCount})
                </p>
                <ChevronDownIcon className="size-5 text-primary cursor-pointer group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-3 flex flex-col gap-3">
                {events
                  .filter((event) => {
                    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
                    const eventDate = new Date(event.date_time)
                      .toISOString()
                      .split("T")[0];
                    return eventDate >= today;
                  })
                  .map((event, index) => (
                    <div key={index}>
                      <EventCard
                        event={event}
                        isUpcoming={
                          new Date(event.date_time)
                            .toISOString()
                            .split("T")[0] >
                          new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                  ))}
                  {events
                  .filter((event) => {
                    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
                    const eventDate = new Date(event.date_time)
                      .toISOString()
                      .split("T")[0];
                    return eventDate >= today;
                  })
                  .map((event, index) => (
                    <div key={index}>
                      <EventCard
                        event={event}
                        isUpcoming={
                          new Date(event.date_time)
                            .toISOString()
                            .split("T")[0] >
                          new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                  ))}
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default EmployeeAside;
