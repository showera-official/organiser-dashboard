import React, { useState, Fragment, useEffect } from "react";
import Card from "../../components/ui/Card";
import { Icon } from "@iconify/react";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import Flatpickr from "react-flatpickr";
import Textarea from "@/components/ui/Textarea";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { Tab, Disclosure, Transition } from "@headlessui/react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { set } from "react-hook-form";
import axios from "axios";
import AddTicketType from "./addTicketType";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function AddEvent() {
  //States to hold and send data
  const [picker, setPicker] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventType, setEventType] = useState(""); // online/offline
  const [eventStatus, setEventStatus] = useState(""); //active or inactive
  const [eventPayStatus, setEventPayStatus] = useState(""); //paid or free
  const [eventCategory, setEventCategory] = useState(""); //category of the event
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedCarousel2, setSelectedCarousel2] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [hiddenVenue, setHiddenVenue] = useState("");
  const [linkArea, setLinkArea] = useState("hidden");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventVenue: "",
  });
  //fucntions to manage file inputs
  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedCarousel2(filesArray);
  };

  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  }

  const handleSelectChange = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "eventType":
        setEventType(value);
        break;
      case "eventPayStatus":
        setEventPayStatus(value);
        break;
      case "eventStatus":
        setEventStatus(value);
        break;
      case "eventCategory":
        setEventCategory(value);
    }
  };



  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const EventType = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];
  const EventType2 = [
    { value: "paid", label: "Paid" },
    { value: "free", label: "Free" },
  ];
  const eventActive = [
    { value: 0, label: "Active (Event will be listed)" },
    { value: 1, label: "Inactive (Event will be hidden)" },
  ];
  const categories = [
    { value: "Comedy", label: "Comedy" },
    { value: "Party", label: "Party" },
  ];

  const handleCreateEvent = (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);

    setIsSubmitting(true);

   
    if (
      eventType.value === "offline" &&
      (!selectedCountry || !selectedState || !selectedCity)
    ) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }


    if (
      eventLink.match(
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
      )
    ) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please provide a valid event Link");
    }

    // if (!formData.phone.match(/^[0-9]{10}$/)) {
    //   setLoading(false);
    //   setIsSubmitting(false);
    //   return toast.error("Please enter a valid phone number");
    // }

    //  password should be no only 4 digits
    // passwrod regex only numbers

    axios
      .post("https://tame-teal-tortoise-wrap.cyclic.app/api/v1/event/create", {
        event_name: formData.eventName,
        event_mode: eventType.value,
        event_timezone: "UTC",
        event_ticket_type: eventPayStatus.value,
        event_start_date: eventStartDate.toDateString,
        event_end_date: eventEndDate.toDateString,
        event_start_time: eventStartTime,
        event_end_time: eventEndTime.toDateString,
        event_is_active: eventStatus.value,

        // eventVenue: formData.eventVenue + ", " + selectedCity + ", " + selectedState + ", " + selectedCountry,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setIsSubmitting(false);
        toast.success(res.data.message);

        setTimeout(() => {
          window.location.href = "/addevent";
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setIsSubmitting(false);

        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div>
        <Card title={"Add New Event"}>
          <div className=" py-2 px-4 w-full">
            <Textinput
              label="Event Name"
              id="pn"
              type="text"
              onChange={(e) => {
                handleChange(e);
                e.target.name = "eventName";
              }}
              placeholder="Add Event Name"
            />
          </div>
          <div className=" py-2 px-4 w-full">
            <Textarea
              label="Event Description"
              id="pn4"
              placeholder="Add Event Description"
              onChange={(e) => {
                handleChange(e);
                e.target.name = "eventDescription";
              }}
            />
          </div>
          <div className="w-full px-2 py-1 flex flex-wrap flex-column ">
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" for="hf-picker">
                  Event Start Date
                </label>
                <Flatpickr
                  value={eventStartDate}
                  id="hf-picker"
                  className="form-control py-2"
                  onChange={(date) => setEventStartDate(date)}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" for="hf-picker">
                  Event End Date
                </label>
                <Flatpickr
                  value={eventEndDate}
                  id="hf-picker"
                  className="form-control py-2"
                  onChange={(date) => setEventEndDate(date)}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              </div>
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Event Start Time
                </label>
                <Flatpickr
                  className="form-control py-2"
                  value={eventStartTime}
                  id="timepicker"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                  onChange={(date) => setEventStartTime(date)}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Event End Time
                </label>
                <Flatpickr
                  className="form-control py-2"
                  value={eventEndTime}
                  id="timepicker"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                  }}
                  onChange={(date) => {setEventEndTime(date)
                  console.log(eventEndTime)}}
                />
              </div>
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Select Event Type
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    handleSelectChange("eventType", e);
                    setHiddenVenue(e.value === "online" ? "hidden" : "");
                    setLinkArea(e.value === "online" ? "" : "hidden");
                  }}
                  options={EventType}
                  styles={styles}
                  id="hh"
                  name="eventType"
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Is Event Paid or Free ?
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={EventType2[1]}
                  options={EventType2}
                  styles={styles}
                  id="hh"
                  name="eventPayStatus"
                  onChange={(e) => {
                    handleSelectChange("eventPayStatus", e);
                  }}
                />
              </div>
            </div>
            <div
              className={`w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ${hiddenVenue}`}
            >
              <div className="md:w-1/2 w-full px-2">
                <Textarea
                  label="Venue"
                  id="pn4"
                  placeholder="Add Event Address"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.name = "eventVenue";
                  }}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Select Event Country
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={Country.getAllCountries()}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCountry}
                  onChange={(item) => {
                    setSelectedCountry(item);
                  }}
                  styles={styles}
                  name="country"
                />
              </div>
            </div>
            <div
              className={`w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ${hiddenVenue}`}
            >
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Select Event State
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedState}
                  onChange={(item) => {
                    setSelectedState(item);
                  }}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Select Event City
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={City.getCitiesOfState(
                    selectedState?.countryCode,
                    selectedState?.isoCode
                  )}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCity}
                  onChange={(item) => {
                    setSelectedCity(item);
                  }}
                />
              </div>
            </div>
            <div className={`py-2 px-2 w-full ${linkArea}`}>
              <Textinput
                label="Event Link"
                id="pn"
                type="text"
                placeholder="Add Event Link"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "eventLink";
                }}
                preview
              />
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Upload Cover Image
                </label>
                <Fileinput
                  name="basic"
                  selectedFile={selectedFile2}
                  onChange={handleFileChange2}
                  preview
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Upload Carousel Images
                </label>
                <Fileinput
                  name="basic"
                  selectedFiles={selectedCarousel2}
                  onChange={handleFileChangeMultiple2}
                  multiple
                  preview
                />
              </div>
            </div>
            <div
              className={`w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 `}
            >
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Select Event Status
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={eventActive}
                  defaultInputValue="Active (Event will be listed)"
                  name="eventStatus"
                  onChange={(e) => {
                    handleSelectChange("eventStatus", e);
                  }}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker">
                  Select Event Category
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={categories}
                  name="eventCategory"
                  onChange={(e) => {
                    handleSelectChange("eventCategory", e);
                  }}
                />
              </div>
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker"></label>
              </div>
              <div className="md:w-1/2 w-full px-2 mt-4 flex flex-row justify-end">
                <Button
                  text="Create Event"
                  className="btn-dark"
                  onClick={handleCreateEvent}
                />
              </div>
            </div>
          </div>
        </Card>
        
      </div>
    </>
  );
}
