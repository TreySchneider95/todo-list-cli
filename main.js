const fsLibrary  = require('fs')
const prompt = require('prompt-sync')({sigint: true});

function writeTask(){
    fsLibrary.readFile('db.txt', (error, txtString) => {;
        let arr = txtString ? txtString.toString().split('\n') : []
        let num = arr.length > 0 ? arr.length : 1
        console.log("What is this to-do item called?")
        let data = `${num}. [incomplete] ${prompt("> ")}\n`
        console.log("\n")
        fsLibrary.appendFile('db.txt', data, (error)=>{})
        setTimeout(listToDos, 100)
    })
}

function completeTask(){
    console.log("Which to-do item would you like to complete?")
    let taskNum = prompt("> ")
    console.log("\n")
    fsLibrary.readFile('db.txt', (error, txtString) => {;
        let arr = txtString.toString().split('\n')
        arr[taskNum-1] = arr[taskNum - 1].replace("[incomplete]", "[complete]")
        let data = arr.join("\n")
        fsLibrary.writeFile('db.txt', data, (error)=>{
            listToDos()
        })
    })
}

function uncompleteTask(){
    console.log("Which to-do item would you like to uncomplete?")
    let taskNum = prompt("> ")
    console.log("\n")
    fsLibrary.readFile('db.txt', (error, txtString) => {
        let arr = txtString.toString().split('\n')
        arr[taskNum-1] = arr[taskNum - 1].replace("[complete]", "[incomplete]")
        let data = arr.join("\n")
        fsLibrary.writeFile('db.txt', data, (error)=>{
            listToDos()
        })
    })
}

function listToDos(){
    fsLibrary.readFile('db.txt', (error, txtString) => {
        let arr = txtString ? txtString.toString().split('\n') : []
        let num = arr.length > 0 ? arr.length-1 : 0
        console.log(`You have ${num} to-do item(s).`)
        arr.length > 0 ? console.log(txtString.toString()) : {}
        promptInput()
    })
}

function editTask(){
    console.log("Which to-do item would you like to edit?")
    let taskNum = prompt("> ")
    console.log("What would you like it to say?")
    let newDesc = prompt("> ")
    console.log("\n")
    fsLibrary.readFile('db.txt', (error, txtString) => {
        let arr = txtString.toString().split('\n')
        task = arr[taskNum-1].split(' ')
        arr[taskNum-1] = `${task[0]} ${task[1]} ${newDesc}`
        let data = arr.join("\n")
        fsLibrary.writeFile('db.txt', data, (error)=>{
            listToDos()
        })
    })
}

function deleteTask(){
    console.log("Which to-do item would you like to delete?")
    let taskNum = prompt("> ")
    console.log("\n")
    fsLibrary.readFile('db.txt', (error, txtString) => {
        let arr = txtString.toString().split('\n')
        arr.splice(taskNum - 1, 1)
        for(let x;x<=arr.length;x++){
            let task = arr[x].split(".")
            task[0] = x + 1
            arr[x] = task.join(".")
        }
        let data = arr.join("\n")
        fsLibrary.writeFile('db.txt', data, (error)=>{
            listToDos()
        })
    })
}

function promptInput(){
    console.log("\n")
    console.log("~ Select an action ~")
    console.log("[1] Create a to-do item")
    console.log("[2] Complete a to-do item")
    console.log("[3] Uncomplete a to-do item")
    console.log("[4] Edit a to-do item")
    console.log("[5] Delete a to-do item")
    console.log("[6] Exit")
    let action = prompt("> ")
    console.log("\n")
    if(action === "1"){
        writeTask()
    }else if(action === "2"){
        completeTask()
    }else if(action === "3"){
        uncompleteTask()
    }else if(action === "4"){
        editTask()
    }else if(action === "5"){
        deleteTask()
    }else if(action === "6"){
        console.log("Goodbye")
    }else{
        console.log("Invalid input")
    }
}

listToDos()