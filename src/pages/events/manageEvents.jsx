import React from "react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import axios from "../../axios";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import { Icon } from "@iconify/react";
import EditEvent from "./EditEvent";
import { Link } from "react-router-dom";
import Tooltip from "@/components/ui/Tooltip";
import DisableEventModal from "./DisableEventModal";

// import loader and use it before rendering the data.
const columns = [
  {
    label: "Event Name",
    field: "event_name",
  },
  {
    label: "Event Created On",
    field: "first_name",
  },

  {
    label: "Event Status",
    field: "event_is_active",
  },
  {
    label: "Action",
    field: "action",
  },
];
const rows = tableData.slice(0, 7);

export default function manageEvents() {
  const [field, setFields] = useState(null);
 
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




  return !field ? (
    <Loading />
  ) : (
    <>
      <Card title="Manage Your Events" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((field, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {field.map((field, _id) => (
                    <tr
                      key={_id}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{field.event_name}</td>
                      <td className="table-td">{field.createdAt.split("T")[0]}</td>
                      <td className="table-td ">
                      <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              field.event_is_active === 1
                ? "text-success-500 bg-success-500"
                : ""
            } 
            ${
             field.event_is_active === 0
                ? "text-warning-500 bg-warning-500"
                : ""
            }
           
            
             `}
          >
            {field.event_is_active === 1 ? "Active" : "Disabled"}
          </span>
        </span>
                      </td>
                      <td className="table-td">
                        <div className="flex flex-row gap-x-1 align-middle">
                          <div className="w-1/2 justify-center">
                            <Link to={`/editevent/${field._id}`}>
                              <Tooltip
                                title={
                                  <>
                                    <Icon
                                      icon="heroicons-outline:pencil"
                                      className="w-5 h-5 text-slate-800 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                                    />
                                  </>
                                }
                                content="Edit"
                                placement="top"
                                theme="dark"
                                className=" dark:text-white hover:text-white dark:hover:text-black"
                                arrow
                              />
                            </Link>
                          </div>
                          <div className="w-1/2">
                            <DisableEventModal
                              id={field._id}
                              name={field.event_name}
                          icon={field.event_is_active == 1? "heroicons-outline:bookmark" : "heroicons-outline:bookmark-slash"}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
