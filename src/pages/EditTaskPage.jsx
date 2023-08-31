import React, { useEffect } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import api from "../api/server";

export async function loader({ request, params }) {

  try {
    const res = await api.get(`tasks/${params?.id}`, {
      id: `${params.id}`,
    });

    console.log(res, res?.data, "21: Edit...");
    return res?.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const newTask = {
    id: params.id,
    title: formData.get("title"),
    description: formData.get("description"),
  };

  console.log(formData, newTask);

  try {
    const res = await api.put("/tasks", newTask);
    console.log(res.data);

    // Use history.push() to navigate to a different route
    // history.push('/'); // Replace '/' with the desired route
    return res.data, redirect("/");
  } catch (error) {
    return { error, newTask };
  }
}

const EditTaskPage = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  // const history = useHistory(); // Initialize the useHistory hook

  const { error, message, request, response, newTask } = actionData || "";
  const errorMessage = error?.response?.data?.message;

  const navigation = useNavigation();

  console.log(loaderData.title, actionData);
  // console.log(message, error);
  // console.log(newTask, !newTask, !null, (undefined || null));

  useEffect(() => {
    
  }, [loaderData])

  return (
    <div className=" bg-slate-50 rounded-md w-full h-full">
      <div className="pt-2 mx-auto bg-red-30">
        <Form
          method="post"
          className="flex flex-col p-8 rounded placeholder:text-xs w-[567px] mx-auto bg-slate-200"
          replace
        >
        <h3 className="text-xl font-semibold">Edit Task Section</h3>
          <label className="flex bg-slate100 w-full">
            <h3 className="-mr-4 mt-7 text-sm font-medium">Title</h3>
            <div className="flex flex-col ml-auto w-96">
              <div className="ml16">
                <input
                  className="indent-2 border border-[#d1d5db] flex-grow w-full  bg-purple100  rounded-lg p-3 text-sm mt-4 placeholder:text-[#4d4d4d]"
                  type="title"
                  name="title"
                  defaultValue={loaderData?.title}
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
                defaultValue={loaderData?.description}
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

export default EditTaskPage;
