import React from "react";
import { redirect, useActionData } from "react-router-dom";

import api from "../api/server";
import { toast } from "react-hot-toast";

export async function action({ request, params }) {
  // throw new Error("oh dang!")
  const item = { "id": params.id }
  console.log(params.id, item)
  try {
    // const res = await api.delete(`/tasks`, {
    //   id: `${params.id}`
    // });
    const res = await api.delete(`/tasks/${params.id}`, item);


    console.log(res, res?.data, "15: Subs...");
    toast.success('Task Deleted successfully')
    return redirect("/");
  } catch (error) {
    console.log(error.message);
    toast.success('Task Delete Fail')
    return error, redirect("/");
  }
}

const Destroy = () => {
  const data = useActionData();
  console.log(data);
  return <div>Destroy</div>;
};

export default Destroy;
