// CLIENTE
const BASE_URL = "http://localhost:8000";

const inputAnimal = document.getElementById("inputAnimal");
const inputStrength = document.getElementById("inputStrength");
const btnCreate = document.getElementById("btnCreate");

const createAnimal = () => {
  const animalToCreate = inputAnimal.value;
  const strengthToCreate = Number(inputStrength.value);

  fetch(BASE_URL + "/animals", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: animalToCreate,
      strength: strengthToCreate,
    }),
  }).then(() => {
    inputAnimal.value = "";
    inputStrength.value = "";
    getAnimals();
  });
};

const getAnimals = () => {
  fetch(BASE_URL + "/animals")
    .then((res) => res.json())
    .then((animals) => {
      const animalsContainer = document.getElementById("animalsContainer");
      animalsContainer.innerHTML = "";

      animals.forEach((animal) => {
        animalsContainer.innerHTML += `
          <h2>${animal.name} - F: ${
          animal.strength
        } <button onclick="deleteAnimal(${
          animal.id
        })">Eliminar</button> <button onclick='updateAnimal(${JSON.stringify(
          animal
        )})'>Modificar</button> </h2>
        `;
      });
    });
};

const deleteAnimal = (animalId) => {
  fetch(BASE_URL + "/animals/" + animalId, {
    method: "DELETE",
  }).then(() => getAnimals());
};

const updateAnimal = (animal) => {
  const nameToUpdate = prompt("Ingrese un nuevo nombre", animal.name);
  const strengthToUpdate = prompt("Ingrese una nueva fuerza", animal.strength);
  const idToUpdate = animal.id;
  if(!nameToUpdate || !strengthToUpdate){
    alert("Por favor ingrese nombre y fuerza");
    return;
  }
  fetch(BASE_URL + `/animals/${idToUpdate}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameToUpdate,
      strength: strengthToUpdate,
    }),
  }).then(() => {
    alert(`Animal ${animal.name} actualizado a ${nameToUpdate}`);
    getAnimals();
  });
};

btnCreate.addEventListener("click", createAnimal);
getAnimals();