import React, { useState, Fragment } from "react";
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
import AddTicketType from "./addTicketType";

export default function AddEvent() {
  //States to hold and send data
  const [picker, setPicker] = useState(new Date());
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedCarousel2, setSelectedCarousel2] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [startDatePicker, setStartDatePicker] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());
  const [eventType, setEventType] = useState("");
  const [hiddenVenue, setHiddenVenue] = useState("");
  const [linkArea, setLinkArea] = useState("hidden");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  //fucntions to manage file inputs
  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedCarousel2(filesArray);
  };

  const handleSelectChange = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "eventType":
        setEventEndTime(value);
        break;
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

  return (
    <>
      <div>
        <Card title={"Add New Event"}>
          <div className=" py-2 px-4 w-full">
            <Textinput
              label="Event Name"
              id="pn"
              type="text"
              placeholder="Add Event Name"
              preview
            />
          </div>
          <div className=" py-2 px-4 w-full">
            <Textarea
              label="Event Description"
              id="pn4"
              placeholder="Add Event Description"
            />
          </div>
          <div className="w-full px-2 py-1 flex flex-wrap flex-column ">
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" for="hf-picker">
                  Event Start Date
                </label>
                <Flatpickr
                  value={startDatePicker}
                  id="hf-picker"
                  className="form-control py-2"
                  onChange={(date) => setPicker(date)}
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
                  value={startDatePicker}
                  id="hf-picker"
                  className="form-control py-2"
                  onChange={(date) => setPicker(date)}
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
                  onChange={(date) => setBasic(date)}
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
                  onChange={(date) => setBasic(date)}
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
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker"></label>
              </div>
              <div className="md:w-1/2 w-full px-2 mt-4 flex flex-row justify-end">
                <Button text="Create Event" className="btn-dark" />
              </div>
            </div>
          </div>
        </Card>
        <div className="my-4">

          <AddTicketType/>
        </div>
      </div>
    </>
  );
}
