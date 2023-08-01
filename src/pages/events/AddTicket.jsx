import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Flatpickr from "react-flatpickr";
import Tooltip from "@/components/ui/Tooltip";
import axios from "../../axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const AddTicket = () => {
  // States for handling fields
  const [fields, setFields] = useState(); // to store all events data
  const [event, setEvent] = useState(); // to store selected event
  const [ticketStartDate, setTicketStartDate] = useState(new Date());
  const [ticketEndDate, setTicketEndDate] = useState(new Date());
  const [formData, setFormData] = useState({
    // to store ticket form data
    ticket_name: "",
    ticket_description: "",
    ticket_price: "",
    ticket_quantity: "",
    ticket_max_purchase: "",
    ticket_start_date: ticketStartDate,
    ticket_end_date: ticketEndDate,
  });

  //React Select element style
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  // API call to get List of all events
  useEffect(() => {
    axios
      .get("/event", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })

      .then((res) => {
        console.log(res.data.data);
        setFields(res.data.data);
      });
  }, []);

  // function to handle changes in ticket form fields
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
      case "event":
        setEvent(value);
        break;
    }
  };

  function handleTicketCreate() {
    axios
      .post(
        "/ticket",
        {
          ticket_name: formData.ticket_name,
          ticket_price: formData.ticket_price,
          ticket_description: formData.ticket_description,
          ticket_quantity: formData.ticket_quantity,
          ticket_start_date: formData.ticket_start_date,
          ticket_end_date: formData.ticket_end_date,
          ticket_max_purchase: formData.ticket_max_purchase,
          event_id: event,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFormData("");
        toast.success("Ticket Added Successfully");
      })
      .catch((err) => console.log(err));

  }
  return (
    <div>
      <Card title="Add Tickets">
        <div className="">
          <div className="px-4">
            <label className="form-label" id="timepicker">
              Choose an Event to add a ticket
            </label>
            <Select
              className="react-select w-full"
              classNamePrefix="select"
              label="Event"
              options={fields}
              value={event}
              getOptionLabel={(option) => option["event_name"]}
              getOptionValue={(option) => option["event_id"]}
              styles={styles}
              onChange={(e) => {
                handleSelectChange("event", e._id);
                console.log(event);
              }}
              id="hh"
              name="event"
            />
          </div>
          <div className="w-full px-2 py-1 flex flex-wrap flex-column ">
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <Textinput
                  label="Ticket Name"
                  id="pn"
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.name = "ticket_name";
                  }}
                  placeholder="Add Ticket Name"
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <Textinput
                  label="Ticket Price"
                  id="pn"
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.name = "ticket_price";
                  }}
                  placeholder="Add Ticket Price"
                />
              </div>
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className=" py-2 px-2 w-full">
                <Textarea
                  label="Ticket Description"
                  id="pn4"
                  placeholder="Add Ticket Description"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.name = "ticket_description";
                  }}
                />
              </div>
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" for="hf-picker">
                  Ticket Start Date
                </label>
                <Flatpickr
                  //   value={eventStartDate}
                  id="hf-picker"
                  className="form-control py-2"
                  onChange={(date) => setTicketStartDate(date)}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" for="hf-picker">
                  Ticket End Date
                </label>
                <Flatpickr
                  //   value={eventEndDate}
                  id="hf-picker"
                  className="form-control py-2"
                  onChange={(date) => setTicketEndDate(date)}
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
                <Textinput
                  label={
                    <div className="flex flex-row items-center">
                      <div className="mr-2">Ticket Quantity</div>
                      <div>
                        <Tooltip
                          title={
                            <>
                              <Icon
                                icon="heroicons-outline:information-circle"
                                className="text-primary-500 w-5 h-5"
                              />
                            </>
                          }
                          content="This is the maximum number of tickets that are available for booking."
                          placement="right"
                          theme="primary"
                          className="text-primary-500"
                          arrow
                        />
                      </div>
                    </div>
                  }
                  id="pn"
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.name = "ticket_quantity";
                  }}
                  placeholder="Add Ticket Quantity"
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <Textinput
                  label={
                    <div className="flex flex-row items-center">
                      <div className="mr-2">Ticket Max Purchase</div>
                      <div>
                        <Tooltip
                          title={
                            <>
                              <Icon
                                icon="heroicons-outline:information-circle"
                                className="text-primary-500 w-5 h-5"
                              />
                            </>
                          }
                          content="This is the maximum number of tickets that can be purchased in one transaction."
                          placement="right"
                          theme="primary"
                          className="text-primary-500"
                          arrow
                        />
                      </div>
                    </div>
                  }
                  id="pn"
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.name = "ticket_max_purchase";
                  }}
                  placeholder="Add Ticket Max Purchase"
                />
              </div>
            </div>
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <label className="form-label" id="timepicker"></label>
              </div>
              <div className="md:w-1/2 w-full px-2 mt-4 flex flex-row justify-end">
                <Button
                  text="Create Ticket"
                  className="btn-dark"
                  onClick={handleTicketCreate}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddTicket;
