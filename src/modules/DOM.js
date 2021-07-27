const DOM = (function(){

	const projectUL = document.getElementById("projectsList")

	const addProject = function(projectName){
		let newListItem = document.createElement("li")
		newListItem.innerHTML = projectName
		console.log(newListItem)
		projectUL.appendChild(newListItem)
	}

	return { addProject }

})();

export { DOM }