const filterTaskList = function(array, projectName){
    let filteredArray = array.filter(task => task.project === projectName)
    return filteredArray
}

export { filterTaskList }