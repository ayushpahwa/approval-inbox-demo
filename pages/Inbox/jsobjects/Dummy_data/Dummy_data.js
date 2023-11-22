export default {
	myVar2: {},
	generateTestData () {
		const output = [];
		let index;
		for (index = 0; index < 20; index++) {

			const isPending = (index % 2) !== 0;
			let response = "Pending";
			if (!isPending) {
				response = (index % 4) === 0 ? "Approved" : "Rejected";
			}
			const test = {
				id: `#14561263${index}`,
				title: "This can be the subject of the message",
				"time": "2 hours ago",
				"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. This could also be some more information presented as a link. View the external link.",
				"status": `${isPending ? "Pending" : "Completed"}`,
				"response": `${response}`
			};
			output.push(test);

		};

		storeValue("rawData",output);
		return this.filterData();

	},
	filterData () {
		const rawData = appsmith.store.rawData;
		const statusFilter = Status_filter.selectedOptionValue;
		const responseFilter = statusFilter === "Pending"? "Pending":Response_filter.selectedOptionValue;
		const filteredData = rawData.filter((datum)=>(
			datum.status === statusFilter && (responseFilter==="All"?true:datum.response === responseFilter)
		));
		storeValue("filteredData",filteredData);
		return filteredData;
	}
}