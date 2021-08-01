import { format, add, isBefore } from 'date-fns'

const filterTaskList = function(array, projectName){
    let filteredArray = array.filter(task => task.project === projectName)
    return filteredArray
}

const filterByDate = function(array, date){

    let beforeThisDate

    if(date === "week"){
        const weekFromNow = add(new Date, {
            days: 7,
        })

        beforeThisDate = weekFromNow
    }

    if(date === "month"){
        const monthFromNow = add(new Date, {
            months: 1,
        })

        beforeThisDate = monthFromNow
    }

    const filteredArray = array.filter(task => {
        let taskDateToFinish = task.date.split("-")
        beforeThisDate = format(new Date(beforeThisDate), "yyyy-MM-dd").split("-")
        return (isBefore(new Date(taskDateToFinish[2],taskDateToFinish[1],taskDateToFinish[0]), new Date(beforeThisDate[0],beforeThisDate[1],beforeThisDate[2])))
    })

    return filteredArray

}

const indexOfTask = function(array, id){

    let index = array.findIndex(task => {
        return task.id == id
    })

    return index
}

export { filterTaskList, filterByDate, indexOfTask}