import React, { useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
import api from "../api/server";
import { AiFillDelete, AiFillHome } from "react-icons/ai";
import StatusFetcher from "../components/StatusFetcher";
import { MdCancel } from "react-icons/md";
import {FaSave} from "react-icons/fa"
import { toast } from "react-hot-toast";

export async function loader({ request, params }) {
  try {
    const res = await api.get(`tasks/${params?.id}`, {
      id: `${params.id}`,
    });

    console.log(res, res?.data, "17: Edit...");
    return res?.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(params, formData);
  const newTask = {
    id: params.id,
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  };

  console.log(formData, newTask);

  try {
    const res = await api.put("/tasks", newTask);
    console.log(res.data);
    toast.success(`Task with Title: ${newTask.title.substring(0, 10) + "..."} Edited successfully`)

    // Use history.push() to navigate to a different route
    // history.push('/'); // Replace '/' with the desired route
    return res.data, redirect("/");
  } catch (error) {
    toast.error(`Task with Title:  ${newTask.title.substring(0, 10) + "..."} Edit Failed`)
    return { error, newTask };
  }
}

const EditTaskPage = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const {task} = useOutletContext();


  
  const taskStatus = task === '' ? loaderData.status : task 
  // const history = useHistory(); // Initialize the useHistory hook

  const { error, message, request, response, newTask } = actionData || "";
  const errorMessage = error?.response?.data?.message;

  const navigation = useNavigation();

  useEffect(() => {

  }, [])

  return (
    <div className=" bg-slate-10 rounded-md w-full h-full" key={task}>
      <div className="pt-2 mx-auto bg-red-30 flex flex-col  p4 lg:p8 rounded placeholder:text-xs max-w-sm  bg-slate-20">
        <h3
          className={`text-base   px-4 py-2 rounded-lg lg:text-xl font-semibold ${
            taskStatus === "todo"
              ? "bg-[#e4e4d0] text-[#94a684]"
              : taskStatus === "doing"
              ? "bg-[#f8e8ee] font-bold text-[#ba90c6]"
              : task === "done"
              ? "bg-[#eee0c9] text-[#96b6c5] font-bold "
              : "bg-[#e4e4d0] text-[#94a684]"
          }`}
        >
          Edit Task{" "}
        </h3>

        <div
          className={`  rounded-lg mt-4 p-4  ${
            taskStatus === "todo"
              ? "bg-[#e4e4d0]  text-[#94a684]"
              : taskStatus === "doing"
              ? "bg-[#f8e8ee] font-bold text-[#ba90c6]"
              : taskStatus === "done"
              ? "bg-[#eee0c9]  text-[#96b6c5] font-bold "
              : "bg-[#e4e4d0] text-[#94a684]"
          }`}
        >
          <Form method="post" className="" replace>
            <div>
              <label className=" bg-slate100 w-full bg-red-10">
                <h3 className="  mb-2   text-sm font-medium text-[#94a684  bg-red-20">
                  Task Title
                </h3>
                <div className=" ml-auto max-wsm w-full bg-red-20">
                  <div className="ml16  bg-red-30">
                    <input
                      key={`title-${loaderData.title}`}
                      className={` border-[#94a684]  w-full  rounded-lg p-2 text-sm    ring-[#94a684]  ring-offset2 ring-2 focus:ring  ${
                        loaderData.status === "todo"
                          ? " ring-[#94a684]"
                          : loaderData.status === "doing"
                          ? " font-bold ring-[#ba90c6]"
                          : loaderData.status === "done"
                          ? " ring-[#96b6c5] font-bold "
                          : " ring-[#94a684]"
                      }`}
                      type="title"
                      name="title"
                      defaultValue={loaderData.title}
                      placeholder="Task title"
                    />
                    {newTask &&
                      (newTask?.title ? (
                        <small>{newTask?.title}</small>
                      ) : (
                        <small className="text-red-500 text-xs mt1">
                          title is required
                        </small>
                      ))}
                  </div>
                </div>
              </label>

              <label className=" bg-slate100  w-full bg-red-10">
                <h3 className="py-1 mt-2 text-[#94a684 text-sm font-medium">
                  Task Description
                </h3>
                <div className="  max-wsm w-full ml-auto  bg-red-20">
                  <textarea
                    key={`title-${loaderData.description}`}
                    className={` border-[#94a684]  w-full  rounded-lg p-2 text-sm    ring-[#94a684]  ring-offset2 ring-2 focus:ring   ${
                      task === "todo"
                        ? " ring-[#94a684]"
                        : loaderData.status === "doing"
                        ? " font-bold ring-[#ba90c6]"
                        : loaderData.status === "done"
                        ? " ring-[#96b6c5] font-bold "
                        : " ring-[#94a684]"
                    }`}
                    type="text-area"
                    name="description"
                    defaultValue={loaderData?.description}
                    placeholder="Task description"
                  />
                  {newTask &&
                    (newTask?.description ? (
                      <small>{newTask?.description}</small>
                    ) : (
                      <small className="text-red-500 text-xs mt1">
                        description is required
                      </small>
                    ))}
                </div>
              </label>

              <div className="flex">
                <div
                  className={`flex items-baseline mt-6 text-sm font-semibold  w-full sm:wauto rounded-lg  bg-red-20   `}
                >
                  <button disabled={navigation.state === "submitting"} className={`px-5 py-1 rounded-lg ${
                    task === "todo"
                      ? "text-[#e4e4d0 text-[#94a684]"
                      : task === "doing"
                      ? "text-[#f8e8ee font-bold text-[#ba90c6]"
                      : "text-[#eee0c9 text-[#96b6c5] font-bold "
                  }`}>
                    {navigation.state === "submitting" ? 
                <div className={`animate-spin rounded-full h-5 w-5 border-b-4 border-slate-60  ${
                  task === "todo"
                    ? "text-[#e4e4d0 border-[#94a684]"
                    : task === "doing"
                    ? "text-[#f8e8ee font-bold border-[#ba90c6]"
                    : "text-[#eee0c9 border-[#96b6c5] font-bold "
                }`}></div> : <FaSave size={24} />}
                  </button>

                  {/* <p className="mx-auto items-center  bg-red-20 my-auto">
                    <Link to={"/"}>
                      <AiFillHome size={24} />

                    </Link>
                  </p> */}
                </div>
              </div>
            </div>
          </Form>
          <Form
            className="my-auto ml-auto relative bg-red-3"
            method="post"
            action={`/tasks/${loaderData._id}/destroy`}
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <div className="absolute rounded-full px-1.5 aspect-square -top-8 right-2 bg-red-10">
              <button
                className=" items-baseline text-rose-400 bg-red-20 h-full "
                type="submit"
              >
                <MdCancel size={24} className="" />
              </button>
            </div>
          </Form>
          {/* <StatusFetcher resData={} /> */}
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
