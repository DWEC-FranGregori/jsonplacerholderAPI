"use strict";

const SERVER = "https://jsonplaceholder.typicode.com";

const idUser = prompt("Introduce la id del user");

firstMethod(idUser);
secondMethod();
thirdMethod();
fourthMethod();
fiveMethod(idUser);

async function getUserById(idUser) {
  const response = await fetch(SERVER + `/users/${idUser}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getTodosById(idTodos) {
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

async function firstMethod(idUser) {
  const userById = await getUserById(idUser);
  console.log(`${userById.id} - ${userById.name} - ${userById.username}`);
}

async function secondMethod() {
  console.log(await getAllTodosById(2));
}

async function thirdMethod() {
  console.log(await deleteTask(4));
}

async function fourthMethod() {
  const dataUpdated = await updateData(1, { completed: "Fran" });
  console.log(dataUpdated);
}

async function fiveMethod(userId) {
  const title = prompt("Introduzca el título de la web");
  const user = await getTodosById(userId);
  console.log("EYYYYY");
  console.log(user);
  const taskToAdd = await createData({
    userId: userId,
    id: user.id,
    title: title,
    completed: false,
  });
  console.log(taskToAdd);
}
