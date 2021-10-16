let creatures = []

fetch('/api/creature')
  .then(response => {
    return response.json()
  }).then(data => {
    creatures = data

    populateCreature()
    // console.log(creatures)
  })

function populateCreature() {
  let cbody = document.querySelector('#cbody')
  cbody.innerHTML = ""

  creatures.forEach(creature => {
    let div = document.createElement('div')
    div.innerHTML = `
      <span>${creature.name} is ${creature.age} years old ${creature.gender} ${creature.species}</span>
    `
    cbody.appendChild(div)
  })
}

function addCreature() {
  let nameEl = document.querySelector('#name')
  let ageEl = document.querySelector('#age')
  let speciesEl = document.querySelector('#species')
  let genderEl = document.querySelector('#gender')
  let errorEl = document.querySelector('#error')

  // create record
  let creature = {
    name: nameEl.value,
    age: ageEl.value,
    species: speciesEl.value,
    gender: genderEl.value,
    date: new Date().toISOString()
  }

  // add to beginning of current array of data
  creatures.unshift(creature)
  // console.log(`new Creature ${JSON.stringify(creature, 0, 2)}`)

  // re-run logic to populate ui with new record
  populateCreature()

  // also send to server
  fetch('/api/creature', {
    method: 'POST',
    body: JSON.stringify(creature),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      }
      else {
        // clear form
        nameEl.value = ""
        ageEl.value = ""
        speciesEl.value = ""
        genderEl.value = ""
      }
    })
    .catch(err => {
      // fetch failed, so save in indexed db
      saveRecord(creature);

      // clear form
      nameEl.value = ""
      ageEl.value = ""
      speciesEl.value = ""
      genderEl.value = ""
    });
}

document.querySelector("#add-btn").onclick = function () {
  addCreature();
};