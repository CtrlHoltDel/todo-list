const projectListDOM = document.getElementById("projects");
const taskListDOM = document.getElementById("tasks");

const TaskDOM = (function () {

	const createTaskDiv = function (task) {
		const createdDiv = document.createElement("div");
		const title = document.createElement("div");
		const date = document.createElement("div");
		const note = document.createElement("div");
		const deleteButton = document.createElement("div");
        const editButton = document.createElement("div");

		createdDiv.classList.add("taskHoverDiv");
        createdDiv.setAttribute("id", task.id)
        title.classList.add("taskHoverTitle", "taskHoverCheck");
        date.classList.add("taskHoverDate", "taskHoverCheck");
        note.classList.add("taskHoverNote", "taskHoverCheck");
		deleteButton.classList.add("taskHoverDelete");
        editButton.classList.add("taskHoverEdit");

		title.innerHTML = task.title;
		date.innerHTML = task.date;
		note.innerHTML = task.note;
		deleteButton.innerHTML = "X";
        editButton.innerHTML = "Edit";

		taskListDOM.append(createdDiv);
		createdDiv.appendChild(title);
		createdDiv.appendChild(date);
		createdDiv.appendChild(note);
		createdDiv.appendChild(deleteButton);
        createdDiv.appendChild(editButton);
	};

	const deleteAllTasks = function(){
		taskListDOM.innerHTML = ""
    }

	const renderTaskList = function (taskArray) {
		deleteAllTasks();
		taskArray.forEach((task) => createTaskDiv(task));
	};

	const renderAllTasks = function(taskArray, projectArray){
		deleteAllTasks();
		projectArray.forEach(project => {
			const headerDiv = document.createElement("h1")
			headerDiv.innerHTML = project
			taskListDOM.appendChild(headerDiv)

			let filteredArray = taskArray.filter(task => task.project === project)

			if(filteredArray != 0){
				filteredArray.forEach(task => {
					createTaskDiv(task)
				})
				return
			}

			let noTasksDiv = document.createElement("div")
			noTasksDiv.classList.add("noTasks")
			noTasksDiv.innerHTML = "No tasks"
			taskListDOM.appendChild(noTasksDiv)

		})
	}

	

	return { renderTaskList, createTaskDiv, renderAllTasks };

})();

const ProjectsDOM = (function () {

	const createProjectDiv = function (projectName) {
		const createdDiv = document.createElement("div");
		const title = document.createElement("div");
		const deleteProject = document.createElement("div");

        createdDiv.classList.add("projectNameStyle");
		deleteProject.classList.add("projectDeleteButton");
        title.classList.add("projectNameButton");
        createdDiv.setAttribute("id", projectName);

		title.textContent = projectName;
		deleteProject.textContent = "🗑️"

		projectListDOM.appendChild(createdDiv);
		createdDiv.appendChild(title);
		createdDiv.appendChild(deleteProject);
	};

	const renderAllProjects = function (projectArray) {
		projectArray.forEach((project) => createProjectDiv(project));
	};

	const addSingleProject = function (projectName) {
		createProjectDiv(projectName);
	};

    const addCurrentlySelectedStyle = function(selectedID){
		removeCurrentlySelectedStyle();
		if(selectedID === "allProjects"){
			console.log("ALL PROJECTS")
			return
		}

        const selectedNode = document.getElementById(selectedID).childNodes[0]
        selectedNode.classList.add("currentlySelectedProject")
    }

	const removeCurrentlySelectedStyle = function(){
		projectListDOM.childNodes.forEach(project => {
			project.childNodes[0].classList.remove("currentlySelectedProject")
		})
	}

	return { renderAllProjects, addSingleProject, addCurrentlySelectedStyle, removeCurrentlySelectedStyle };
})();

const EditingDOM = (function(){

})();

export { TaskDOM, ProjectsDOM };
