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
          className="flex flex-col  p4 lg:p8 rounded placeholder:text-xs max-w-sm mx-auto bg-slate-20"
          replace
        >
        <h3 className="text-base bg-[#e4e4d0] text-[#94a684] px-2 py-2 rounded-lg lg:text-xl font-semibold">Edit Task </h3>
          <label className=" bg-slate100 w-full bg-red-10">
            <h3 className="  mt-2 text-sm font-medium bg-red-20">Title</h3>
            <div className=" ml-auto max-wsm w-full bg-red-20">
              <div className="ml16  bg-red-30">
                <input
                  className="indent2 border border-[#d1d5db] flex-grow w-full  bg-purple100  rounded-lg p3 text-sm mt4 placeholder:text-[#4d4d4d]"
                  type="title"
                  name="title"
                  defaultValue={loaderData?.title}
                  placeholder="title"
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
            <h3 className="mr4 mt7 text-sm font-medium  bg-red-20">Task Description</h3>
            <div className="  max-wsm w-full ml-auto  bg-red-20">
              <textarea
                className="indent2 border  border-[#d1d5db] rounded-lg h20 text-sm text-start p3 mt4 w-full placeholder:text-[#4d4d4d] "
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
            <div className=" bg-green-20"></div>
            <div className="ml-auto mt4 w96 w-full">
              <button
                disabled={navigation.state === "submitting"}
                className=" text-slate-200 bg-slate-500 text-sm font-semibold mt5 p2 px4 w-full sm:w-auto rounded"
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
