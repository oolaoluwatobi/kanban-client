import React from 'react'
import { Form, Link, useActionData, useLoaderData } from 'react-router-dom';
import api  from '../api/server'
import { AiFillEdit, AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

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
const TaskDetailsPage = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  console.log(loaderData)
  const { _id, title, description, status  } = loaderData
  
    const renderStatus = (status) => {
      return (
        <h3 className='capitalize text-center'>{status}</h3>
      )
    }
 


  return (
    <section className=''>
      <div className='pt-2 mx-auto max-w-sm'>
          <h3
            className={`text-bas capitalize text-center  px-2 py-2 rounded-lg lg: sm:text-xl font-semibold ${
              status === "todo"
                ? "bg-[#e4e4d0] text-[#94a684]"
                : status === "doing"
                ? "bg-[#f8e8ee] font-bold text-[#ba90c6]"
                : status === "done"
                ? "bg-[#eee0c9] text-[#96b6c5] font-bold "
                : "bg-[#e4e4d0] text-[#94a684]"
            }`}
          >
            {status === "todo" ? "to do" : status}
          </h3>
          <div
            className={`  rounded-lg mt-4 p-3  ${
              status === "todo"
                ? "bg-[#e4e4d0]  text-[#94a684]"
                : status === "doing"
                ? "bg-[#f8e8ee] font-bold text-[#ba90c6]"
                : status === "done"
                ? "bg-[#eee0c9]  text-[#96b6c5] font-bold "
                : "bg-[#e4e4d0] text-[#94a684]"
            }`}
          >
            <h5 className='sm:p2 font-medium'>{title}</h5>
            <p className='sm:p2 text-sm mt-3 font-normal'>{description}</p>
            <div className="flex w-full  bg-red-20">
              <div className=" bg-green-20"></div>
              <div className="ml-auto mt4 w96 w-full  bg-red-20">
                <div
                  disabled={navigation.state === "submitting"}
                  className={`flex mt-5 text-sm font-semibold mt5 p-2 px4 w-full sm:w-auto rounded-lg    ${
                    loaderData.status === "todo"
                      ? "text-[#e4e4d0] bg-[#94a684]"
                      : loaderData.status === "doing"
                      ? "text-[#f8e8ee] font-bold bg-[#ba90c6]"
                      : "text-[#eee0c9] bg-[#96b6c5] font-bold "
                  }`}
                >

                <Link to={'edit'} className='flex items-baselin space-x-2'>
                  <p>Edit task</p>      
                    {/* <AiFillEdit className="w-4 h-4 mr-2 pt- aspect-square" /> */}
                </Link>
                <Form
                  className='my-auto ml-auto bg-red-30'
                  method="post"
                  action={`/tasks/${_id}/destroy`}
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
                    <button className='flex space-x-2 items-baseline text-[] bg-red-20 h-full ' type="submit">Delete
                    {/* <MdDeleteForever size={15} className='ml-2' /> */}
                    </button>
                  </div>
                </Form>

                </div>

              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default TaskDetailsPage