import { Task } from "./classes"
import { ProjectsDOM, TasksDOM, StyleDOM, wholeApp } from "./DOM";
import { Input, GetInput } from "./inputs"
import { Storage } from "./storage"
import { filter } from "./filters"

const UI = (function(){

    // -- Global variables -- //

    let allTasksArray = [{project:"example project", title:"Example Task", date: wholeApp.currentDate(), note: "This is an example task.", completed: "False", id: 1}]
    let allProjectsArray = [ "example project" ]
    let currentlySelectedProject = "all"

    const updateTasksCompleted = function(array){
        wholeApp.updateNumberOfTasks(filter.completedTasks(array),array.length)
    }

    const resetToAll = () => {
        currentlySelectedProject = "all"
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.resetCurrentlySelected()
    }

    const removeTaskFromArray = (taskID) => {
        const indexOfTask = allTasksArray.map(task => task.id == taskID).indexOf(true)
        allTasksArray.splice(indexOfTask, 1)
    }

    const changeReadStatus = (taskID) => {

        const indexOfTask = allTasksArray.map(task => task.id == taskID).indexOf(true)

        if(allTasksArray[indexOfTask].completed){
            allTasksArray[indexOfTask].completed = false
        } else {
            allTasksArray[indexOfTask].completed = true
        }

    }

    // -- Event Listeners -- //

    Input.newProject(() => {
        const projectInput = GetInput.projectName().toLowerCase();
        
        if(projectInput === "all" || projectInput === "this week" || projectInput === "today"){
            console.log("Can't use one of the filter names")
            return
        }

        if(allProjectsArray.indexOf(projectInput) != -1){
            console.log("Can't use the same name")
            return
        }

        if(projectInput === ""){
            console.log("Needs an input")
            return
        }

        ProjectsDOM.renderSingle(projectInput)
        allProjectsArray.push(projectInput)
        Storage.saveProjects(allProjectsArray)

    })

    Input.chooseProject((e) => {
        const clickedProjectName = e.target.parentNode.id
        currentlySelectedProject = clickedProjectName.toLowerCase();
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.addCurrentlySelected(e.target)


        if(clickedProjectName === "this week" || clickedProjectName === "today"){
            const filteredArray = filter.byPreset(allTasksArray, currentlySelectedProject);
            TasksDOM.clearAndRenderTasks(filteredArray)
            updateTasksCompleted(filteredArray)
            return
        }

        if(clickedProjectName === "all"){
            TasksDOM.clearAndRenderTasks(allTasksArray)
            updateTasksCompleted(allTasksArray)
            return
        } 

        const filteredList = filter.byProject(allTasksArray, currentlySelectedProject);
        TasksDOM.clearAndRenderTasks(filteredList)
        updateTasksCompleted(filteredList)

    })

    Input.deleteProject( e => {

        let clickedProjectElement = e.target.parentNode.id != "" ? e.target.parentNode : e.target.parentNode.parentNode;

        ProjectsDOM.deleteSingle(clickedProjectElement)
        allProjectsArray.splice(allProjectsArray.indexOf(clickedProjectElement.id.toLowerCase()), 1)

        if(clickedProjectElement.id === currentlySelectedProject){
            resetToAll();
        }

        Storage.saveProjects(allProjectsArray)

    })

    Input.newTask(() => {

        const taskInputData = GetInput.form()

        if(taskInputData === null){
            return
        }

        const task = new Task(taskInputData[0], taskInputData[1], taskInputData[2], currentlySelectedProject)

        if(currentlySelectedProject != "this week" && currentlySelectedProject != "today"){
            console.log("not this week or today")
            TasksDOM.renderSingle(task);
        }

        allTasksArray.push(task)
        Storage.saveTasks(allTasksArray)

    })

    Input.taskEditDelete((e) => {
        
        let clickedNode = e.target.closest(".taskContainer")

        if(clickedNode === null){
            return
        }

        if(e.target.classList.contains("taskDeleteButton")){
            removeTaskFromArray(clickedNode.id)
            clickedNode.remove();
            Storage.saveTasks(allTasksArray);
        } else if(e.target.classList.contains("taskEditButton")) {

            console.log("edit")

        } else {

            TasksDOM.changeStatus(clickedNode)
            changeReadStatus(clickedNode.id)
            Storage.saveTasks(allTasksArray)

        }

    })

    // -- On Load -- //

    if(Storage.loadProjects() != null){
        allProjectsArray = Storage.loadProjects()
    }

    if(Storage.loadTasks() != null){
        allTasksArray = Storage.loadTasks()
    }
    
    wholeApp.setDateInputParameters();
    TasksDOM.clearAndRenderTasks(allTasksArray)
    ProjectsDOM.renderAll(allProjectsArray)


})();

export { UI }