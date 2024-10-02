const userEmail = document.getElementById("floatingInput")
const userPassword = document.getElementById("floatingPassword")
const addData = document.getElementById("add-data")
const record = document.getElementById("records-row")

var myLocalStorage = JSON.parse(localStorage.getItem("form-data")) || []

function saveData() {
    localStorage.setItem("form-data", JSON.stringify(myLocalStorage))
}

addData.addEventListener("click", function () {
    myLocalStorage.push({
        "id": generateUniqueID(),
        "email": userEmail.value,
        "password": userPassword.value,
        "time": Date.now()
    })
    saveData()
    updateData()
    userEmail.value = ""
    userPassword.value = ""
})

for (let i = 0; i < myLocalStorage.length; i++) {
    console.log(myLocalStorage[i]);
}

function updateData() {
    for (let i = 0; i < myLocalStorage.length; i++) {
        record.innerHTML += `
        <tr>
            <td>${myLocalStorage[i]["id"]}</td>
            <td>${myLocalStorage[i]["email"]}</td>
            <td>${myLocalStorage[i]["password"]}</td>
            <td>${myLocalStorage[i]["time"]}</td>
        </tr>
        `
    }
}

function generateUniqueID() {
    return Math.floor(Math.random() * Date.now());
}

updateData()