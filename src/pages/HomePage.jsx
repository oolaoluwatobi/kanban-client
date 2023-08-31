import React, { useEffect, useState } from "react";
import { Form, Link, redirect, useOutletContext, Outlet } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"
import api from '../api/server'

const HomePage = () => {
  const {resData} = useOutletContext()
  const [todo, setTodo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])
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
    return (
      <div key={task._id} draggable onDragStart={(e) => handleOnDrag(e, task._id)}  className="bg-red-200 rounded px-2 py-1 mb-2 flex cursor-grab">
        <div className="text-inherit">
          <h3 className="text-sm  font-semibold">Title: {task.title}</h3>
          <p className="text-xs">Description: {task.description} </p>
        </div>
        <Form
          className='my-auto ml-auto'
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
          <div>
            <Link to={`/tasks/${task._id}/edit`}>
              <button><AiOutlineEdit /> </button>
            </Link>
          </div>
            <button className='my-auto ml-auto text-red-900 ' type="submit"><MdDeleteForever /></button>
        </Form>
      </div>
    )
  })
  const todoCount = todo.length
   
  const renderDoing = doing.map(task => {
    return (
      <div key={task._id} draggable onDragStart={(e) => handleOnDrag(e, task._id)} className="bg-indigo-200 rounded px-2 py-1 mb-2 flex  cursor-grab ">
        <div className="">
          <h3 className="text-sm font-semibold">Title: {task.title}</h3>
          <p className="text-xs">Description: {task.description} </p>
        </div>
        <Form
          className='my-auto ml-auto'
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
        <div>
          <Link to={`/tasks/${task._id}/edit`}>
            <button><AiOutlineEdit /> </button>
          </Link>
        </div>
          <button className='my-auto ml-auto text-yellow-900 ' type="submit"><MdDeleteForever /></button>
        </Form>
      </div>
    )
  })
  const doingCount = doing.length
   
  const renderDone = done.map(task => {
    return (
      <div key={task._id} draggable  onDragStart={(e) => handleOnDrag(e, task._id)}  className="bg-emerald-300 rounded px-2 py-1 mb-2 flex  cursor-grab">
        <div className="">
          <h3 className="text-sm font-semibold">Title: {task.title}</h3>
          <p className="text-xs">Description: {task.description} </p>
        </div>
        <Form
          className='my-auto ml-auto'
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
        <div>
          <Link to={`/tasks/${task._id}/edit`}>
            <button><AiOutlineEdit /> </button>
          </Link>
        </div>
          <button className='my-auto ml-auto text-emerald-900 ' type="submit"><MdDeleteForever /></button>
        </Form>
      </div>
    )
  })
  const doneCount = done.length
  
  return (
    <section className="w-full min-h-screen bg-slate-100 px-10">
      <Outlet />
      <div className="w-full grid grid-cols-3 gap-4 mt-10">
        <div className="col-span-1 space-y-2 h-96 " onDrop={(e) => handleOnDrop(e, "todo")} onDragOver={handleDragOver}>
          <h2 className=" bg-rose-500 text-whit mb-2 px-2 py-2 rounded">To Do <span className="bg-rose-100 font-bold text-whit rounded-full px-1.5 text-sm ml-2">{todoCount}</span></h2>
          <div className="hover: bg-rose-100 pb-20 rounded">
            {renderToDo}
          </div>
        </div>
        <div className="col-span-1 space-y-2 h-96" onDrop={(e) => handleOnDrop(e, "doing")} onDragOver={handleDragOver}>
          <h2  className=" bg-indigo-500 text-whit mb-2 px-2 py-2 rounded">Doing <span className="bg-indigo-100 font-bold rounded-full px-1.5 text-sm ml-2">{doingCount}</span></h2>
          <div className="hover: bg-indigo-100 pb-20 rounded">
            {renderDoing}
          </div>
        </div>
        <div className="col-span-1 space-y-2 h-96" onDrop={(e) => handleOnDrop(e, "done")} onDragOver={handleDragOver}>
          <h2  className=" bg-emerald-500 text-whit mb-2 px-2 py-2 rounded">Done <span className="bg-emerald-100 font-bold rounded-full px-1.5 text-sm ml-2">{doneCount} </span></h2>
          <div className="hover: bg-emerald-100 pb-20 rounded">
            {renderDone}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
