import { format, add, isBefore } from "date-fns";

const filter = (function () {
	const currentDateArray = format(new Date(), "yyyy-MM-dd");
	const formatToFns = function (storedDate) {
		return storedDate;
	};

	const byProject = function (array, projectName) {
		let filteredList = array.filter((task) => task.project === projectName);
		return filteredList;
	};

	const byPreset = function (array, date) {
		if (date === "today") {
			const filteredArray = array.filter((task) => {
				return formatToFns(task.date) === currentDateArray;
			});
			return filteredArray;
		}

		if (date === "this week") {
			const endOfWeekDate = format(
				add(new Date(), {
					days: 7,
				}),
				"yyyy-MM-dd"
			).split("-");

			const beforeEndOfWeek = array.filter((task) => {
				const taskDateArray = task.date.split("-");
				return isBefore(
					new Date(
						taskDateArray[0],
						taskDateArray[1],
						taskDateArray[2]
					),
					new Date(
						endOfWeekDate[0],
						endOfWeekDate[1],
						endOfWeekDate[2]
					)
				);
			});

			return beforeEndOfWeek;
		}
	};

	return { byProject, byPreset };
})();

export { filter };
