showTask()
let addButton = document.getElementById("addButton");
let toDoList = document.getElementById("toDoList");
let todoInput = document.getElementById("todoInput");

addButton.addEventListener("click", function () {
    todoInputVal = todoInput.value;
    if (todoInputVal.trim()!=0) {
        let webTask = localStorage.getItem("localtask");
        if (webTask == null) {
            taskObj = [];
        }
        else {
            taskObj = JSON.parse(webTask);
        }
        taskObj.push(todoInputVal);
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        todoInput.value = '';
    }

    showTask();
});

function showTask() {
    let webTask = localStorage.getItem("localtask");
    if (webTask == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(webTask);
    }
    let html = '';
    let addedTaskList = document.getElementById("addedTaskList");
    taskObj.forEach((item, index) => {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td style="width:170rem">${item}</td>
                    <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="far fa-edit"></i>Edit</button></td>
                    
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedTaskList.innerHTML = html;
}
//<td><button type="button" class="text-success" id=${index} ><i class="far fa-check-square"></i>Complete</button></td>

//edittask
function edittask(index){
    let saveIndex = document.getElementById("saveIndex");
    let addButton = document.getElementById("addButton");
    let saveButton = document.getElementById("saveButton");
    saveIndex.value = index;
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask);
    todoInput.value = taskObj[index];
    addButton.style.display="none";
    saveButton.style.display="block";
}

//savetask
let saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function(){
    let addButton = document.getElementById("addButton");
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask);
    let saveIndex = document.getElementById("saveIndex").value;
    taskObj[saveIndex] = todoInput.value;
    saveButton.style.display="none";
    addButton.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    todoInput.value ='';
    showTask();

})

//deleteitem
function deleteitem(index){
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index,1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
}

//deleteall
let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", function(){
    let saveButton = document.getElementById("saveButton");
    let addButton = document.getElementById("addButton");
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask);
    if (webTask == null) {
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    saveButton.style.display = "none";
    addButton.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
})

//searchtext
let searchTextBox = document.getElementById("searchTextBox");
searchTextBox.addEventListener("input", function(){
    let trList = document.querySelectorAll("tr");
    Array.from(trList).forEach(function(item){
        let searchedText = item.getElementsByTagName("td")[0].innerText;
        let searchTextBoxVal = searchTextBox.value;
        let re = new RegExp(searchTextBoxVal, 'gi');
        if (searchedText.match(re)) {
            item.style.display = "table-row";
        }
        else{
            item.style.display = "none";
        }
    })
})