const DOM = (function(){

	const projectUL = document.getElementById("projectsList")

	const addProjectSingle = function(project, id){
		const newItem = document.createElement("li");
		newItem.setAttribute("id", id)
		newItem.innerHTML = project;
		projectUL.appendChild(newItem)
	}

	const renderProjectFull = function(projectArray){
		projectArray.forEach(project => {
			addProjectSingle(project.name, project.id);
		})
	}

	return { addProjectSingle, renderProjectFull }

})();

export { DOM }