# Kanban Board Task Management

[Project Link](https://kanban-client-sigma.vercel.app/)

This repository contains a React contacts application that utilizes React Router v6.4 for client-side routing. The app integrates with a RESTful API to perform CRUD (Create, Read, Update, Delete) operations on contacts. It also includes a search functionality using search parameters to efficiently find specific contacts.

It is the frontend part of a fullstack app, MERN stack, [link to backend repo](https://github.com/oolaoluwatobi/kanban-board-task-management-server)

## Overview
This project aims to develop a Kanban board-inspired task management application, providing users with a seamless way to manage tasks through different stages of completion by dragging and dropping various task. Drawing inspiration from platforms like Trello, our goal is to create a user-friendly and efficient tool for task organization.

## Features

Front-end Requirements

- Homepage: Display all tasks, categorizing them into three status groups: To Do, Doing, and Done.
- Task Card: Each task card should showcase the task's title and description.
- Add Task: Integration of a user-friendly form to create new tasks, requesting title and description inputs.
- Edit Task: Provide an option to edit an existing task's title and description for flexibility.
- Delete Task: Implement a feature to permanently remove tasks when they are no longer needed.
- Task Status: Empower users with a drag-and-drop functionality to effortlessly move tasks between To Do, Doing, and Done categories.
- Responsive Design: Ensure the application's full functionality and visual coherence on mobile devices, offering a seamless experience across different screen sizes.

Back-end Requirements

API Endpoints: Create a robust API with endpoints to support CRUD (Create, Read, Update, Delete) operations for tasks.
Database Storage: Implement a database system to store and manage task data, ensuring data integrity and accessibility.

## Demo 

You can test the live application [here](https://kanban-client-sigma.vercel.app/).

##  RESTful API Endpoints

The app interacts with a RESTful API to manage contacts. Some of the API endpoints include:

- Fetch all tasks: `GET /` or `GET /tasks`
- Fetch a single task: `GET /tasks/:id`
- Create a new task: `POST /tasks`
- Update an existing taskr: `PUT /tasks/:id`
- Delete a contact `DELETE /tasks/:id`

Please refer to the source code in the [backend repo](https://github.com/oolaoluwatobi/kanban-board-task-management-server) for a complete list of available endpoints and their functionalities.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/oolaoluwatobi/kanban-client.git
```

2. Change into the project directory:

```bash
cd kanban-client
```

3. Install the required dependencies:
```bash
npm install
```

## Usage

To start the backend server, use the following command:

```bash
npm start
```

The server will start running on `http://localhost:3000`


## Technologies Used
- Front-end: React.js
- Styling: Tailwind css
- Client-Side Routing: React-Router-Dom
- Drag-and-Drop: Inbuilt React feature
- Back-end: Node.js and Express.js
- Database: MongoDB

## Screenshots

![App Screenshot](https://github.com/oolaoluwatobi/kanban-client/blob/main/public/homepage.png)
![App Screenshot](https://github.com/oolaoluwatobi/kanban-client/blob/main/public/dragndrop.png)
![App Screenshot](https://github.com/oolaoluwatobi/kanban-client/blob/main/public/create.png)
![App Screenshot](https://github.com/oolaoluwatobi/kanban-client/blob/main/public/edit.png)
![App Screenshot](https://github.com/oolaoluwatobi/kanban-client/blob/main/public/details.png)

