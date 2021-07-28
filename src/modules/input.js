const eventInputs = (function(){

	const newProjectName = function(passthrough){
		document.getElementById("addProjectButton").addEventListener('click', (e) => {	
			passthrough(e)
		})
	}

	const globalEventListener = function (type, selector, callback){
		document.addEventListener(type, function(e){
			if(e.target.matches(selector)){
				callback(e)
			}
		})
	}
	

	return { newProjectName, globalEventListener }

})();

export { eventInputs }