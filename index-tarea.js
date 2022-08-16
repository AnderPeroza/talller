// aqui va todo el código

/* const btnElement = document.getElementById("add-task-btn")
console.log(btnElement)

if(btnElement){
    btnElement.addEventListener("click", function(){

    })
} */
//agarrar el elemento form

const deleteTask = (id) =>{
    //console.log("holaaaaaaaaaaaaaaaaaaaaaa")
    const taskListElement = document.getElementById("task-list")
    const elementToDelete = document.getElementById(id)
    taskListElement.removeChild(elementToDelete)
}
const taskListElement = document.getElementById("task-list")

const formElement= document.getElementById("task-form")
const selectElement = document.getElementById("taskPriority")
const inputElement = document.getElementById("taskName")
const taskDateElement = document.getElementById("taskDate")


/* if(formElement){
    //modificar el evento
    
    formElement.addEventListener("submit",function(event){
        event.preventDefault()
        const inputElement = document.getElementById("taskName")
        const taskDateElement = document.getElementById("taskDate")
        
        
        if(inputElement.value !== "" && taskDateElement.value !== ""){
            // agarrar el elemento de la lista
            
            const selectElement = document.getElementById("taskPriority")



            const taskListElement = document.getElementById("task-list")
            const taskListTitle= document.getElementById("card-title")
            


            console.log(selectElement.value)
            console.log(inputElement.value)
            console.log()
            const myDate= Date.parse(taskDateElement.value)

            

            let  mayorId= 1

            if(taskListElement.children.length > 0){
                const ultimoHijo= taskListElement.children[taskListElement.children.length - 1]
                mayorId += parseInt(ultimoHijo.id)
            }
            let backgroundColor = ""

            if(selectElement.value < 3){
                backgroundColor = "background-color: blue; color: white;"
            }else if(selectElement.value > 2 && selectElement.value < 5 ){
                backgroundColor = "background-color: yellow; "
            }else{
                backgroundColor = "background-color: red; color: white;"
            }
            
            
            
            taskListElement.innerHTML +=`
                <li id="${mayorId}"  class="list-group-item d-flex justify-content-between align-items-center"
                style="word-break: keep-all; ${backgroundColor}">
                    <div class="mx-2 text-start" style="flex: 1;">
                        <div class="fw-bold">${inputElement.value}</div>
                        <div class="fw-bold">${taskDateElement.value}</div>                        
                    </div>
                    <span class="badge bg-primary rounded-pill mx-1">${selectElement.value}</span>
            
                    <button onclick="deleteTask(${mayorId})" type="button" class="btn btn-outline-danger btn-sm">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                        </svg>
                    </button>
                </li>
            `
        }else{
            alert("Debe especificar una tarea y fecha")
        } 
    })

} */
const buttonAdd = document.getElementById("add-task-btn")

buttonAdd.addEventListener("click",async()=>{
    if(selectElement.value !== "" && inputElement.value !== "" && taskDateElement.value !== ""){
        
        const newTask = {
            "name": inputElement.value,
            "date": taskDateElement.value ,
            "priority": selectElement.value
        }
        
        const response = await fetch('https://graco-task-list.herokuapp.com/task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( newTask )
        })
        const data = await response.json()

        if(response.status === 200){
            Swal.fire(
                'Exito!',
                'Registro Exitoso',
                'success'
            )
            init()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.error}`,
                footer: ''
            })
        }

    }else{
        Swal.fire(
            'Campos Vacios',
            'Debe llenar todos los campos requeridos!',
            'error'
        )
    }
})
const init = async () =>{
    const token = localStorage.getItem('token')

    const reponse = await fetch('https://graco-task-list.herokuapp.com/task',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await reponse.json()

    console.log(data)
    let index = 0
    if(taskListElement.children.length > 0){
        const ultimoHijo= taskListElement.children[taskListElement.children.length - 1]
        index += parseInt(ultimoHijo.id)
    }
   
    taskListElement.innerHTML +=`
    <li id="${data.data[index]._id}"  class="list-group-item d-flex justify-content-between align-items-center"
    style="word-break: keep-all;">
        <div class="mx-2 text-start" style="flex: 1;">
            <div class="fw-bold">${data.data[index].name}</div>
            <div class="fw-bold">${data.data[index].date}</div>                        
        </div>
        <span class="badge bg-primary rounded-pill mx-1">${data.data[0].priority}</span>

        <button onclick="deleteTask()" type="button" class="btn btn-outline-danger btn-sm">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
        </button>
    </li>
    `
    console
}
init()









// extraer los datos nombre de la tarea y prioridad



// agregar el nuevo hijo

{/* <li class="list-group-item d-flex justify-content-between align-items-center"
    style="word-break: keep-all;">
        <div class="mx-2 text-start" style="flex: 1;">
            <div class="fw-bold">Pasear al perro</div>
        </div>
        <span class="badge bg-primary rounded-pill mx-1">2</span>

        <button type="button" class="btn btn-outline-danger btn-sm">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
        </button>
</li> */}