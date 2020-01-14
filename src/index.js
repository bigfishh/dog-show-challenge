const dogTBody = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")
    const dfName = dogForm.querySelector("[name= 'name']")
        dfName.id = "dog-name"
    const dfBreed = dogForm.children[1]
        dfBreed.id = "breed"
    const dfSex = dogForm.children[2]
        dfSex.id = "sex"
    const dfSubmit = dogForm.children[3]
        dfSubmit.id = "dog-submit"

const dogsUrl = "http://localhost:3000/dogs"
// debugger

fetch(dogsUrl)
.then(resp => resp.json())
.then(dogsData => {
    dogsData.forEach(dog => {
        displayDogInTable(dog)
        // submitDogForm (dog, dogForm)
    });
})



function displayDogInTable(dog){
    const trDogs = document.createElement('tr')
    trDogs.setAttribute('id', `dog-table-${dog.id}`)
        const tdName = document.createElement('td')
            // tdName.setAttribute('id', `${dog.id}-name-col`)
            tdName.innerText = dog.name

        const tdBreed = document.createElement('td')
            // tdBreed.setAttribute('id', `${dog.id}-breed-col`)
            tdBreed.innerText = dog.breed
    const tdSex = document.createElement('td')
            // tdSex.setAttribute('id', `${dog.id}-sex-col`)
            tdSex.innerText = dog.sex

        const tdButton = document.createElement('td')
            const editButton = document.createElement('button')
                editButton.innerText = "Edit"

                editDog(editButton, dog)

            tdButton.append(editButton)
        trDogs.append(tdName, tdBreed, tdSex, tdButton)
    dogTBody.append(trDogs)

    return trDogs

}

function editDog(editButton, dog){
    editButton.addEventListener('click', (e) => {
        dfName.value = dog.name
        dfBreed.value = dog.breed 
        dfSex.value = dog.sex 
        dogForm.dataset.id = dog.id
    })
}

// function submitDogForm (dog, dogForm){
    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = e.target["dog-name"].value
        const breed = e.target["breed"].value
        const sex = e.target["sex"].value
        fetch(`${dogsUrl}/${dogForm.dataset.id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                breed,
                sex 
            })
        })
        .then(resp => resp.json())
        .then(updatedDog => {
            // debugger
            const oldDogInfo = dogTBody.querySelector(`#dog-table-${updatedDog.id}`)
            const newDogInfo = displayDogInTable(updatedDog)
            dogTBody.replaceChild(newDogInfo, oldDogInfo)
        })
    })
// }