const DOM = (function () {
	const renderProjectList = function (array) {
		const projectList = document.getElementById("projectsList");
		projectList.textContent = "";

		array.forEach((project) => {
			let newList = document.createElement("li");
			newList.setAttribute("id", project.id);
			newList.classList.add("projectListLI");
			newList.innerHTML = project.project_Name;
			projectList.prepend(newList);
		});
	};

	const clearProjectListStyle = function () {
		const allProjects = document.querySelectorAll(".projectListLI");

		allProjects.forEach((project) => {
			project.classList.remove("currentlyselected");
		});
	};

	const addTitle = function(title){
		let headerOverallTitle = document.getElementById("headerOverallTitle")
		headerOverallTitle.innerHTML = title
	}

	return { renderProjectList, clearProjectListStyle, addTitle };
})();

export { DOM }