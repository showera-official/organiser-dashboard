import React, { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Icon } from "@iconify/react";
import Tooltip from "@/components/ui/Tooltip";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "../../axios";
// This is a modal to delete an event
function DisableEventModal(props) {
  const id = props.id;

  //function to toggle event status
  const toggleEventStatus = () => {
    axios
      .put(`/event/toggle/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Success");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Modal
        title="Warning"
        label={
          <Tooltip
            title={
              <>
                <Icon
                  icon={props.icon}
                  className="w-5 h-5 text-rose-500 dark:text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer p-0"
                />
              </>
            }
            content="Disable Event"
            placement="top"
            theme="dark"
            className=" dark:text-white hover:text-white dark:hover:text-black p-0"
            arrow
          />
        }
        labelClass=""
        themeClass="bg-danger-500"
        uncontrol
        footerContent={
          <Button
            text="Confirm"
            className="btn-danger "
            onClick={toggleEventStatus}
          />
        }
      >
        <h4 className="font-medium text-lg mb-3 text-slate-900">
          Disable Event
        </h4>
        <div className="mt-3 text-lg font-semibold">{props.name}</div>
        <div className="text-base text-slate-600 dark:text-slate-300">
          <div className="mt-3 text-sm font-thin">
            This action will de-list this event from the website ?
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DisableEventModal;
