let idCounter = 0;

function clearInputs() {
    document.getElementById("hiddenId").value = '';
    document.getElementById("name").value = '';
    document.getElementById("lastname").value = '';
    document.getElementById("country").value = '';
    document.getElementById("weight").value = '';
    document.getElementById("bdate").value = '';
    document.getElementById("maleRadio").checked = false;
    document.getElementById("femaleRadio").checked = false;
}

function checkInput(judoka) {

    // Check for empty or brank inputs
    if (judoka.name === '') {
        throw new Error("Name can not be empty");
    }

    if (judoka.lastname === '') {
        throw new Error("Lastname can not be empty");
    }

    if (judoka.bdate === '') {
        throw new Error("Birthdate can not be empty");
    }

    if (judoka.country === '') {
        throw new Error("Country can not be empty");
    }

    if (judoka.weight === '') {
        throw new Error("Weight class can not be empty");
    }
}

function getAgeClass(bdate) {
    let birthYear = new Date(bdate).getFullYear();
    let actualYear = new Date().getFullYear()

    if (actualYear - birthYear < 18) {
        return "Cadet";
    } else if (actualYear - birthYear < 21) {
        return "Junior";
    } else if (actualYear - birthYear < 31) {
        return "Senior"
    } else {
        return "Master";
    }
}

function deleteById(idToDelete) {
    const trToDelete = document.getElementById(idToDelete.toString());
    trToDelete.remove();
}

function editById(idToEdit) {
    const trToEdit = document.getElementById(idToEdit.toString());

    let judoka = {
        id: parseInt(trToEdit.childNodes[1].innerText),
        gender: trToEdit.childNodes[3].innerText,
        name: trToEdit.childNodes[5].innerText,
        lastname: trToEdit.childNodes[7].innerText,
        country: trToEdit.childNodes[9].innerText,
        weight: trToEdit.childNodes[11].innerText,
        bdate: trToEdit.childNodes[13].innerText,
    }

    deleteById(idToEdit);

    document.getElementById("hiddenId").value = judoka.id.toString();
    document.getElementById("name").value = judoka.name;
    document.getElementById("lastname").value = judoka.lastname;
    document.getElementById("country").value = judoka.country;
    document.getElementById("weight").value = judoka.weight;
    document.getElementById("bdate").value = judoka.bdate;

    if (judoka.gender === "male") {
        document.getElementById("maleRadio").checked = true;
        document.getElementById("femaleRadio").checked = false;
    } else {
        document.getElementById("maleRadio").checked = false;
        document.getElementById("femaleRadio").checked = true;
    }
}

function save() {
    const hiddenId = document.getElementById("hiddenId");
    const name = document.getElementById("name");
    const lastname = document.getElementById("lastname");
    const country = document.getElementById("country");
    const weight = document.getElementById("weight");
    const bdate = document.getElementById("bdate");

    const table = document.getElementById("table");
    
    try {
        const gender = document.querySelector('input[name="gender"]:checked').value;

        if (hiddenId.value === "") {
            id = ++idCounter;
        } else {
            id = hiddenId.value;
        }

        let judoka = {
            id: id,
            gender: gender,
            name: name.value.trim(),
            lastname: lastname.value.trim(),
            country: country.value,
            weight: weight.value,
            bdate: bdate.value,
            modified: new Date(),
        };

        checkInput(judoka);

        judoka.ageClass = getAgeClass(judoka.bdate);

        table.innerHTML += `
            <tr id="${judoka.id}">
                <td>${judoka.id}</td>
                <td>${judoka.gender}</td>
                <td>${judoka.name}</td>
                <td>${judoka.lastname}</td>
                <td>${judoka.country}</td>
                <td>${judoka.weight}</td>
                <td>${judoka.bdate}</td>
                <td>${judoka.ageClass}</td>
                <td>${judoka.modified}</td>
                <td>
                    <button onclick="deleteById(${judoka.id})">Delete</button>
                    <button onclick="editById(${judoka.id})">Edit</button>
                </td>
            </tr>
        `;

        //console.log(judoka);
        clearInputs();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}