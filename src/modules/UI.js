import { Task } from "./classes"
import { ProjectsDOM, TasksDOM, StyleDOM, wholeApp } from "./DOM";
import { Input, GetInput } from "./inputs"
import { Storage } from "./storage"
import { filter } from "./filters"

const UI = (function(){

    // -- Global variables -- //

    let allTasksArray = [{project:"example project", title:"Example Task", date: wholeApp.currentDate(), note: "This is an example task.", completed: false, id: 1}]
    let allProjectsArray = [ "example project" ]
    let currentlySelectedProject = "all"

    const removeTaskFromArray = (taskID) => {
        const indexOfTask = allTasksArray.map(task => task.id == taskID).indexOf(true)
        allTasksArray.splice(indexOfTask, 1)
    }

    const changeReadStatus = (node) => {

        TasksDOM.changeStatus(node)

        const indexOfTask = allTasksArray.map(task => task.id == node.id).indexOf(true)

        if(allTasksArray[indexOfTask].completed){
            allTasksArray[indexOfTask].completed = false
        } else {
            allTasksArray[indexOfTask].completed = true
        }

    }

    const clearAndRender = (currentTask) => {

        if(currentTask === "this week" || currentTask === "today"){
            const filteredList = filter.byPreset(allTasksArray, currentlySelectedProject);
            TasksDOM.clearAndRenderWithHeaders(filteredList)
            return
        } else if (currentTask === "all") {
            TasksDOM.clearAndRenderWithHeaders(allTasksArray)
            return
        } else {
            const filteredList = filter.byProject(allTasksArray, currentlySelectedProject);
            TasksDOM.clearAndRenderTasks(filteredList)
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

        clearAndRender(currentlySelectedProject);
    })

    Input.deleteProject( e => {

        const confirmedRemove = function(node, id, tasks){
            node.remove();
            allProjectsArray.splice(allProjectsArray.indexOf(id), 1)
        
            tasks.forEach(task => {
                removeTaskFromArray(task.id)
            })
    
            if(projectID === currentlySelectedProject){
                currentlySelectedProject = "all"
                wholeApp.changeTitle(currentlySelectedProject);
                StyleDOM.resetCurrentlySelected();
            }
    
            clearAndRender(currentlySelectedProject);
    
            Storage.saveProjects(allProjectsArray)
        }

        const clickedNode = e.target.closest(".mainContainer__projectListDiv__projectList__projectContainer")
        const projectID = clickedNode.id

        const tasksArrayIDs = allTasksArray.filter(task => {
            if(task.project === projectID){
                return task.id
            }
        })

        if(tasksArrayIDs.length === 0){
            confirmedRemove(clickedNode, projectID, tasksArrayIDs);
            return
        }

        Input.confirmDelete(function(e){
            if(e.target.classList.contains("deleteModalConfirm")){
                confirmedRemove(clickedNode, projectID, tasksArrayIDs);
                StyleDOM.removeDeleteConfirmModal();
            } else if (e.target.classList.contains("deleteModalDeny")){
                StyleDOM.removeDeleteConfirmModal();
            } else if (e.target.classList.contains("confirmDeleteProjectModal")){
                StyleDOM.removeDeleteConfirmModal();
            }
        });

    })

    Input.newTask(() => {

        const taskInputData = GetInput.form()

        if(taskInputData === null){
            return
        }

        const task = new Task(taskInputData[0], taskInputData[1], taskInputData[2], currentlySelectedProject)


        if(currentlySelectedProject === "today" || currentlySelectedProject === "this week"){
            task.project = "all"
        }
        
        allTasksArray.push(task)
        clearAndRender(currentlySelectedProject)
        Storage.saveTasks(allTasksArray)

    })

    Input.taskEditDelete((e) => {
        
        let clickedNode = e.target.closest(".taskContainer")

        if(clickedNode === null){
            return
        }

        if(e.target.classList.contains("taskDeleteButton")){
            removeTaskFromArray(clickedNode.id);
            clearAndRender(currentlySelectedProject);
            Storage.saveTasks(allTasksArray);
        } else if(e.target.classList.contains("taskEditButton")) {

            console.log("edit")

        } else {
            changeReadStatus(clickedNode)
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
    clearAndRender(currentlySelectedProject)
    ProjectsDOM.renderAll(allProjectsArray)


})();

export { UI }