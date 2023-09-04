import React, { useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useOutletContext,
  Outlet,
  useParams,
} from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import api from "../api/server";

const HomePage = () => {
  const { resData } = useOutletContext();
  const { id } = useParams();

  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const [task, setTask] = useState("");
  const [droppedTask, setDroppedTask] = useState("");
  const [clickedTaskId, setClickedTaskId] = useState("");
  // console.log(resData)

  function handleOnDrag(e, id) {
    e.dataTransfer.setData("widgetId", id);

    console.log(id);
  }

  function handleOnDrop(e, category) {
    const widgetId = e.dataTransfer.getData("widgetId");
    const pickedTask = resData.find((task) => task._id === widgetId);
    console.log("widgetId", widgetId, category, pickedTask);
    console.log(id, category, widgetId);

    if (widgetId && pickedTask) {
      async function editTaskStatus(currentId, task) {
        const item = { id: currentId, status: task };
        console.log("paramsID:", id, "droppedID:", widgetId);
        console.log(currentId, item);
        try {
          // const res = await api.delete(`/tasks`, {
          //   id: `${params.id}`
          // });
          const res = await api.put(`/tasks`, item);

          if (id === widgetId) {
            // setTask(category)
            setTask(res?.data?.status);
          }
          setDroppedTask(res?.data?.status);
          console.log(
            res,
            res?.data?.status,
            "task:",
            category,
            task,
            "92: Subs..."
          );
          return redirect(res?.data?.status);
        } catch (error) {
          console.log(error.message);
          return error, redirect("/");
        }
      }
      const updatedStatus = editTaskStatus(widgetId, category);
    }

    if (pickedTask) {
      if (category === "todo") {
        const newTodo = todo.filter((task) => task._id !== widgetId);
        setTodo([...newTodo, pickedTask]);
        const newDoing = doing.filter((task) => task._id !== widgetId);
        setDoing([...newDoing]);
        const newDone = done.filter((task) => task._id !== widgetId);
        setDone([...newDone]);
      } else if (category === "doing") {
        const newTodo = todo.filter((task) => task._id !== widgetId);
        setTodo([...newTodo]);
        const newDoing = doing.filter((task) => task._id !== widgetId);
        setDoing([...newDoing, pickedTask]);
        const newDone = done.filter((task) => task._id !== widgetId);
        setDone([...newDone]);
      } else if (category === "done") {
        const newTodo = todo.filter((task) => task._id !== widgetId);
        setTodo([...newTodo]);
        const newDoing = doing.filter((task) => task._id !== widgetId);
        setDoing([...newDoing]);
        const newDone = done.filter((task) => task._id !== widgetId);
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
    console.log("dragover");
  }

  function handleClick(e, clickedItemId, clickedItemStatus, paramsId) {
    setTask(clickedItemStatus);

    // if (clickedItemId === paramsId) {
    // }
  }

  // console.log(todo)
  // console.log(doing)
  // console.log(done)

  useEffect(() => {
    setTodo(resData.filter((task) => task.status === "todo"));
    setDoing(resData.filter((task) => task.status === "doing"));
    setDone(resData.filter((task) => task.status === "done"));
  }, [resData]);

  useEffect(() => {
    console.log(task);
    console.log(droppedTask);
  }, [task, droppedTask]);

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

  const renderToDo = todo.map((task) => {
    const truncatedTask =
      task.description.length > 32
        ? task.description.substring(0, 32) + "..."
        : task.description;
    return (
      <div
        key={task._id}
        draggable
        onDragStart={(e) => handleOnDrag(e, task._id)}
        className="bg-[#e4e4d0] text[#94a684] rounded-lg p-2 pt1 mb-2 cursor-grab  "
      >
        <div className="text[#94a684] bg-red-5 p1 ">
          <h3 className="mt-1 text-sm group font-semibold">
            {task.title}
          </h3>
          <p className="text-xs lg:text-xs mt-1 group-hover:hidden ">
            {truncatedTask}{" "}
          </p>
        </div>
        <div className="m2 mt-4 px-2 py-1.5   fle lg:bloc justify-betwee w-ful text-center  col-span lg:col-span2  bg-[#94a684]  text-[#e4e4d0]  opacity-80 hover:opacity-100  rounded-lg  bg-red-20">
          <div className="p1 rounded-full item-center mx-auto bg-whit ">
            <Link
              to={`/tasks/${task._id}`}
              onClick={(e) => handleClick(e, task._id, task.status, id)}
            >
              <p className="text-xs font-semibold lg:hidde">
                View task
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  });
  const todoCount = todo.length;

  const renderDoing = doing.map((task) => {
    const truncatedTask =
      task.description.length > 32
        ? task.description.substring(0, 32) + "..."
        : task.description;

    return (
      <div
        key={task._id}
        draggable
        onDragStart={(e) => handleOnDrag(e, task._id)}
        className="bg-[#f8e8ee] rounded-lg px2 p-2 mb-2 cursor-grab "
      >
        <div className="text-[] bg-red-5 px-1 col-span-8 ">
          <h3 className="mt-1 text-sm lg:text-sm group font-semibold">
            {task.title}
          </h3>
          <p className="text-xs lg:text-xs mt-1  group-hover:hidden ">
            {truncatedTask}{" "}
          </p>
        </div>
        <div className="m2 mt-4 px-2 py-1.5   fle lg:bloc justify-betwee w-ful text-center  col-span- lg:col-span2  bg-[#ba90c6]  bg-red-20  text-[#f9f5f6]  opacity-80 hover:opacity-100  rounded-lg  bg-red-20">
          <div className="p1 rounded-full item-center mx-auto bg-whit ">
            <Link
              to={`/tasks/${task._id}`}
              onClick={(e) => handleClick(e, task._id, task.status, id)}
            >
              <p className="text-xs font-semibold  lg:hidde">
                View task
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  });
  const doingCount = doing.length;

  const renderDone = done.map((task) => {
    const truncatedTask =
      task.description.length > 32
        ? task.description.substring(0, 32) + "..."
        : task.description;

    return (
      <div
        key={task._id}
        draggable
        onDragStart={(e) => handleOnDrag(e, task._id)}
        className="bg-[#eee0c9] rounded-lg px2 p-2 mb-2 cursor-grab fle "
      >
        <div className="text-[[#96b6c5]] text-  ">
          <h3 className="mt-1 text-xs lg:text-sm group font-semibold">
            {task.title}
          </h3>
          <p className="text-[0.675rem] lg:text-xs mt-1  ">
            {truncatedTask}{" "}
          </p>
        </div>
        <div className="m2 mt-4 px-2 py-1.5   fle lg:bloc justify-betwee w-ful text-center  col-span lg:col-span2  bg-[#96b6c5]  text-[#ffeadd] opacity-80 hover:opacity-100 rounded-lg  bg-red-20">
          <div className="p1 rounded-full item-center mx-auto bg-whit ">
            <Link
              to={`/tasks/${task._id}`}
              onClick={(e) => handleClick(e, task._id, task.status, id)}
            >
              <p className="text-xs font-semibold  lg:hidde">
                View task
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  });
  const doneCount = done.length;

  return (
    <section className="w-full h-auto  bg-slate-10 bg-red-20  px4 lg:px-10   font-[Poppins">
      {/* <Outlet context={{ currentTask }} /> */}
      <Outlet context={{ task }} />
      <div className="w-full grid grid-cols-3 px-2 gap-2 lg:gap-4 mt-10  max-w-4xl min-h-full mx-auto">
        <div
          className="col-span-1 space-y-2 p-2 bg-stone-50 h-96"
          onDrop={(e) => handleOnDrop(e, "todo")}
          onDragOver={handleDragOver}
        >
          <h2 className=" bg-[#e4e4d0] text-[#94a684] mb-4 p-3  rounded-lg  font-bold">
            To Do{" "}
            <span className="bg-[#ffeef4] font-bold text-whit rounded-full px-1.5 text-sm ml-2">
              {todoCount}
            </span>
          </h2>
          <div className="hover: bg-stone-50 p2 space-y-2 pb-80 rounded-lg">
            {renderToDo}
          </div>
        </div>
        <div
          className="col-span-1 space-y-2 p-2 bg-stone-50 h-96"
          onDrop={(e) => handleOnDrop(e, "doing")}
          onDragOver={handleDragOver}
        >
          <h2 className=" bg-[#f8e8ee] font-bold text-[#ba90c6] mb-4 p-3 rounded-lg">
            Doing{" "}
            <span className="bg-[#e8a0bf] text-[#fdf4f5] font-bold rounded-full px-1.5 text-sm ml-2">
              {doingCount}
            </span>
          </h2>
          <div className="hover: bg-stone-50 p2 space-y-3 pb-80 rounded-lg">
            {renderDoing}
          </div>
        </div>
        <div
          className="col-span-1 space-y-2 p-2 bg-stone-50 h-96"
          onDrop={(e) => handleOnDrop(e, "done")}
          onDragOver={handleDragOver}
        >
          <h2 className=" bg-[#eee0c9] text-[#96b6c5] font-bold mb-4 p-3  rounded-lg">
            Done{" "}
            <span className="bg-[#f1f0e8] font-bold rounded-full px-1.5 text-sm ml-2">
              {doneCount}{" "}
            </span>
          </h2>
          <div className="hover: bg-stone-50 p2 space-y-3 h-scree pb-80 rounded-lg">
            {renderDone}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
