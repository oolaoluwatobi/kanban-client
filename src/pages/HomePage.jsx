import React, { useEffect, useState } from "react";
import { Form, Link, redirect, useOutletContext, Outlet } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md"
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai"
import api from '../api/server'

const HomePage = () => {
  const {resData} = useOutletContext()

  const [todo, setTodo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])
  const [dropDown, seDropDone] = useState(false)
  // console.log(resData)

  function handleOnDrag(e, id) {
    e.dataTransfer.setData("widgetId", id)

    console.log(id)
  }

  function handleOnDrop(e, category) {
    const widgetId = e.dataTransfer.getData("widgetId")
    const pickedTask = resData.find(task => task._id === widgetId)
    console.log("widgetId", widgetId, category, pickedTask)
    if (widgetId && pickedTask) {
     async function editTaskStatus(currentId, task) {
       const item = { id: currentId, status: task  }
       console.log(currentId, item)
       try {
         // const res = await api.delete(`/tasks`, {
         //   id: `${params.id}`
         // });
         const res = await api.put(`/tasks`, item);
     
     
         console.log(res, res?.data, "92: Subs...");
         return redirect("/");
       } catch (error) {
         console.log(error.message);
         return error, redirect("/");
       }
 
     } 
     editTaskStatus(widgetId, category)
    }
    

    if (pickedTask) {
      if (category === "todo") {
        const newTodo = todo.filter(task => task._id !== widgetId)
        setTodo([...newTodo, pickedTask]);
        const newDoing = doing.filter(task => task._id !== widgetId)
        setDoing([...newDoing])
        const newDone = done.filter(task => task._id !== widgetId)
        setDone([...newDone])
      } else if (category === "doing") {
        const newTodo = todo.filter(task => task._id !== widgetId)
        setTodo([...newTodo])
        const newDoing = doing.filter(task => task._id !== widgetId)
        setDoing([...newDoing, pickedTask]);
        const newDone = done.filter(task => task._id !== widgetId)
        setDone([...newDone])
      } else if (category === "done") {
        const newTodo = todo.filter(task => task._id !== widgetId)
        setTodo([...newTodo])
        const newDoing = doing.filter(task => task._id !== widgetId)
        setDoing([...newDoing])
        const newDone = done.filter(task => task._id !== widgetId)
        setDone([...newDone, pickedTask]);
      }
    }

    
    
    // if(category === "todo") {
    //   const newTasks = todo.map(task => {

    //   })
    //   setTodo([...todo, pickedTask])
    //   setDoing()
    // }

  }

  function handleDragOver(e) { 
    e.preventDefault();
    console.log("dragover")
  }

  // console.log(todo)
  // console.log(doing)
  // console.log(done)

  useEffect(() => {
    setTodo(resData.filter(task => task.status === 'todo'))
    setDoing(resData.filter(task => task.status === 'doing'))
    setDone(resData.filter(task => task.status === 'done'))
  }, [resData])

  // useEffect(() => {
  //  if (currentWidgetId && currentTask) {
  //   async function editTaskStatus(currentId, task) {
  //     const item = { id: currentId, status: task  }
  //     console.log(currentId, item)
  //     try {
  //       // const res = await api.delete(`/tasks`, {
  //       //   id: `${params.id}`
  //       // });
  //       const res = await api.put(`/tasks`, item);
    
    
  //       console.log(res, res?.data, "92: Subs...");
  //       return redirect("/");
  //     } catch (error) {
  //       console.log(error.message);
  //       return error, redirect("/");
  //     }

  //   } 
  //   editTaskStatus(currentWidgetId, currentTask)
  //  }

  // }, [currentWidgetId])
  
  const renderToDo = todo.map(task => {
    const truncatedTask = task.description.length > 32
      ? task.description.substring(0, 32) + "..."
      : task.description;
    return (
      <div key={task._id} draggable onDragStart={(e) => handleOnDrag(e, task._id)}  className="bg-[#ffeadd] rounded-lg px2 pt-1 mb-2 cursor-grab fle grid grid-cols-3 sm:grid-cols-10">
        <div className="text-inherit bg-red-5 px-1 col-span-7 ">
          <h3 className="mt-1 text-xs lg:text-sm group font-semibold">{task.title}</h3>
          <p className="text-[0.675rem] lg:text-xs  group-hover:hidden ">{truncatedTask} </p>
        </div>
        <div className="m2 mt-1 px-2 py-1  lg:mt-0 flex justify-betwee w-full lg: col-span-3 sm:col-span-3  bg-[#94a684]  text-[#ffeadd] rounded-lg  bg-red-20"> 
          <div className="p1 rounded-full  bg-whit ">
            <Link to={`/tasks/${task._id}/edit`}>
                <p className="text-[0.675rem] hover:underline">View task</p>
            </Link>
          </div>
          <div className="p-1 cursor-pointer rounded-full bg-[#aec3ae] ml-auto">
            <Link to={`/tasks/${task._id}/edit`}>
                <AiOutlineEdit className="w-2.5 h-2.5 aspect-square" /> 
            </Link>
          </div>

          {/* <Form
            className='my-auto ml-auto col-span-3 h-full bg-red-300'
            method="post"
            action={`/tasks/${task._id}/destroy`}
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
              <button className='my-auto ml-auto text-[] bg-red-400 h-full ' type="submit"><MdDeleteForever /></button>
            </div>
          </Form> */}

        </div>
      </div>
    )
  })
  const todoCount = todo.length
   
  const renderDoing = doing.map(task => {

    const truncatedTask = task.description.length > 32
      ? task.description.substring(0, 32) + "..."
      : task.description;

    return (
      <div key={task._id} draggable onDragStart={(e) => handleOnDrag(e, task._id)}  className="bg-[#f8e8ee] rounded-lg px2 p-1 mb-2 cursor-grab fle grid grid-cols-3 lg:grid-cols10">
        <div className="text-inherit bg-red-5 px-1 col-span-8 ">
          <h3 className="mt-1 text-xs lg:text-sm group font-semibold">{task.title}</h3>
          <p className="text-[0.675rem] lg:text-xs  group-hover:hidden ">{truncatedTask} </p>
        </div>
        <div className="m2 mt-1 px-2 py-1  lg:mt-0 flex lg:bloc justify-betwee w-full lg: col-span-3 lg:col-span2  bg-[#f2bed1]  text-[#f9f5f6] rounded-lg  bg-red-20"> 
          <div className="p1 rounded-full  bg-whit ">
            <Link to={`/tasks/${task._id}/edit`}>
              {/* <AiOutlineEye className="hidden lg:block" /> */}
              <p className="text-[0.675rem] hover:underline lg:hidde">View task</p>
            </Link>
          </div>
          <div className="lg:p1 cursor-pointer rounded-full lg:bg-[#fee8ee ml-auto">
            <Link to={`/tasks/${task._id}/edit`}>
                {/* <AiOutlineEdit className="w-2.5 h-2.5 text-[#f2bed1] aspect-square hidden lg:block" /> */}
              <p className="text-[0.675rem] text-[#f2bed1 hover:underline lg:hidde">Edit task</p>
            </Link>
          </div>

          {/* <Form
            className='my-auto ml-auto col-span-3 h-full bg-red-300'
            method="post"
            action={`/tasks/${task._id}/destroy`}
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
              <button className='my-auto ml-auto text-[] bg-red-400 h-full ' type="submit"><MdDeleteForever /></button>
            </div>
          </Form> */}

        </div>
      </div>
    )
  })
  const doingCount = doing.length
   
  const renderDone = done.map(task => {

    const truncatedTask = task.description.length > 32
      ? task.description.substring(0, 32) + "..."
      : task.description;

    return (
      <div key={task._id} draggable onDragStart={(e) => handleOnDrag(e, task._id)}  className="bg-[#eee0c9] rounded-lg px2 p-1 mb-2 cursor-grab fle grid grid-cols-3 lg:grid-cols10">
        <div className="text-[[#96b6c5]] text- bg-red-5 px1 col-span-7 ">
          <h3 className="mt-1 text-xs lg:text-sm group font-semibold">{task.title}</h3>
          <p className="text-[0.675rem] lg:text-xs  group-hover:hidden ">{truncatedTask} </p>
        </div>
        <div className="m2 mt-2 px-2 py-1 h-auto lg:mt0 flex  justify-betwee w-full lg: col-span-3  bg-[#96b6c5]  text-[#ffeadd] rounded-lg  bg-red-20"> 
          <div className="p1 rounded-full  bg-whit ">
            <Link to={`/tasks/${task._id}/edit`}>
                <p className="text-[0.675rem] hover:underline">View task</p>
            </Link>
          </div>
          <div className="p-1 cursor-pointer rounded-full bg-[#adc4ce] ml-auto">
            <Link to={`/tasks/${task._id}/edit`}>
                <AiOutlineEdit className="w-2.5 h-2.5 aspect-square" /> 
            </Link>
          </div>

          {/* <Form
            className='my-auto ml-auto col-span-3 h-full bg-red-300'
            method="post"
            action={`/tasks/${task._id}/destroy`}
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
              <button className='my-auto ml-auto text-[] bg-red-400 h-full ' type="submit"><MdDeleteForever /></button>
            </div>
          </Form> */}

        </div>
      </div>
    )
  })
  const doneCount = done.length
  
  return (
    <section className="w-full h-auto  bg-slate-10 bg-red-20  px4 lg:px-10   font-[Poppins">
      <Outlet />
      <div className="w-full grid grid-cols-3 px-2 gap-2 lg:gap-4 mt-10  max-w-4xl mx-auto">
        <div className="col-span-1 space-y-2 h-96 " onDrop={(e) => handleOnDrop(e, "todo")} onDragOver={handleDragOver}>
          <h2 className=" bg-[#e4e4d0] text-[#94a684] mb-2 px-2 py-2 rounded-lg  font-bold">To Do <span className="bg-[#ffeef4] font-bold text-whit rounded-full px-1.5 text-sm ml-2">{todoCount}</span></h2>
          <div className="hover: bg-[#ffeef4] pb-20 rounded">
            {renderToDo}
          </div>
        </div>
        <div className="col-span-1 space-y-2 h-96" onDrop={(e) => handleOnDrop(e, "doing")} onDragOver={handleDragOver}>
          <h2  className=" bg-[#f8e8ee] font-bold text-[#f2bed1] mb-2 px-2 py-2 rounded-lg">Doing <span className="bg-[#f9f5f6] font-bold rounded-full px-1.5 text-sm ml-2">{doingCount}</span></h2>
          <div className="hover: bg-[#f9f5f6]  pb-20 rounded">
            {renderDoing}
          </div>
        </div>
        <div className="col-span-1 space-y-2 h-96" onDrop={(e) => handleOnDrop(e, "done")} onDragOver={handleDragOver}>
          <h2  className=" bg-[#eee0c9] text-[#96b6c5] font-bold mb-2 px-2 py-2 rounded-lg">Done <span className="bg-[#f1f0e8] font-bold rounded-full px-1.5 text-sm ml-2">{doneCount} </span></h2>
          <div className="hover: bg-[#f1f0e8] pb-20 rounded">
            {renderDone}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
