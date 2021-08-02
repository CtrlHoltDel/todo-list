const Storage = (function () {

	//Local storage variables
	let taskArrayKey = "LOCAL_STORAGE_CURRENT_TASKS";
	let projectArrayKey = "LOCAL_STORAGE_CURRENT_PROJECTS";
	let projectCurrentKey = "LOCAL_STORAGE_CURRENTLY_SELEC_PROJECT";

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

	const saveStarredProject = function(projectName){
		const stringifiedJson = JSON.stringify(projectName)
		localStorage.setItem(projectCurrentKey, stringifiedJson)
	}

	// -- LOADING -- //

	const loadProjects = function () {
		return JSON.parse(localStorage.getItem(projectArrayKey));
	};

	const loadTasks = function () {
		return JSON.parse(localStorage.getItem(taskArrayKey));
	};

	const loadStarredProject = function() {
		return JSON.parse(localStorage.getItem(projectCurrentKey))
	}

	return { 
            saveProjects,
            saveTasks,
			saveStarredProject,
            loadProjects, 
            loadTasks,
			loadStarredProject
            };

})();

export { Storage }