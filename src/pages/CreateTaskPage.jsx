import React from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import api from "../api/server";

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

    // Use history.push() to navigate to a different route
    // history.push('/'); // Replace '/' with the desired route
    return res.data, redirect("/");
  } catch (error) {
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
    <div className=" bg-slate-50 rounded-md w-full h-full">
      <div className="pt-2 mx-auto bg-red-30">
        <Form
          method="post"
          className="flex flex-col  p-4 lg:p-8 rounded placeholder:text-xs max-w-[567px] mx-auto bg-slate-200"
          replace
        >
          <h3 className=" lg:text-xl font-semibold">Create Task</h3>
          <label className="lg:flex bg-purple-20 w-full">
            <h3 className="  mr-[3.60rem] lg:-mr4 mt-7 text-sm font-medium   bg-red-20">Title</h3>
            <div className="flex flexx-1 lg:flex-col ml-auto max-wsm w-full">
              <div className="ml16  w-full  bg-green-20">
                <input
                  className="indent-2 border border-[#d1d5db] flex-grow w-full  bg-purple100  rounded-lg p-3 text-sm mt-4 placeholder:text-[#4d4d4d]"
                  type="title"
                  name="title"
                  defaultValue=""
                  placeholder="title"
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

          <label className="lg:flex bg-slate100  bg-purple-20 w-full">
            <h3 className="mr4 mt-7 text-sm font-medium">Task Description</h3>
            <div className="lg:fle lg:flex-co  w-full ml-auto ">
              <textarea
                className="indent-2 border  border-[#d1d5db] rounded-lg lg:h-40 text-sm text-start p-3 mt-4 placeholder:text-[#4d4d4d] w-full"
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
            <div className="ml-auto mt-4 w96 w-full  bg-red-200">
              <button
                disabled={navigation.state === "submitting"}
                className=" text-slate-200 bg-slate-500 text-sm font-semibold mt5 p-2 px-4 w-full rounded"
              >
                {navigation.state === "submitting" ? "Saving..." : "Save"}
              </button>
              {/* <button
                // disabled={navigation.state === "submitting"}
                className=" text-red-500 bg-indigo-100 text-sm font-semibold ml-5 p-2 px-4  rounded"
                >
                {navigation.state === "submitting"
                  ? "Saving..."
                  : "Cancel"}
              </button> */}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
