let idCounter = 0;

function clearInputs() {
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

function save() {
    const name = document.getElementById("name");
    const lastname = document.getElementById("lastname");
    const country = document.getElementById("country");
    const weight = document.getElementById("weight");
    const bdate = document.getElementById("bdate");

    const table = document.getElementById("table");
    
    try {
        const gender = document.querySelector('input[name="gender"]:checked').value;

        let judoka = {
            id: ++idCounter,
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
                <td><button onclick="deleteById(${judoka.id})">Delete</button></td>
            </tr>
        `;

        //console.log(judoka);
        clearInputs();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}