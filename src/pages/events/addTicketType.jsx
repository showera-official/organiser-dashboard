import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "@/components/ui/Select";
const AddTicketType = () => {
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
  return (
    <div>
      <Card
        title="Add Tickets"
        headerslot={
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            className="btn-dark"
            onClick={() => append()}
          />
        }
      >
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                    classNameprefix="select"
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
        </form>
      </Card>
    </div>
  );
};

export default AddTicketType;
