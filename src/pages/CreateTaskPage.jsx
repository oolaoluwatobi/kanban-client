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
          className="flex flex-col p-8 rounded placeholder:text-xs w-[567px] mx-auto bg-slate-200"
          replace
        >
          <h3 className="text-xl font-semibold">Create Task Section</h3>
          <label className="flex bg-slate100 w-full">
            <h3 className="-mr-4 mt-7 text-sm font-medium">Title</h3>
            <div className="flex flex-col ml-auto w-96">
              <div className="ml16">
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

          <label className="flex bg-slate100">
            <h3 className="mr4 mt-7 text-sm font-medium">Task Description</h3>
            <div className="flex flex-col  w-96 ml-auto">
              <textarea
                className="indent-2 border  border-[#d1d5db] rounded-lg h-40 text-sm text-start p-3 mt-4 placeholder:text-[#4d4d4d] "
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
            <div className="ml-auto mt-4 w-96">
              <button
                disabled={navigation.state === "submitting"}
                className=" text-slate-200 bg-slate-500 text-sm font-semibold mt5 p-2 px-4  rounded"
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
