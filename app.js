fetch("data.txt")
  .then((res) => res.json())
  .then((res) => birthday(res));

function birthday(persons) {
  fillTable(persons);
  const nextPerson = getNextBirthday(persons);
  fillNBTable(nextPerson);
}

function fillTable(persons) {
  const table = document.getElementById("tabla");
  let fragment = new DocumentFragment();

  for (let p = 0; p < persons.length; p++) {
    let tr = document.createElement("tr");
    let tdNombre = document.createElement("td");
    let tdApellido = document.createElement("td");
    let tdFecha = document.createElement("td");

    tdNombre.textContent = persons[p].nombre;
    tr.appendChild(tdNombre);
    tdApellido.textContent = persons[p].apellido;
    tr.appendChild(tdApellido);
    tdFecha.textContent = persons[p].fecha;
    tr.appendChild(tdFecha);
    fragment.appendChild(tr);
  }
  table.appendChild(fragment);
}

function getNextBirthday(persons) {
  let temp = 365;
  let p = 0;

  persons.forEach((person, index) => {
    //Dar formato a la fecha
    const parts = person.fecha.split(/[/]/g);
    person.fecha = `${parts[2]}-${parts[1]}-${(parseInt(parts[0]) + 1).toString()}`;
    //Fecha actual
    const today = new Date();
    //Fecha de nacimiento
    const lastBirthday = new Date(person.fecha);
    lastBirthday.setFullYear(today.getFullYear());
    //Si el cumpleaños ya ocurrió, agregarle 1 año
    if (lastBirthday < today) {
      lastBirthday.setFullYear(today.getFullYear() + 1);
    }
    //Obtener cantidad de días
    let days;
    days = Math.round((lastBirthday - today) / 1000 / 3600 / 24);
    //Guardar el mínimo
    if (days < temp) {
      temp = days;
      p = index;
    }
  });

  return persons[p];
}

function fillNBTable(nextPerson) {
  const tNB = document.getElementById("tNB");
  let fragment = new DocumentFragment();

  let tr = document.createElement("tr");
  let tNBNombre = document.createElement("td");
  let tNBApellido = document.createElement("td");
  let tNBFecha = document.createElement("td");

  tNBNombre.textContent = nextPerson.nombre;
  tr.appendChild(tNBNombre);
  tNBApellido.textContent = nextPerson.apellido;
  tr.appendChild(tNBApellido);
  tNBFecha.textContent = nextPerson.fecha;
  tr.appendChild(tNBFecha);

  fragment.appendChild(tr);
  tNB.appendChild(fragment);
}