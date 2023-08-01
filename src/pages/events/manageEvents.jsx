import React from "react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import axios from "../../axios";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import { Icon } from "@iconify/react";
import EditEvent from "./EditEvent";
// import loader and use it before rendering the data.
const columns = [
  {
    label: "ID",
    field: "age",
  },
  {
    label: "Event Name",
    field: "first_name",
  },

  {
    label: "Email",
    field: "email",
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
                      <td className="table-td">{field._id}</td>
                      <td className="table-td">{field.event_name}</td>
                      <td className="table-td ">{field.event_start_date}</td>
                      <td className="table-td">
                        <Icon
                          icon="heroicons-outline:information-circle"
                          onClick={() => {
                            <EditEvent field={field} />;
                          }}
                        />
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
