import React, { useEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import api from "../api/server";
import { AiFillHome } from "react-icons/ai";

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

  console.log(loaderData.title, loaderData.status);
  // console.log(message, error);
  // console.log(newTask, !newTask, !null, (undefined || null));

  const loaderDataArr = [loaderData.title, loaderData.status]
  
  useEffect(() => {
    console.log(loaderData.status);
  }, [loaderData]);

  return (
    <div className=" bg-slate-50 rounded-md w-full h-full" key={loaderData.status}>
      <div className="pt-2 mx-auto bg-red-30">
        <Form
          method="post"
          className="flex flex-col  p4 lg:p8 rounded placeholder:text-xs max-w-sm mx-auto bg-slate-20"
          replace
        >
          <h3
            className={`text-base   px-4 py-2 rounded-lg lg:text-xl font-semibold ${
              loaderData.status === "todo"
                ? "bg-[#e4e4d0] text-[#94a684]"
                : loaderData.status === "doing"
                ? "bg-[#f8e8ee] font-bold text-[#ba90c6]"
                : loaderData.status === "done"
                ? "bg-[#eee0c9] text-[#96b6c5] font-bold "
                : "bg-[#e4e4d0] text-[#94a684]"
            }`}
          >
            Edit Task{" "}
          </h3>

          <div
            className={`  rounded-lg mt-4 p-4  ${
              loaderData.status === "todo"
                ? "bg-[#e4e4d0]  text-[#94a684]"
                : loaderData.status === "doing"
                ? "bg-[#f8e8ee] font-bold text-[#ba90c6]"
                : loaderData.status === "done"
                ? "bg-[#eee0c9]  text-[#96b6c5] font-bold "
                : "bg-[#e4e4d0] text-[#94a684]"
            }`}
          >
            <label className=" bg-slate100 w-full bg-red-10">
              <h3 className="  my-1  text-sm font-medium text-[#94a684  bg-red-20">
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
                    loaderData.status === "todo"
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
              <div className=" bg-green-200 h-2"></div>
              <div 
                  className={`flex items-baseline mt-2 text-sm font-semibold mt5 p-2 px4 w-full sm:w-auto rounded-lg  bg-red-200   ${
                    loaderData.status === "todo"
                      ? "text-[#e4e4d0] bg-[#94a684]"
                      : loaderData.status === "doing"
                      ? "text-[#f8e8ee] font-bold bg-[#ba90c6]"
                      : "text-[#eee0c9] bg-[#96b6c5] font-bold "
                  }`}>
                <button
                  disabled={navigation.state === "submitting"}
                >
                  {navigation.state === "submitting" ? "Saving..." : "Save"}
                </button>
 
                <Form
                  className='my-auto ml-auto bg-red-30'
                  method="post"
                  action={`/tasks/${loaderData._id}/destroy`}
                  onSubmit={(event) => {
                    if (
                      !confirm(
                        "Please confirm you want to delete this record."
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <div className="">
                    <button className=' items-baseline text-[] bg-red-20 h-full ' type="submit">Delete
                    </button>
                  </div>
                </Form>

                
                <p className="ml-auto  bg-red-20 my-auto">
                  <Link to={'/'}>
                    <AiFillHome size={15} />
                  </Link>
                </p>
                
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditTaskPage;
