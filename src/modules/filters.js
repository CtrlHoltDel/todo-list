const filter = (function(){

    const byProject = function(array, projectName){
        let filteredList = array.filter(task => task.project === projectName)
        return filteredList
    }

    return { byProject }

})();


export { filter }
