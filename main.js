"use strict";

const SERVER = "https://jsonplaceholder.typicode.com";

startRequests();

async function startRequests() {
  const idUser = prompt("Introduce la id del usuario a buscar");
  try {
    const userById = await requestGetUserById(idUser);
    console.log(`${userById.id} - ${userById.name} - ${userById.username}`);

    console.log(await requestGetAllUsersById(idUser));

    const idTaskToDelete = prompt(
      "Introduce la id de la tarea que quieres borrar"
    );
    console.log(await requestDeleteTaskById(idTaskToDelete));

    const idTaskToUpdate = prompt(
      "Introduce la id de la tarea que quieres modificar"
    );
    console.log(await requestUpdateTaskById(idTaskToUpdate));

    console.log(await requestAddTodo(idUser));
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(idUser) {
  const response = await fetch(SERVER + `/users/${idUser}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getTodoById(idTodos) {
  const response = await fetch(SERVER + `/todos/${idTodos}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getAllTodosById(idPost) {
  const response = await fetch(SERVER + `/todos?userId=${idPost}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function deleteTask(idTask) {
  const response = await fetch(SERVER + `/posts/${idTask}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function updateData(id, data) {
  const response = await fetch(SERVER + `/todos/${id}`, {
    method: "PATCH", // or 'PUT'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function createData(data) {
  const response = await fetch(SERVER + "/todos/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function requestGetUserById(idUser) {
  return await getUserById(idUser);
}

async function requestGetAllUsersById(idUser) {
  return await getAllTodosById(idUser);
}

async function requestDeleteTaskById(idTask) {
  return await deleteTask(idTask);
}

async function requestUpdateTaskById(idTask) {
  return await updateData(idTask, { completed: "Fran" });
}

async function requestAddTodo(userId) {
  const title = prompt("Introduzca el título de la web");
  const user = await getTodoById(userId);
  const taskToAdd = await createData({
    userId: Number.parseInt(userId),
    id: user.id,
    title: title,
    completed: false,
  });
  return taskToAdd;
}
