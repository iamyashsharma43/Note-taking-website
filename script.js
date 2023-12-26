console.log("hello");
showNotes();

//adds ability to edit text in notes
function editText(id, type) {
    let editedText = document.getElementById(id);
    let parentOfText = editedText.parentNode;
    //console.log(id);
    parentOfText.innerHTML = `<textarea cols="23" class="textarea" id=${id}>${parentOfText.innerText}</textarea>`;
    let textArea = document.getElementById(id);
    textArea.focus();
    textArea.addEventListener('blur', function () {
        let text = textArea.value;
        parentOfText.innerHTML = `<p class="notes-text">${text}</p>
        <a id=${id} class="notes-edit" name=${type} onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>`;
        updateLocalStorage(id, type, text);
    });
}

//adds the ablity to create new notes
function addNote() {
    let mainContainer = document.getElementById("main");
    let noOfChildElems = mainContainer.childElementCount;
    let addnoteBox = document.getElementById("add-notes-box");
    let newNote = document.createElement("div");
    newNote.setAttribute("class", "notes-box");
    newNote.innerHTML = `<img id="${"close" + noOfChildElems}" onclick="deleteNode(this.id)" src="icons/x-circle.svg" class="delete">
                        <div class="notes-title">
                        <p class="notes-text">TITLE TEXT</p>
                        <a id="${"title" + noOfChildElems}" name="title" class="notes-edit" onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>
                    </div>
                    <hr class="notes-hr">
                    <div class="notes-main">
                        <p class="notes-text">Notes Text</p>
                        <a id="${"main" + noOfChildElems}" name="main" class="notes-edit" onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>
                    </div>
                    <img id=${"addBtn" + noOfChildElems} src="icons/plus.svg" onclick="addTextArea(this.id)" style="background-color: khaki; margin: 0 117px; cursor: pointer;"></img>`;
    mainContainer.insertBefore(newNote, addnoteBox);
    addToLocalStorage();
}

//Add the ability to add additional text to each note
function addTextArea(id) {
    let addBtn = document.getElementById(id);
    let parent = addBtn.parentNode;
    let textArea = document.createElement("div");
    textArea.setAttribute("class", "notes-main");
    textArea.innerHTML = `<p class="notes-text">Notes Text</p>
    <a id=${id + "&" + (parent.childElementCount - 4)} class="notes-edit" name="main&" onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>`;
    parent.insertBefore(textArea, addBtn);
    let idValue = Number(id.substring(6));
    let mainStorage = JSON.parse(localStorage.getItem("main"));
    mainStorage[idValue - 1].push("Notes Text");
    localStorage.setItem("main", JSON.stringify(mainStorage));
}

//adds the ability to delete notes
function deleteNode(id) {
    //console.log(`${id} is deleted`);
    let titleStorage = JSON.parse(localStorage.getItem("title"));
    let mainStorage = JSON.parse(localStorage.getItem("main"));
    let idValue = id.substring(5);
    idValue = Number(idValue);
    //console.log(idValue)
    let test = titleStorage.splice(idValue - 1, 1);
    mainStorage.splice(idValue - 1, 1);
    //console.log(test);
    localStorage.setItem("title", JSON.stringify(titleStorage));
    localStorage.setItem("main", JSON.stringify(mainStorage));
    let mainContainer = document.getElementById("main");
    let noOfChildElems = mainContainer.childElementCount;
    for (let i = 0; i < (noOfChildElems - 1); i++) {
        let child = mainContainer.children[0];
        mainContainer.removeChild(child);
    }
    showNotes();
}

//supporting function for addNote
function addToLocalStorage() {
    let titleStorage = localStorage.getItem("title");
    let mainStorage = localStorage.getItem("main");
    if (mainStorage === null && titleStorage === null) {
        mainStorage = [];
        titleStorage = [];
    }
    else {
        titleStorage = JSON.parse(titleStorage);
        mainStorage = JSON.parse(mainStorage);
    }
    mainStorage.push(["Notes Text"]);
    titleStorage.push(["TITLE TEXT"]);
    localStorage.setItem("title", JSON.stringify(titleStorage));
    localStorage.setItem("main", JSON.stringify(mainStorage));
}

//supporting function for editText
function updateLocalStorage(id, type, text) {
    //console.log(id);
    let storage;
    if (type == "main&") {
        storage = JSON.parse(localStorage.getItem("main"));
        let indexOf = id.indexOf("&");
        let idValue = id.substring(6, indexOf);
        idValue = Number(idValue);
        //console.log(idValue);
        let index = Number(id.substring(indexOf + 1));
        storage[idValue - 1][index] = text;
        localStorage.setItem("main", JSON.stringify(storage));
    }
    else {
        storage = JSON.parse(localStorage.getItem(type));
        let idValue = id.substring(type.length);
        idValue = Number(idValue);
        storage[idValue - 1][0] = text;
        localStorage.setItem(type, JSON.stringify(storage));
    }
}

//displays all notes stored in local storage
function showNotes() {
    let titleStorage = localStorage.getItem("title");
    let mainStorage = localStorage.getItem("main");
    if (mainStorage === null && titleStorage === null) {
        mainStorage = [];
        titleStorage = [];
    }
    else {
        titleStorage = JSON.parse(titleStorage);
        mainStorage = JSON.parse(mainStorage);
    }
    let length = mainStorage.length;
    //console.log(length);
    let mainContainer = document.getElementById("main");
    let addnoteBox = document.getElementById("add-notes-box");
    let html = '';
    for (let i = 0; i < length; i++) {
        let newNote = document.createElement("div");
        newNote.setAttribute("class", "notes-box");
        newNote.innerHTML = `<img id="${"close" + (i + 1)}" onclick="deleteNode(this.id)" src="icons/x-circle.svg" class="delete">
                        <div class="notes-title">
                        <p class="notes-text">${titleStorage[i][0]}</p>
                        <a id="${"title" + (i + 1)}" name="title" class="notes-edit" onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>
                    </div>
                    <hr class="notes-hr">
                    <div class="notes-main">
                        <p class="notes-text">${mainStorage[i][0]}</p>
                        <a id="${"main" + (i + 1)}" name="main" class="notes-edit" onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>
                    </div>
                    <img id=${"addBtn" + (i + 1)} src="icons/plus.svg" onclick="addTextArea(this.id)" style="background-color: khaki; margin: 0 117px; cursor: pointer;"></img>`;
        mainContainer.insertBefore(newNote, addnoteBox);
        let id = "addBtn" + (i + 1);
        let addBtn = document.getElementById(id);
        for (let j = 1; j < mainStorage[i].length; j++) {
            let parent = addBtn.parentNode;
            let textArea = document.createElement("div");
            textArea.setAttribute("class", "notes-main");
            textArea.innerHTML = `<p class="notes-text">${mainStorage[i][j]}</p>
                                    <a id=${id + "&" + (parent.childElementCount - 4)} class="notes-edit" name="main&" onclick="editText(this.id,this.name)"><img src="icons/edit-2.svg" class="notes-edit"></a>`;
            parent.insertBefore(textArea, addBtn);
        }
    }

}

//Search function in notes
let search = document.getElementById("search");
search.addEventListener("input", function () {
    let searchText = search.value.toLowerCase();
    let notes = document.getElementsByClassName("notes-box");
    Array.from(notes).forEach(function (e) {
        let flag = true;
        titleText = e.children[1].innerText.toLowerCase();
        if (titleText.includes(searchText)) {
            e.style.display = "block";
            flag = false;
        }
        else if (flag) {
            for (let i = 3; i < e.childElementCount - 1; i++) {
                notesText = e.children[i].innerText.toLowerCase();
                if (notesText.includes(searchText)) {
                    e.style.display = "block";
                    flag = false;
                }
            }
        }
        if(flag){
            e.style.display = "none";
        }
    });
});

function sideBar() {
    let sideBar = document.getElementById("side-menu");
    sideBar.classList.toggle("open");
}

function changeBackground(src) {
    document.body.style.backgroundImage = `url(${src})`
}