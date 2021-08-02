import { format, isBefore } from "date-fns";

const filter = (function(){

    const byProject = function(array, projectName){
        let filteredList = array.filter(task => task.project === projectName)
        return filteredList
    }
    
    const byDate = function(array, date){

    }

    return { byProject }

})();


export { filter }
