const userEmail = document.getElementById("floatingInput");
const userPassword = document.getElementById("floatingPassword");
const addData = document.getElementById("add-data");
const record = document.getElementById("records-row");

var myLocalStorage = JSON.parse(localStorage.getItem("form-data")) || [];

function saveData() {
    localStorage.setItem("form-data", JSON.stringify(myLocalStorage));
}

addData.addEventListener("click", function () {
    myLocalStorage.push({
        "id": generateUniqueID(),
        "email": userEmail.value,
        "password": userPassword.value,
        "time": formatDateTime()
    });
    saveData();
    updateData();
    userEmail.value = "";
    userPassword.value = "";
});

function updateData() {
    // Clear previous records to avoid duplication
    record.innerHTML = "";

    myLocalStorage.forEach((data, index) => {
        record.innerHTML += `
        <tr>
            <td>${data.id}</td>
            <td>${data.email}</td>
            <td>${data.password}</td>
            <td>${data.time}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="loadData(${index})">Edit</button>
                <button class="btn btn-sm btn-danger ms-1" onclick="deleteData(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function loadData(index) {
    const currentRecord = myLocalStorage[index];
    userEmail.value = currentRecord.email;
    userPassword.value = currentRecord.password;
}

function deleteData(index) {
    // Remove the selected record by its index
    myLocalStorage.splice(index, 1);
    saveData();
    updateData();
}

function generateUniqueID() {
    return Math.floor(Math.random() * Date.now());
}

function formatDateTime() {
    const now = new Date(Date.now());

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

updateData();
