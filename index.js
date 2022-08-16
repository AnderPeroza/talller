const nameUser = document.getElementById("nameRegister")
const lastNameUser = document.getElementById("lastnameRegister")
const emailUser = document.getElementById("emailRegister")
const passwordUser = document.getElementById("passwordRegister")


const buttonRegister = document.getElementById("buttonRegister")

buttonRegister.addEventListener("click", ()=>{
    console.log("holaaaaaa")

    const newUser = {
        "name": nameUser.value, 
        "lastName": lastNameUser.value,
        "email": emailUser.value,
        "password": passwordUser.value 
    }

    console.log(newUser)
    const info = fetch('https://graco-task-list.herokuapp.com/register', {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {"Content-type": "application/json; charset=UTF-8"}})

    

})