import { Task } from "./classes"
import { ProjectsDOM, TasksDOM, StyleDOM, wholeApp } from "./DOM";
import { Input, GetInput } from "./inputs"
import { Storage } from "./storage"
import { filter } from "./filters"

const UI = (function(){

    // -- Global variables -- //

    let allTasksArray = [{project:"example project", title:"Example Task", date: "2021-10-02", note: "This is an example task.", completed: "False", id: 1}]
    let allProjectsArray = [ "example project" ]
    let currentlySelectedProject = "all"

    const resetToAll = () => {
        currentlySelectedProject = "all"
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.resetCurrentlySelected()
    }

    const deleteTaskFromArray = (taskID) => {
        let indexOfTask = allTasksArray.map(task => task.id == taskID).indexOf(true)
        allTasksArray.splice(indexOfTask, 1)
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

        if(clickedProjectName === "this Week"){
            TasksDOM.clearTasks();
        }

        if(clickedProjectName === "today"){
            TasksDOM.clearTasks();
        }

        if(clickedProjectName === "all"){
            TasksDOM.clearAndRenderTasks(allTasksArray)
            return
        } 

        const filteredList = filter.byProject(allTasksArray, currentlySelectedProject);
        TasksDOM.clearAndRenderTasks(filteredList)

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
        console.log(allTasksArray)
        const taskInputData = GetInput.form()

        if(taskInputData === null){
            return
        }

        const task = new Task(taskInputData[0], taskInputData[1], taskInputData[2], currentlySelectedProject)


        console.log(currentlySelectedProject)

        TasksDOM.renderSingle(task);

        allTasksArray.push(task)
        
        Storage.saveTasks(allTasksArray)
    })

    Input.taskEditDelete((e) => {

        
        let clickedNode 

        if(e.target.parentNode.parentNode.parentNode.classList.contains("taskContainer")){
            clickedNode = e.target.parentNode.parentNode.parentNode
        } else {
            clickedNode = e.target.parentNode.parentNode.parentNode.parentNode
        }

        const taskClickedID = clickedNode.id


        if(e.target.classList.contains("taskDeleteButton")){
            //Find a better way of doing this 

            deleteTaskFromArray(taskClickedID);
            clickedNode.remove();
            Storage.saveTasks(allTasksArray);

        } else {

            console.log(clickedNode.children)
        }
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