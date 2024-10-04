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
        "time": formatDateTime()
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
            <td>
                <button class="btn btn-sm btn-secondary" onclick="loadData(${i})">Edit</button>
                <button class="btn btn-sm btn-danger ms-1" onclick="deleteData(${i})">Delete</button>
            </td>
        </tr>
        `
    }
}

function loadData(i) {
    const currentRecord = myLocalStorage[i]
    // console.log(currentRecord["email"])
    userEmail.value = currentRecord["email"]
    userPassword.value = currentRecord["password"]
}

function deleteData(i) {
    myLocalStorage.splice(i, 1)
    saveData()
    updateData()
}

function generateUniqueID() {
    return Math.floor(Math.random() * Date.now());
}

function formatDateTime() {
    const now = new Date(Date.now());

    const day = String(now.getDate()).padStart(2, '0');       // Get day and pad with zero if needed
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero, months are 0-indexed
    const year = now.getFullYear();                           // Get full year

    const hours = String(now.getHours()).padStart(2, '0');    // Get hours and pad with zero
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds and pad with zero

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// console.log(formatDateTime());

updateData()