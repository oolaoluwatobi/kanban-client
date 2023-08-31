import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3500/"
  baseURL: "https://kanban-task-management-app-1l6i.onrender.com/"
  // baseURL: "https://mern-contacts-app.onrender.com/subscribers"
  // baseURL: "mongodb+srv://oolaoluwatobi:123ola@cluster0.g928usv.mongodb.net/kanbanboarddb?retryWrites=true&w=majority"
});
