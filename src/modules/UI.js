import Task from "./classes"
import { ProjectsDOM, StyleDOM, wholeApp } from "./DOM";
import { Input, GetInput } from "./inputs"
import { Storage } from "./storage"

const UI = (function(){

    // -- Global variables -- //

    const allTasksArray = []
    let projectsArray = [ "car", "cleaning", "website"]
    let currentlySelectedProject = "all"

    const resetToAll = function(){
        currentlySelectedProject = "all"
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.resetCurrentlySelected()
    }

    // -- Event Listeners -- //

    Input.newProject(function(e){
        const projectInput = GetInput.projectName()

        if(projectsArray.indexOf(projectInput) != -1){
            console.log("Can't use the same name")
            return
        }

        if(projectInput === ""){
            console.log("Needs an input")
            return
        }

        ProjectsDOM.renderSingle(projectInput)
        projectsArray.push(projectInput)
        console.log(projectsArray)
        Storage.saveProjects(projectsArray)
    })

    Input.chooseProject(function(e){
        const clickedProjectName = e.target.parentNode.id
        currentlySelectedProject = clickedProjectName
        wholeApp.changeTitle(currentlySelectedProject)
        StyleDOM.addCurrentlySelected(e.target)
    })

    Input.deleteProject(function(e){

        let clickedProjectElement = e.target.parentNode.id != "" ? e.target.parentNode : e.target.parentNode.parentNode;

        ProjectsDOM.deleteSingle(clickedProjectElement)
        projectsArray.splice(projectsArray.indexOf(clickedProjectElement.id.toLowerCase()), 1)

        if(clickedProjectElement.id === currentlySelectedProject){
            resetToAll();
        }

        Storage.saveProjects(projectsArray)

    })

    // -- On Load -- //

    if(Storage.loadProjects() != null){
        projectsArray = Storage.loadProjects()
    }
    ProjectsDOM.renderAll(projectsArray)


})();

export { UI }