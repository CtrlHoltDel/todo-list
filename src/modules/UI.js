import { DOM } from "./DOM";
import { Project, Task } from "./constructors";
import {
	projectSubmitButton,
	formSubmitButton,
	hoverTaskCheck,
	hoverTaskOut,
	timeRemainingProject,
	taskContainer,
} from "./input";

const UI = (function () {
	let projectArrayKey = "LOCAL_STORAGE_CURRENT_ITEM";
	let projectCurrentKey = "LOCAL_STORAGE_CURRENT_PROJECT";

	let projectArray = [];
	let selectedProjectID = localStorage.getItem(projectCurrentKey);
	console.log(selectedProjectID);

	const getProjectFromId = function (id) {
		return projectArray.find((project) => project.id == id);
	};

	const loadProject = (function () {
		if (localStorage.getItem(projectArrayKey) != null) {
			projectArray = JSON.parse(localStorage.getItem(projectArrayKey));
		}
	})();

	const saveProject = function () {
		const stringifiedJson = JSON.stringify(projectArray);
		localStorage.setItem(projectArrayKey, stringifiedJson);
	};

	const newProject = function (projName) {
		//Creates a new project
		let newProject = new Project(projName);

		//Pushes the project to the array.
		projectArray.push(newProject);

		//Adds the new project to the DOM
		DOM.prependNewProject(newProject);

		//Saves the whole array to local storage.
		saveProject();
	};

	const taskListCreate = function (project) {
		DOM.createTaskListDiv();
		DOM.renderAllTasks(project);
	};

	const deleteTask = function (taskID, projectID) {
		let projectIndex = projectArray.findIndex(
			(project) => project.id == projectID
		);
		let taskIndex = projectArray[projectIndex].tasks.findIndex(
			(task) => task.id === taskID
		);

		projectArray[projectIndex].tasks.splice(taskIndex, 1);
		saveProject();
	};

	const deleteProject = function (projectID) {
		let projectIndex = projectArray.findIndex(
			(project) => project.id == projectID
		);
		projectArray.splice(projectIndex, 1);
		saveProject();
	};

	const projects = (function () {
		projectSubmitButton(function (e) {
			const newProjectNameInput =
				document.getElementById("addProjectInput");

			if (
				e.target.classList.contains("addProjectDiv") ||
				e.target.classList.contains("projectListLI")
			) {
				if (e.target.classList.contains("addProjectDiv")) {
					selectedProjectID = e.target.parentNode.id;
				} else {
					selectedProjectID = e.target.id;
				}

				DOM.addTitle(getProjectFromId(selectedProjectID));

				DOM.clearProjectListStyle();
				document
					.getElementById(selectedProjectID)
					.childNodes[1].classList.add("currentlyselected");
				localStorage.setItem(projectCurrentKey, selectedProjectID);

				taskListCreate(getProjectFromId(selectedProjectID));
			}

			if (e.target.classList.contains("deleteProjectDiv")) {
				deleteProject(e.target.parentNode.id);
				DOM.deleteElement(e.target.parentNode);
				DOM.addTitle(getProjectFromId(selectedProjectID));
				return;
			}

			if (e.target.id === "addProjectButton") {
				if (newProjectNameInput.value === "") {
					return;
				} else {
					newProject(newProjectNameInput.value);
					newProjectNameInput.value = "";
				}
			}
		});
	})();

	const forms = (function () {
		formSubmitButton(function (e) {
			if (getProjectFromId(selectedProjectID) === undefined) {
				console.log("There is no project to add a task to");
			}

			DOM.formErrorMessage();

			if (DOM.checkMissingItemsForm()) {
				return;
			}

			DOM.checkForNoTasks();

			const inputFormInfo = DOM.getInfoForm();

			let currentTask = new Task(
				inputFormInfo[0],
				inputFormInfo[1],
				inputFormInfo[2]
			);
			let currentProject = getProjectFromId(selectedProjectID);
			currentProject.tasks.push(currentTask);
			DOM.createTask(currentTask);

			DOM.checkForNoTasks();

			DOM.resetForm();

			saveProject();
		});
	})();

	const tasks = (function () {
		let currentTask;

		hoverTaskCheck(function (e) {
			if (e.target.parentNode.classList.contains("taskContainer")) {
				const hoveredItemId = e.target.parentNode.id;
				currentTask = getProjectFromId(selectedProjectID).tasks.filter(
					(task) => task.id === e.target.parentNode.id
				);

				console.log(hoveredItemId);

				if (currentTask[0].completed) {
					e.target.parentNode.children[1].innerHTML = "Completed";
				} else {
					e.target.parentNode.children[1].innerHTML =
						timeRemainingProject(currentTask[0].dueDate);
				}
			}
		});

		hoverTaskOut(function (e) {
			if (e.target.parentNode.classList.contains("taskContainer")) {
				e.target.parentNode.children[1].innerHTML =
					currentTask[0].dueDate;
			}
		});

		taskContainer(function (e) {
			if (
				e.target.classList.contains("deleteTaskContainer") ||
				e.target.parentNode.classList.contains("deleteTaskContainer")
			) {
				let element;
				if (e.target.parentNode.classList.contains("taskContainer")) {
					element = e.target.parentNode;
				} else if (
					e.target.parentNode.parentNode.classList.contains(
						"taskContainer"
					)
				) {
					element = e.target.parentNode.parentNode;
				}

				deleteTask(currentTask[0].id, selectedProjectID);
				DOM.deleteElement(element);

				if (getProjectFromId(selectedProjectID).tasks.length === 0) {
					taskListCreate(getProjectFromId(selectedProjectID));
				}
			}

			if (e.target.parentNode.classList.contains("taskContainer")) {
				DOM.changeStatus(e.target.parentNode);
				if (currentTask[0].completed) {
					e.target.parentNode.children[1].innerHTML =
						timeRemainingProject(currentTask[0].dueDate);
					currentTask[0].completed = false;
				} else {
					e.target.parentNode.children[1].innerHTML = "Completed";
					currentTask[0].completed = true;
				}

				saveProject();
			}
		});
	})();

	const firstLoad = (function () {
		DOM.setValuesDateForm();

		DOM.renderProjectList(projectArray);

		DOM.addTitle(getProjectFromId(selectedProjectID));

		if (selectedProjectID != null && projectArray.length != 0) {
			document
				.getElementById(selectedProjectID)
				.childNodes[1].classList.add("currentlyselected");
			taskListCreate(getProjectFromId(selectedProjectID));
		}

		document
			.getElementById("headerOverallTitle")
			.addEventListener("click", function () {
				console.log(projectArray);
			});
	})();
})();

export { UI };
