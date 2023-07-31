import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Flatpickr from "react-flatpickr";
import Tooltip from "@/components/ui/Tooltip";
import { useForm, useFieldArray } from "react-hook-form";

import Select from "react-select";
const AddTicket = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        test: [{ firstName: "Bill", lastName: "Luo", phone: "123456" }],
      },
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const index = 1;
  const EventStatus = [
    { value: "hidden", label: "Hidden" },
    { value: "waitlist", label: "Waitlist" },
    { value: "published", label: "Published" },
  ];
  const Events = [
    { value: "12365", label: "Event 1" },
    { value: "12366", label: "Event 2" },
    { value: "12367", label: "Event 3" },
  ];
  return (
    <div>
      <Card
        title="Add Tickets"
        // headerslot={

        //     <Select
        //       className="react-select w-full"
        //       classNamePrefix="select"
        //       label="Event"
        //       options={Events}
        //       styles={styles}
        //       id="hh"
        //       name="eventType"
        //     />

        // }
      >
        {/* <form onSubmit={handleSubmit((data) => console.log(data))}>
          {fields.map((item, index) => (
            <div
              className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
              key={index}
            >
              <Textinput
                label="Ticket Name"
                type="text"
                placeholder="Enter Ticket Name"
                register={register}
                name="ticketName"
              />

              <Textinput
                label="Price"
                type="number"
                placeholder="Last Name"
                register={register}
                name="price"
              />

              <div className="flex justify-between items-end space-x-5">
                <div className="flex-1">
                  <Select
                    label="Ticket Status"
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="Select Ticket Status"
                    register={register}
                    name="ticketStatus"
                    options={EventStatus}
                    styles={styles}
                  />
                </div>
                <div className="flex-none relative">
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  >
                    <Icon icon="heroicons-outline:trash" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="ltr:text-right rtl:text-left">
            <Button text="Submit" className="btn-dark" />
          </div>
        </form> */}
        <div className="">
          <div className="px-4">
            <label className="form-label" id="timepicker">
              Choose an Event to add a ticket
            </label>
            <Select
              className="react-select w-full"
              classNamePrefix="select"
              label="Event"
              options={Events}
              styles={styles}
              id="hh"
              name="eventType"
            />
          </div>
          <div className="w-full px-2 py-1 flex flex-wrap flex-column ">
            <div className="w-full  py-1  flex md:flex-row flex-col flex-wrap gap-y-4 ">
              <div className="md:w-1/2 w-full px-2">
                <Textinput
                  label="Ticket Name"
                  id="pn"
                  type="text"
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     e.target.name = "eventName";
                  //   }}
                  placeholder="Add Ticket Name"
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <Textinput
                  label="Ticket Price"
                  id="pn"
                  type="number"
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     e.target.name = "eventName";
                  //   }}
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
                    e.target.name = "eventDescription";
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
                  Ticket End Date
                </label>
                <Flatpickr
                  //   value={eventEndDate}
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
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     e.target.name = "eventName";
                  //   }}
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
                  //   onChange={(e) => {
                  //     handleChange(e);
                  //     e.target.name = "eventName";
                  //   }}
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
                //   onClick={handleCreateEvent}
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
