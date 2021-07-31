import { format } from 'date-fns'
import deleteIcon from '../assets/img/delete.png'

const DOM = (function () {

	// == Projects == //

	const renderProjectList = function (array) {
		array.forEach((project) => {
			prependNewProject(project)
		});
	};

	const prependNewProject = function (project) {
		const projectList = document.getElementById("projectsList");
		const projectListDiv = document.createElement("div")
		const deleteProjectDiv = document.createElement("div")
		const newProject = document.createElement("div");
		
		projectListDiv.classList.add("projectListLI");
		deleteProjectDiv.classList.add("deleteProjectDiv");
		newProject.classList.add("addProjectDiv")
		projectListDiv.setAttribute("id", project.id);

		deleteProjectDiv.innerHTML = "x"
		newProject.innerHTML = project.project_Name;;

		projectList.prepend(projectListDiv);
		projectListDiv.append(deleteProjectDiv);
		projectListDiv.append(newProject)
	};

	const clearProjectListStyle = function () {
		const allProjects = document.querySelectorAll(".projectListLI");

		allProjects.forEach(project => {
			project.childNodes[1].classList.remove("currentlyselected")
		})

	};

	const addTitle = function (title) {

		let headerOverallTitle = document.getElementById("headerOverallTitle");

		if(title === undefined){
			headerOverallTitle.innerHTML = "Pick a project!";
			return
		}

		headerOverallTitle.innerHTML = title.project_Name;
	};

	// == Tasks == //

	const taskDivContainer = document.getElementById("allTasksContainer");

	const createTaskListDiv = function () {
		const taskListInput = document.getElementById("taskInputForm");
		taskListInput.style.display = "flex";
	};

	const createTask = function (task) {
		const deleteSVG = new Image();
		deleteSVG.src = deleteIcon

		const taskContainer = document.createElement("div");
		taskContainer.classList.add("taskContainer")
		
		if(task.completed){
			taskContainer.classList.add("completed")
		}

		taskContainer.id = task.id
		const titleTask = document.createElement("div");
		titleTask.classList.add("titleTaskContainer")
		const descriptionTask = document.createElement("div");
		descriptionTask.classList.add("descriptionTaskContainer")
		const dateTask = document.createElement("div");
		dateTask.classList.add("dateTaskContainer")
		const deleteTask = document.createElement("div");
		deleteTask.classList.add("deleteTaskContainer")

		if (task === false) {
			taskContainer.innerHTML = "Pick a project and start adding tasks!";
			taskDivContainer.appendChild(taskContainer);
		} else {
			titleTask.innerHTML = task.title
			descriptionTask.innerHTML = task.description
			dateTask.innerHTML = task.dueDate
			deleteTask.appendChild(deleteSVG)
			taskDivContainer.appendChild(taskContainer);
			taskContainer.appendChild(titleTask)
			taskContainer.appendChild(dateTask)
			taskContainer.appendChild(descriptionTask)
			taskContainer.appendChild(deleteTask)
		}
	};

	const renderAllTasks = function (project) {

		if (project.tasks.length === 0) {

			taskDivContainer.innerHTML = ""
			if(taskDivContainer.childNodes.length >= 1){
				return
			}
			createTask(false);
		} else {

			taskDivContainer.innerHTML = ""
			project.tasks.forEach(task => createTask(task))
		}
	};

	const checkForNoTasks = function(){
		if(taskDivContainer.childNodes[0].id === "undefined"){
			taskDivContainer.innerHTML = ""
		}
	}

	// == Input Form == //

	const titleInput = document.getElementById("titleInput");
	const dueDateInput = document.getElementById("dueDateInput");
	const descriptionInput = document.getElementById("descriptionInput");

	const formErrorMessage = function () {

		let array = [[titleInput, "Title"], [dueDateInput, "Date"], [descriptionInput, "Description"]]

		array.forEach(input => {
			if (input[0].value === "") {
				document.querySelector(`.required${input[1]}`).style.display =
					"block";
			}
	
			input[0].addEventListener("click", function () {
				document.querySelector(`.required${input[1]}`).style.display =
					"none";
			});
		})

	};

	const getInfoForm = function () {
		
		let chosenDate = format(new Date(dueDateInput.value), "dd/MM/yyyy")

		return [titleInput.value, chosenDate, descriptionInput.value];
	};

	const resetForm = function () {
		let thisDate = format(new Date, "yyyy/MM/dd")
		thisDate = thisDate.replace(/\//g, "-")
		titleInput.value = "";
		dueDateInput.value = thisDate;
		descriptionInput.value = "";
	};

	const checkMissingItemsForm = function () {
		if (titleInput.value === "" ||descriptionInput.value === "" ||	dueDateInput.value === "") {
			return true;
		}

		return false;
	};

	const setValuesDateForm = function(){
		let thisDate = format(new Date, "yyyy/MM/dd")
		thisDate = thisDate.replace(/\//g, "-")
		dueDateInput.value = thisDate
		dueDateInput.min = thisDate
		dueDateInput.max = "3000-12-31"
	}


	// == CSS changes == //

	const changeStatus = function(element){
		if(element.classList.contains("completed")){
			element.classList.remove("completed")
		} else {
			element.classList.add("completed")
		}
	}

	// == Misc == //

	const deleteElement = function(element){
		element.remove();
	}

	return {
		renderProjectList,
		clearProjectListStyle,
		addTitle,
		prependNewProject,
		renderAllTasks,
		createTaskListDiv,
		formErrorMessage,
		getInfoForm,
		resetForm,
		checkMissingItemsForm,
		createTask,
		checkForNoTasks,
		changeStatus,
		setValuesDateForm,
		deleteElement
	};

})();

export { DOM };