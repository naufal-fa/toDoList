// Select Element
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

// Classes Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id   

// Get item from localStorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
// If data isn't empty
    LIST = [];
    id = 0;
}

// Load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Menampilkan Tanggal
const options = {weekday : "long", month:"long", day:"numeric"};
const today = new Date ();

dateElement.innerHTML = today.toLocaleDateString("id", options);

// Add to do Function
function addToDo(toDo, id, done, trash) {

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Function untuk memasukkan nilai
document.addEventListener("keyup", function(even) {
    if(event.keyCode == 13) {
        const toDo = input.value

        // Jika input tidak kosong
        if(toDo) {
            addToDo(toDo, id, false, false)

            LIST.push ({
                name : toDo, 
                id : id,
                done : false,
                trash: false
            })

            // Menambahkan item ke localStorage
            localStorage.setItem("TODO", JSON.stringify(LIST))

            id++
        }
        input.value = ""
    }
})

// Complete to do
function completeToDo (element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}

// Untuk mengaktifkan logo tong sampah
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
}

// Target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target // Return the clicked element inside list
    const elementJob = element.attributes.job.value // Complete or Delete

    if (elementJob == "complete") {
        completeToDo(element)
    }
    else if (elementJob == "delete"){
        removeToDo(element)
    }
    
    // Add item to localStorage
    localStorage.setItem("TODO", JSON.stringify(LIST))
})