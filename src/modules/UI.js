import { Storage } from "./storage";
import { Inputs } from "./inputs";
import { TaskDOM, ProjectsDOM, EditModal } from "./DOM";
import { filterTaskList, filterByDate, indexOfTask } from "./misc";

class Task {
    constructor(title, date, note, project){
    this.project = project,
    this.title = title,
    this.date = date,
    this.note = note,
    this.complteted = false,
    this.id = Math.random();
  }
}

const UI = (function () {

	// -- Global variables -- //

	let tasksArray = [];
	let projectsArray = ["misc"];
    let currentlySelectedProject = "misc"

    // -- Variable functions -- //

    const deleteTask = function(index){
        tasksArray.splice(index, 1);
    }

    const resetAndCreateTasks = function(){
        const filteredArray = filterTaskList(tasksArray, currentlySelectedProject);
        TaskDOM.renderTaskList(filteredArray);
    }

    const getTaskByID = function(id){
        const currentTask = tasksArray.filter(task => task.id == id)
        return currentTask
    }

	// -- Loading from Local Storage -- //

	if (Storage.loadTasks() != null && Storage.loadTasks()[0] != undefined) {
		tasksArray = Storage.loadTasks();
		console.warn("something in task storage");
	}

	if (Storage.loadProjects() != null) {
		projectsArray = Storage.loadProjects();
		console.warn("something in project storage");
	}

    if (Storage.loadCurrentProject() != null ) {
        currentlySelectedProject = Storage.loadCurrentProject();
    }

	// -- Event Listeners -- //

	Inputs.projectSubmit(function (e) {
		const projectInput = Inputs.getProjectInput();

        if(projectInput === null){
            return
        }

        if(projectsArray.indexOf(projectInput) != -1){
            console.warn("already a project with this name - Add visual warning.")
            return
        }

        ProjectsDOM.addSingleProject(projectInput);
        projectsArray.push(projectInput);

        currentlySelectedProject = projectInput

        ProjectsDOM.addCurrentlySelectedStyle(currentlySelectedProject)
        const filteredArray = filterTaskList(tasksArray, currentlySelectedProject);
        TaskDOM.renderTaskList(filteredArray);


        Storage.saveCurrentProject(projectInput);
        Storage.saveAll(projectsArray, tasksArray);
        return;

	});

    Inputs.projectSelect(function(e){

        //Keeping and memorizing the selected ID.
        const selectedID = e.target.parentNode.id
        currentlySelectedProject = selectedID
        ProjectsDOM.addCurrentlySelectedStyle(selectedID)
        Storage.saveCurrentProject(selectedID)

        //Changing the tasks.
        const filteredArray = filterTaskList(tasksArray, currentlySelectedProject);
        TaskDOM.renderTaskList(filteredArray);

    })

    Inputs.projectDelete(function(e){
        
        const selectedProject = e.target.parentNode.id
        console.log(e.target.parentNode.id)

        if(e.target.parentNode.id === currentlySelectedProject){
            currentlySelectedProject = "misc"
            ProjectsDOM.addCurrentlySelectedStyle(currentlySelectedProject);
            resetAndCreateTasks();
        }

        if(selectedProject === "misc"){
            console.warn("You can't delete misc")
            return
        }

        const indexOfProject = projectsArray.indexOf(selectedProject)
        projectsArray.splice(indexOfProject, 1)
        e.target.parentNode.remove();

        let idOfTasksWithProject = []

        tasksArray.forEach(task => {
            if(task.project === selectedProject){
                idOfTasksWithProject.push(task.id)
            }
        })

        idOfTasksWithProject.forEach(id => deleteTask(id))

        Storage.saveAll(projectsArray, tasksArray);
        
    })
    
    Inputs.taskSubmit(function (e){

        const taskInputArray = Inputs.getTaskInputs()

        if(taskInputArray === null){
            return
        }

        const addedTask = new Task(taskInputArray[0], taskInputArray[1], taskInputArray[2], currentlySelectedProject)
        TaskDOM.createTaskDiv(addedTask)
        tasksArray.push(addedTask)
        Storage.saveAll(projectsArray, tasksArray);

    })

    Inputs.taskClick(function (e){


        const selectedTaskID = e.target.parentNode.id
        const indexOfTheTask = indexOfTask(tasksArray, selectedTaskID)
        const currentTask = getTaskByID(selectedTaskID)
        
        if(e.target.classList.contains("taskHoverCheck")){
            console.log("Change the done status")
        }

        if(e.target.classList.contains("taskHoverDelete")){
            deleteTask(indexOfTheTask);
            e.target.parentNode.remove();
            Storage.saveAll(projectsArray, tasksArray);
        }

        if(e.target.classList.contains("taskHoverEdit")){

            EditModal.editTask(currentTask[0])
            Inputs.editModalSubmit(function(e){
                console.log(currentTask)
            })
        

        }       

    })

	Inputs.taskMouseover(function (e) {
		if (e.target.classList.contains("taskHoverDelete")) {
			//Ignoring the delete key when hovering over the project.
			return;
		}
		if (e.target.parentNode.classList.contains("taskHoverCheck")) {
			//Hovering over the title, description and date.
		}
	});

    Inputs.loadAllTasks(function (e){
        TaskDOM.renderAllTasks(tasksArray, projectsArray);
        currentlySelectedProject = "filtered"
    })

    Inputs.loadThisWeek(function(e){
        const filteredArray = filterByDate(tasksArray, "week");
        TaskDOM.renderAllTasks(filteredArray, projectsArray);
        currentlySelectedProject = "filtered"
    })

    Inputs.loadThisMonth(function(e){
        const filteredArray = filterByDate(tasksArray, "month")
        TaskDOM.renderAllTasks(filteredArray, projectsArray);
        currentlySelectedProject = "filtered"
    })

	// -- On first Load -- //

    if(projectsArray.indexOf(currentlySelectedProject) === -1){
        currentlySelectedProject = "misc"
    }

    if(projectsArray[0] === undefined){
        projectsArray.push("misc")
    }
    
	ProjectsDOM.renderAllProjects(projectsArray);
    ProjectsDOM.addCurrentlySelectedStyle(currentlySelectedProject);

    resetAndCreateTasks();

    if (currentlySelectedProject === "allProjects"){
        TaskDOM.renderAllTasks(tasksArray, projectsArray);
    }

    if (tasksArray.length === 0){
        console.log("Explain new stuff!")
    }
    

})();

export { UI };
