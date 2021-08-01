const Storage = (function () {

	//Local storage variables
	let taskArrayKey = "LOCAL_STORAGE_CURRENT_TASKS";
	let projectArrayKey = "LOCAL_STORAGE_CURRENT_PROJECTS";
	let projectCurrentKey = "LOCAL_STORAGE_CURRENTLY_SELECETE_PROJECT";

	//Saving and loading functions
	// -- SAVING -- //

	const saveProjects = function (projectArray) {
		const stringifiedJson = JSON.stringify(projectArray);
		localStorage.setItem(projectArrayKey, stringifiedJson);
	};

	const saveTasks = function (taskArray) {
		const stringifiedJson = JSON.stringify(taskArray);
		localStorage.setItem(taskArrayKey, stringifiedJson);
	};

	const saveCurrentProject = function(projectName){
		const stringifiedJson = JSON.stringify(projectName)
		localStorage.setItem(projectCurrentKey, stringifiedJson)
	}
	
	const saveAll = function (projectArray, taskArray) {
		saveProjects(projectArray);
		saveTasks(taskArray);
	};

	// -- LOADING -- //

	const loadProjects = function () {
		return JSON.parse(localStorage.getItem(projectArrayKey));
	};

	const loadTasks = function () {
		return JSON.parse(localStorage.getItem(taskArrayKey));
	};

	const loadCurrentProject = function() {
		return JSON.parse(localStorage.getItem(projectCurrentKey))
	}

	return { 
            saveProjects,
            saveTasks,
			saveCurrentProject,
			saveAll,
            loadProjects, 
            loadTasks,
			loadCurrentProject
            };

})();

export { Storage }