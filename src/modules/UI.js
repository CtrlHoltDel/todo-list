import { Storage } from "./storage";
import { Inputs } from "./inputs";
import { TaskDOM, ProjectsDOM, EditingDOM } from "./DOM";
import { filterTaskList } from "./misc";

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

	Inputs.taskMouseover(function (e) {
		if (e.target.classList.contains("taskHoverDelete")) {
			//Ignoring the delete key when hovering over the project.
			return;
		}
		if (e.target.parentNode.classList.contains("taskHoverCheck")) {
			//Hovering over the title, description and date.
		}
	});


	// -- On first Load -- //

	ProjectsDOM.renderAllProjects(projectsArray);
    ProjectsDOM.addCurrentlySelectedStyle(currentlySelectedProject);
    const filteredArray = filterTaskList(tasksArray, currentlySelectedProject);
    TaskDOM.renderTaskList(filteredArray);

})();

export { UI };
