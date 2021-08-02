import { Task } from "./classes"
import { ProjectsDOM, TasksDOM, StyleDOM, wholeApp } from "./DOM";
import { Input, GetInput } from "./inputs"
import { Storage } from "./storage"
import { filter } from "./filters"

const UI = (function(){

    // -- Global variables -- //

    let allTasksArray = []
    let allProjectsArray = [ "example project" ]
    let currentlySelectedProject = "all"

    const resetToAll = function(){
        currentlySelectedProject = "all"
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.resetCurrentlySelected()
    }

    // -- Event Listeners -- //

    Input.newProject(function(){
        const projectInput = GetInput.projectName()

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
        console.log(allProjectsArray)
        Storage.saveProjects(allProjectsArray)
    })

    Input.chooseProject(function(e){
        const clickedProjectName = e.target.parentNode.id
        currentlySelectedProject = clickedProjectName
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.addCurrentlySelected(e.target)

        if(clickedProjectName === "This Week" || clickedProjectName === "Today" ) return

        if(clickedProjectName === "All"){
            TasksDOM.clearAndRenderTasks(allTasksArray)
            return
        } 

        const filteredList = filter.byProject(allTasksArray, currentlySelectedProject);
        console.log(filteredList)
        TasksDOM.clearAndRenderTasks(filteredList)

    })

    Input.deleteProject(function(e){

        let clickedProjectElement = e.target.parentNode.id != "" ? e.target.parentNode : e.target.parentNode.parentNode;

        ProjectsDOM.deleteSingle(clickedProjectElement)
        allProjectsArray.splice(allProjectsArray.indexOf(clickedProjectElement.id.toLowerCase()), 1)

        if(clickedProjectElement.id === currentlySelectedProject){
            resetToAll();
        }

        Storage.saveProjects(allProjectsArray)

    })

    Input.newTask(function(){
        console.log(allTasksArray)
        const taskInputData = GetInput.form()

        if(taskInputData === null){
            return
        }

        const task = new Task(taskInputData[0], taskInputData[1], taskInputData[2], currentlySelectedProject)
        TasksDOM.renderSingle(task);
        allTasksArray.push(task)
        
        Storage.saveTasks(allTasksArray)

        console.log(allTasksArray)

    })

    // -- On Load -- //


    wholeApp.setDateInputParameters();

    if(Storage.loadProjects() != null){
        allProjectsArray = Storage.loadProjects()
    }

    if(Storage.loadTasks() != null){
        allTasksArray = Storage.loadTasks()
    }

    TasksDOM.renderAll(allTasksArray)
    ProjectsDOM.renderAll(allProjectsArray)


})();

export { UI }