


const projectListEvent = function(passthrough){
	document.getElementById("projectsContainer").addEventListener('click', (e) => {
		e.preventDefault();
		passthrough(e)
	})	
}


export { projectListEvent }