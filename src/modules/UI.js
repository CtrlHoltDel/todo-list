import { DOM } from "./DOM";
import { Project } from "./constructors";
import { newProjectName, projectListEvent } from "./input";

const UI = (function () {
	//Setting keys for the storage of the full array and currently selected item.
	let projectArrayKey = "LOCAL_STORAGE_CURRENT_ITEM";
	let projectCurrentKey = "LOCAL_STORAGE_CURRENT_PROJECT";

	//The array that contains all the information.
	let projectArray = [];
	let selectedProject = localStorage.getItem(projectCurrentKey);

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

	//A function that creates a new project with empty tasks and a random ID.
	const newProject = function (projName) {
		projectArray.push(new Project(projName));
		DOM.renderProjectList(projectArray);
		saveProject();
	};

	//Adds an event listener for the project list window.
	projectListEvent(function (e) {
		const newProjectNameInput = document.getElementById("addProjectInput");
		//If it's an item in the list it
		//Changes the currently selected project variable
		//Clears the "currently selected" style from all
		//Adds it to the clicked element
		//And changes the currently selected variable within the local storage.
		if (e.target.classList.contains("projectListLI")) {

			selectedProject = e.target.id;

			DOM.addTitle(getProjectFromId(selectedProject).project_Name)

			DOM.clearProjectListStyle();

			document.getElementById(e.target.id).classList.add("currentlyselected");

			localStorage.setItem(projectCurrentKey, e.target.id);
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

	////Below is what happens on first load.
	//Rendering the whole current projectArray
	//If there is already a selected project - adding the classlist to the project
	//Adding the current title if one is selected.

	DOM.renderProjectList(projectArray);

	if (selectedProject != null) {
		document.getElementById(selectedProject).classList.add("currentlyselected");
	}

	DOM.addTitle(getProjectFromId(selectedProject).project_Name)

})();

export { UI };
