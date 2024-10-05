const userEmail = document.getElementById("floatingInput");
const userPassword = document.getElementById("floatingPassword");
const addData = document.getElementById("add-data");
const record = document.getElementById("records-row");
const showAlerts = document.querySelector("#alert")

// get data from local storage
var myLocalStorage = JSON.parse(localStorage.getItem("form-data")) || [];


var isEditing = false;  // Track if we are in edit mode
var editIndex = -1;     // Store the index of the current record being edited

// save data to local storage
function saveData() {
    localStorage.setItem("form-data", JSON.stringify(myLocalStorage));
}

// email validation function
function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
        // alert("Valid email address!");
        // document.form1.text1.focus();
        return true;
    } else {
        // alert("Invalid email address!");
        showAlerts.innerHTML = `
        <div class="alert alert-dark alert-dismissible" role="alert">
            <div>Please enter valid email address...!</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        // document.form1.text1.focus();
        return false;
    }
}

// add record by clicknig signin button
addData.addEventListener("click", function () {

    if (!ValidateEmail(userEmail)) {
        return
    }

    // check mode whether it is editing or fresh signin
    if (isEditing) {
        modifyData(editIndex);
    } else {
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

// update the datatable to show the data
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

// load clicked data to the form
function loadData(index) {
    const currentRecord = myLocalStorage[index];
    userEmail.value = currentRecord.email;
    userPassword.value = currentRecord.password;
    isEditing = true;   // Set to edit mode
    editIndex = index;  // Store the index of the current record
    addData.innerText = "Modify";  // Change the button text to indicate edit mode
}

// edit the data which is chosen for modification
function modifyData(index) {
    const currentRecord = myLocalStorage[index];
    currentRecord.email = userEmail.value;
    currentRecord.password = userPassword.value;
    currentRecord.time = formatDateTime();
    isEditing = false;  // Exit edit mode
    editIndex = -1;  // Reset the edit index
    addData.innerText = "Add Data";  // Reset button text
}

// delete data from local storage
function deleteData(index) {
    // Remove the selected record by its index
    myLocalStorage.splice(index, 1);
    saveData();
    updateData();
}

// generate unique id for all the data
function generateUniqueID() {
    return Math.floor(Math.random() * Date.now());
}

// data and time in special format
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

// clear the form and reset the edit mode
function clearForm() {
    userEmail.value = "";
    userPassword.value = "";
    isEditing = false;  // Reset edit mode after saving
    addData.innerText = "Add Data";  // Reset button text
}

// default call this functions displays existing local storage data
updateData();
