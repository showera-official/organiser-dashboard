import React, { useState } from "react";
import Card from "../../components/ui/Card";
import { Icon } from "@iconify/react";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import Flatpickr from "react-flatpickr";
import Textarea from "@/components/ui/Textarea";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

export default function AddEvent() {
  //States to hold and send data
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedCarousel2, setSelectedCarousel2] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [startDatePicker, setStartDatePicker] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());

  //fucntions to manage file inputs
  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedCarousel2(filesArray);
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const furits = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <div>
        <Card title={"Add New Event"}>
          <div className="w-full px-2 py-1 flex md:flex-row flex-wrap flex-column ">
            <div className="md:w-1/2 px-3 py-1 w-full flex flex-col gap-y-4 ">
              <Textinput
                label="Event Name"
                id="pn"
                type="text"
                placeholder="Add Event Name"
                preview
              />
              <div>
                <Textarea
                  label="Event Description"
                  id="pn4"
                  placeholder="Add Event Description"
                />
              </div>
              <div>
                <Textarea
                  label="Event Address"
                  id="pn4"
                  placeholder="Add Event Address"
                />
              </div>
              <div>
                <label className="form-label" for="hf-picker">
                  Event Carousel Images (Max 5)
                </label>
                <Select
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
                  />
              </div>
              <div>
              <label className="form-label" for="hf-picker">
                  Event Carousel Images (Max 5)
                </label>
                <Select
                    options={State?.getStatesOfCountry(
                      selectedCountry?.isoCode
                    )}
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
              <div>
                <label>
                    Event Carousel Images (Max 5)
                </label>
                <Select
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
              
              {/* <div>
                <label htmlFor=" hh" className="form-label ">
                  Event Country
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={furits[0]}
                  options={furits}
                  styles={styles}
                  id="hh"
                />
              </div>
             
              <div>
                <label htmlFor=" hh" className="form-label ">
                  Event State
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={furits[0]}
                  options={furits}
                  styles={styles}
                  id="hh"
                />
              </div>
              <div>
                <label htmlFor=" hh" className="form-label ">
                  Event City
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={furits[0]}
                  options={furits}
                  styles={styles}
                  id="hh"
                />
              </div> */}

              <div>
                <label className="form-label" for="hf-picker">
                  Event Cover Image
                </label>
                <Fileinput
                  name="basic"
                  selectedFile={selectedFile2}
                  onChange={handleFileChange2}
                  preview
                />
              </div>
              <div>
                <label className="form-label" for="hf-picker">
                  Event Carousel Images (Max 5)
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
            <div className="md:w-1/2 px-3 py-1 w-full flex flex-col gap-y-4">
              <div>
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
              <div>
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
              <div>
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
              <div>
                <label className="form-label" id="timepicker">
                  Event End Time
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
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
