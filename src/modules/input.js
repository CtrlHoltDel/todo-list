const newProjectName = function(passthrough){
	document.getElementById("addProjectButton").addEventListener('click', (e) => {	
		passthrough(e)
	})
}


const projectListEvent = function(passthrough){
	document.getElementById("projectsContainer").addEventListener('click', (e) => {
		passthrough(e)
	})	
}


export { newProjectName , projectListEvent }