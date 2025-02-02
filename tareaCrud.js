var selectedRow = null

function onFormSubmit(event)
 {
    event.preventDefault();

    if (validate()) 
    {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
        saveDataLocalStorage(formData); 
    }
}

function saveDataLocalStorage(formData) {
    var existingData = localStorage.getItem('formData');
    var data = existingData ? JSON.parse(existingData) : [];
    data.push(formData);
    localStorage.setItem('formData', JSON.stringify(data));
}


function readFormData() 
{
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["email"] = document.getElementById("email").value;
    formData["materia"] = document.getElementById("materia").value;
    formData["tarea"] = document.getElementById("tarea").value;
    formData["descripcion"] = document.getElementById("descripcion").value;
    return formData;
}

function insertNewRecord(data)
 {
    var table = document.getElementById("lista-usuarios").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.materia;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.tarea;
    cell5= newRow.insertCell(4);
    cell5.innerHTML = data.descripcion;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() 
{
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("materia").value = "";
    document.getElementById("tarea").value = "";
    document.getElementById("descripcion").value = "";
    selectedRow = null;
}
function onEdit(td)
 {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("materia").value = selectedRow.cells[2].innerHTML;
    document.getElementById("tarea").value = selectedRow.cells[3].innerHTML;
    document.getElementById("descripcion").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) 
{
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.materia;
    selectedRow.cells[3].innerHTML = formData.tarea;
    selectedRow.cells[4].innerHTML = formData.descripcion;
}

function onDelete(td)
 {
    if (confirm('Estas seguro de borrar este usuario?')) 
    {
        row = td.parentElement.parentElement;
        document.getElementById("lista-usuarios").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() 
{
    isValid = true;
    if (document.getElementById("fullName").value == "") 
    {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else 
    {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}