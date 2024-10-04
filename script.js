const userEmail = document.getElementById("floatingInput");
const userPassword = document.getElementById("floatingPassword");
const addData = document.getElementById("add-data");
const record = document.getElementById("records-row");

var myLocalStorage = JSON.parse(localStorage.getItem("form-data")) || [];
var isEditing = false;  // Track if we are in edit mode
var editIndex = -1;     // Store the index of the current record being edited

function saveData() {
    localStorage.setItem("form-data", JSON.stringify(myLocalStorage));
}

addData.addEventListener("click", function () {
    if (userEmail.value === "" || userPassword.value === "") {
        return
    }

    if (isEditing) {
        // Modify the existing record if in edit mode
        modifyData(editIndex);
    } else {
        // Add new data if not in edit mode
        myLocalStorage.push({
            "id": generateUniqueID(),
            "email": userEmail.value,
            "password": userPassword.value,
            "time": formatDateTime()
        });
    }
    saveData();
    updateData();
    clearForm();
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
    isEditing = true;   // Set to edit mode
    editIndex = index;  // Store the index of the current record
    addData.innerText = "Modify";  // Change the button text to indicate edit mode
}

function modifyData(index) {
    const currentRecord = myLocalStorage[index];
    currentRecord.email = userEmail.value;
    currentRecord.password = userPassword.value;
    currentRecord.time = formatDateTime();
    isEditing = false;  // Exit edit mode
    editIndex = -1;  // Reset the edit index
    addData.innerText = "Add Data";  // Reset button text
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

function clearForm() {
    userEmail.value = "";
    userPassword.value = "";
    isEditing = false;  // Reset edit mode after saving
    addData.innerText = "Add Data";  // Reset button text
}

updateData();
