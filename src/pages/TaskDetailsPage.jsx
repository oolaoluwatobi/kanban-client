import React, { useEffect, useState } from 'react'
import { Form, Link, useActionData, useLoaderData, useNavigation, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import api  from '../api/server'
import { AiFillDelete, AiFillEdit, AiFillHome, AiOutlineEdit } from 'react-icons/ai';
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
  const navigation = useNavigation();
  const  { task }  = useOutletContext()
  const { id } = useParams()

  let status = task === '' ? loaderData.status : task 

  const { _id, title, description } = loaderData
  console.log(loaderData, status, task)

  useEffect(() => {
    console.log(task, id)
    
    // async function getDisplayedTask(id) {
    //   try {
    //     const res = await api.get(`tasks/${id}`, {
    //       id: id,
    //     });
    
    //     setCurrentTask(res?.data?.status)
    //     console.log(res, res?.data, "17: Edit...");
    //     return res?.data?.status;
    //   } catch (error) {
    //     console.log(error.message);
    //     return error;
    //   }
    // }

    // if (id) {
    //   getDisplayedTask(id)
    // }

  }, [task, id])

  return (
    <section className=''>
      <div className='pt-2 mx-auto max-w-sm'>
          <h3
            className={`text-bas capitalize text-center  px-2 py-2 rounded-lg lg: sm:text-xl font-semibold ${
              status === "todo"
                ? "bg-[#e4e4d0] text-[#94a684] "
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
                  className={`flex mt-5 text-sm font-semibold mt5 p4 px4 w-full sm:w-auto rounded-lg   `}
                >

                <Link to={'edit'} className={'flex items-baselin space-x2'}>
                  <p  className={`hover: bg-[#56624a px-5 py-1  my-2  rounded-lg    ${
                    status === "todo"
                      ? "text-[#e4e4d0] bg-[#94a684] "
                      : status === "doing"
                      ? "text-[#f8e8ee] font-bold bg-[#ba90c6]"
                      : "text-[#eee0c9] bg-[#96b6c5] font-bold "
                  }`}>
                  <AiFillEdit className="w-2.5 h-2.5 aspect-square" /> </p>    
                </Link>


                <p className="mx-auto items-center  bg-red-20 my-auto">
                    <Link to={"/"}>
                      <AiFillHome size={24} />
                    </Link>
                  </p>
                
                <Form
                  className="my-auto ml-aut  bg-red-3"
                  method="post"
                  action={`/tasks/${loaderData._id}/destroy`}
                  onSubmit={(event) => {
                    if (!confirm("Please confirm you want to delete this record.")) {
                      event.preventDefault();
                    }
                  }}
                >
                  <div className={` rounded-full px-1 aspect-square -top8 right2 bg-red-10   ${
                    status === "todo"
                      ? "bg-[#e4e4d0] bg-[#94a684 "
                      : status === "doing"
                      ? "bg-[#f8e8ee] font-bold bg-[#ba90c6"
                      : " bg-[#eee0c9] bg-[#96b6c5 font-bold "
                  }`}>
                    <button
                      className=" items-baseline text-rose-400 bg-red-20 h-full "
                      type="submit"
                    >
                      <AiFillDelete size={16} className="" />
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