import React from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import api from "../api/server";
import { toast } from "react-hot-toast";

export async function loader({ request }) {
  console.log(request);
  const data = new URL(request.url).searchParams.get("message");
  return { data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const newTask = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  console.log(formData, newTask);

  try {
    const res = await api.post("tasks", newTask);
    console.log(res.data);
    toast.success(`New Task with Title: ${newTask.title.substring(0, 10) + "..."} Created successfully`)
    // Use history.push() to navigate to a different route
    // history.push('/'); // Replace '/' with the desired route
    return res.data, redirect("/");
  } catch (error) {
    toast.success(`New Task with Title: ${newTask.title.substring(0, 10) + "..."} creation failed`)
    return { error, newTask };
  }
}

const CreateTaskPage = () => {
  const actionData = useActionData();

  // const history = useHistory(); // Initialize the useHistory hook

  const { error, message, request, response, newTask } = actionData || "";
  const errorMessage = error?.response?.data?.message;

  const navigation = useNavigation();

  const loaderData = useLoaderData();
  // console.log(loaderData, actionData);
  // console.log(message, error);
  // console.log(newTask, !newTask, !null, (undefined || null));

  return (
    <div className=" bg-slate-5 p-10 rounded-md w-ful h-full">
      <div className="pt2 mx-auto bg-red-30">
        <Form
          method="post"
          className="flex flex-col  p4 lg:p8 rounded-lg placeholder:text-xs max-w-sm mx-auto bg-slate-20"
          replace
        >
          <h3 className=" lg:text-xl bg-[#e4e4d0] text-[#94a684] mt-2 p-3 rounded-lg  font-bold">Create Task</h3>

          <div className="bg-red-5 bg-[#e4e4d0] rounded-lg mt-4 p-4">
              
            <label className="   w-full">
              <h3 className="  my-1  text-sm font-medium text-[#94a684]  bg-red-20">Task Title</h3>
              <div className=" ml-auto max-wsm w-full">
                <div className="ml16  w-full  bg-green-20">
                  <input
                    className="indent-2 border border-[#94a684]  w-full  bg-purple100  rounded-lg p-1 m1 text-sm mt4 placeholder:text-[#94a684   ring-[#94a684]  ring-offset2 ring-2 focus:ring"
                    type="title"
                    name="title"
                    defaultValue=""
                    placeholder="Task title"
                  />
                  {newTask &&
                    (newTask?.title ? (
                      <small>{newTask?.title}</small>
                    ) : (
                      <small className="text-red-500 text-xs mt-1">
                        title is required
                      </small>
                    ))}
                </div>
              </div>
            </label>

            <label className="lg:flex bg-slate100  bg-[#e4e4d0]   w-full">
              <div className="lg:fle lg:flex-co  w-full ml-auto ">
              <h3 className="py-1 mt-4 text-[#94a684] text-sm font-medium">Task Description</h3>
                <textarea
                  className="indent-2 border  border-[#94a684] rounded-lg lg:h-20 text-sm text-start py-1 mt4 placeholder:text-[#94a684] focus: focus: ring-[#94a684]  ring-offset2 ring-2 focus:ring w-full"
                  type="text-area"
                  name="description"
                  defaultValue=""
                  placeholder="Task description"
                />
                {newTask &&
                  (newTask?.description ? (
                    <small>{newTask?.description}</small>
                  ) : (
                    <small className="text-red-500 text-xs mt-1">
                      description is required
                    </small>
                  ))}
              </div>
            </label>

            <div className="flex">
              <div className=" bg-green-200"></div>
              <div className="ml-aut mt-5 w96 w-full  bg-red-20">
                <button
                  disabled={navigation.state === "submitting"}
                  className=" text-slate-20 bg-slate-5  bg-[#94a684]  opacity-80 hover:opacity-100   text-[#e4e4d0] text-sm font-semibold mt5 p-2 px4 w-full rounded-lg"
                >
                  {navigation.state === "submitting" ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
