// Variables to store the page data
const add = document.getElementById("add");
const task_form = document.getElementById("task_form");
const close = document.getElementById("close");
const blank = document.getElementById("blank");
const addBtn = document.getElementById("addBtn");
const remove = document.getElementById("remove");
const titleTag = document.getElementById("title");
const descTag = document.getElementById("description");
const tasks = document.getElementById("tasks");
const frmtitle = document.getElementById("frmTitle");

// Event listner to show the form
add.addEventListener("click", () => {
    frmtitle.innerText = "ADD A TASK";
    addBtn.innerText = "ADD TASK";
    task_form.classList.add("show")
    blank.classList.add("zindex")
    titleTag.innerText = ""
    descTag.innerText = ""
    titleTag.focus()
    clearData()
})

// Event listner to hide the form
close.addEventListener("click", () => {
    task_form.classList.remove("show")
    blank.classList.remove("zindex")
})

// Variables to store some value
let isUpdate = false, updateId;
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

// Event listner to add a object in localStorage
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let title = titleTag.value;
    let description = descTag.value;
    if (title.length <= 0 || description.length <= 0) {
        alert("Please fill title and discription")
    }
    else if (title || description) {
        let noteInfo = { title, description }
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo
        }
        localStorage.setItem("notes", JSON.stringify(notes))
        close.click()
    }
    showNotes()
    clearData();
    // location.reload()
})

// Event listner to remove all objects from localStorage
remove.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.length > 0) {
        let conf = confirm("Are you sure you want to delete all items.");
        if (conf) {
            localStorage.clear()
            location.reload()
        }
    } else {
        alert("No item to delete.")
    }
    showNotes()
})

// Function to display the notes in the page
function showNotes() {
    if (!notes) return;
    document.querySelectorAll(".note").forEach((e) => e.remove())
    notes.forEach((note, id) => {
        let divTag = `<div class="note">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="icon">
                        <div onclick="updateNote(${id}, '${note.title}','${note.description}')" class="box edit">
                            <i class="fa fa-solid fa-pen fa-lg"></i>
                        </div>
                        <div onclick="deleteNote(${id})" class="box delete">
                            <i class="fa fa-solid fa-trash fa-lg"></i>
                        </div>
                    </div>
                </div>`
        tasks.insertAdjacentHTML("beforeend", divTag)
    })
}
showNotes()

// Function to delete a note
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Function to update a note
function updateNote(noteId, title, description) {
    updateId = noteId;
    isUpdate = true;
    add.click();
    titleTag.value = title;
    descTag.value = description;
    frmtitle.innerText = "UPDATE A TASK";
    addBtn.innerText = "UPDATE TASK";
}

// Function to clear the existing data
function clearData() {
    titleTag.value = "";
    descTag.value = "";
}