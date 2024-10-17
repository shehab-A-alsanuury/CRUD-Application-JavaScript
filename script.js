
const STORAGE_KEY = 'crudData';

function addData() {
    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const address = document.getElementById('addressInput').value;
    const email = document.getElementById('emailInput').value;

    if (!name || !age || !address || !email) {
        alert("الرجاء ملء جميع الحقول");
        return;
    }

    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    data.push({ name, age, address, email });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    clearInputs();
    loadData();
}

function loadData() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (data.length > 0) {
        data.forEach((item, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.address}</td>
                <td>${item.email}</td>
                <td>
                    <button class="delete" onclick="deleteData(${index})">حذف</button>
                    <button class="edit" onclick="editData(${index})">تعديل</button>
                </td>
            `;
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="5">لا توجد بيانات</td></tr>';
    }
}

function editData(index) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const item = data[index];
    
    document.getElementById('nameInput').value = item.name;
    document.getElementById('ageInput').value = item.age;
    document.getElementById('addressInput').value = item.address;
    document.getElementById('emailInput').value = item.email;

    data.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadData();
}

function deleteData(index) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    data.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadData();
}

function clearInputs() {
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('addressInput').value = '';
    document.getElementById('emailInput').value = '';
}


window.onload = loadData;