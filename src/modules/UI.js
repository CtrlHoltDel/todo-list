import { DOM } from "./DOM";
import { Project, Task } from "./constructors";
import { projectSubmitButton, formSubmitButton } from "./input";

const UI = (function () {
	//Setting keys for the storage of the full array and currently selected item.
	let projectArrayKey = "LOCAL_STORAGE_CURRENT_ITEM";
	let projectCurrentKey = "LOCAL_STORAGE_CURRENT_PROJECT";

	//The array that contains all the information.
	let projectArray = [];
	let selectedProjectID = localStorage.getItem(projectCurrentKey);

	//A function to load the storage from the array.
	const loadProject = function () {
		if (localStorage.getItem(projectArrayKey) != null) {
			projectArray = JSON.parse(localStorage.getItem(projectArrayKey));
		}
	};

	const getProjectFromId = function(id){
		return projectArray.find(project => project.id == id)
	}

	//Called straight away.
	loadProject();

	//A function that can be called to stringify and save the project.
	const saveProject = function () {
		const stringifiedJson = JSON.stringify(projectArray);
		localStorage.setItem(projectArrayKey, stringifiedJson);
	};

	//A function that creates a new project with empty tasks and a random ID - adds to dom and array.
	const newProject = function (projName) {
		//Creates a new project
		let newProject = new Project(projName)

		//Pushes the project to the array.
		projectArray.push(newProject);

		//Adds the new project to the DOM
		DOM.prependNewProject(newProject);

		//Saves the whole array to local storage.
		saveProject();
	};

	//Creating all the tasks into divs
	const taskListCreate = function(project){
		DOM.createTaskListDiv();
		DOM.renderAllTasks(project);	
	}

	//Adds an event listener for the project list window.
	projectSubmitButton(function (e) {
		const newProjectNameInput = document.getElementById("addProjectInput");
		//If it's an item in the list it
		//Changes the currently selected project variable
		//Clears the "currently selected" style from all
		//Adds it to the clicked element
		//And changes the currently selected variable within the local storage.
		if (e.target.classList.contains("projectListLI")) {

			//Gets the ID of the selected project
			selectedProjectID = e.target.id;

			//Adds a title to the header
			DOM.addTitle(getProjectFromId(selectedProjectID).project_Name)

			//Removes the style from all the list.
			DOM.clearProjectListStyle();
			document.getElementById(e.target.id).classList.add("currentlyselected");
			localStorage.setItem(projectCurrentKey, e.target.id);

			taskListCreate(getProjectFromId(selectedProjectID))
			
		}

		//If the object clicked is the submit button for the input
		if (e.target.id === "addProjectButton") {
			if (newProjectNameInput.value === "") {
				return;
			} else {
				newProject(newProjectNameInput.value);
				newProjectNameInput.value = "";
			}
		}

	});

	//Event for when the submit button is pressed
	formSubmitButton(function(e){

		//Checks if any of the forms are emperrorFormty and if so displays an error.
		DOM.formErrorMessage();
	
		//Check if there's missing items, if so - stops the function.
		if(DOM.checkMissingItemsForm()){
			return
		}

		//Getting the info from the form.
		const inputFormInfo = DOM.getInfoForm()

		//Creating a new task and pushing it to the current project.
		let currentTask = new Task(inputFormInfo[0], inputFormInfo[1], inputFormInfo[2])
		let currentProject = getProjectFromId(selectedProjectID)
		currentProject.tasks.push(currentTask)

		//Clears the input form
		DOM.resetForm();

		//Saving the whole project after a new task has been added.
		saveProject();
	});

	////Below is what happens on first load.
	//Rendering the whole current projectArray
	//If there is already a selected project - adding the classlist to the project
	//Adding the current title if one is selected.

	DOM.renderProjectList(projectArray);

	if (selectedProjectID != null) {
		document.getElementById(selectedProjectID).classList.add("currentlyselected");
		DOM.addTitle(getProjectFromId(selectedProjectID).project_Name)
		taskListCreate(getProjectFromId(selectedProjectID));
	}


	document.getElementById("headerOverallTitle").addEventListener("click", function(){
		console.log(projectArray)
	})
})();

export { UI };
