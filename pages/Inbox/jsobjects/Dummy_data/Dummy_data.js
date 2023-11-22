export default {
	myVar2: {},
	async generateTestData () {
		await Get_inbox_requests.run();
		const output = await Get_inbox_requests.data;
		if(!output.responseMeta.success){
			showAlert("Error in fetching data");
			return false;
		}

		await storeValue("rawData",output.data.content);
		return this.filterData();

	},
	async filterData () {
		const rawData = await appsmith.store.rawData;
		const statusFilter = Status_filter.selectedOptionValue;
		const responseFilter = statusFilter === "pending"? "pending":Response_filter.selectedOptionValue.toLowerCase();
		const filteredData = await rawData.filter((datum,index)=>{
			console.log(datum.resolution)
			const resolutionStatusFilterOutput = datum.resolutionStatus.toLowerCase() === statusFilter;
			const resolutionFilterOutput = (["pending","all"].includes(responseFilter)?true:datum.resolution?.toLowerCase() === responseFilter);
			const workflowIdCheck = datum.workflowId === "655e29723318161e81b0382a";
			return (
				resolutionStatusFilterOutput && resolutionFilterOutput && workflowIdCheck
			)});
		storeValue("filteredData",filteredData);
		// showAlert("New data fetched")
		return filteredData;
	}
}