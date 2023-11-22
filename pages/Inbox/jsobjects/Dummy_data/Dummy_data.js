export default {
	myVar2: {},
	async generateTestData () {
		const output = await Get_inbox_requests.data;
		if(!output.responseMeta.success){
			showAlert("Error in fetching data");
			return false;
		}

		storeValue("rawData",output.data.content);
		return this.filterData();

	},
	async filterData () {
		const rawData = await appsmith.store.rawData;
		const statusFilter = Status_filter.selectedOptionValue;
		const responseFilter = statusFilter === "pending"? "pending":Response_filter.selectedOptionValue;
		const filteredData = await rawData.filter((datum,index)=>{
			console.log(datum.resolution)
			const resolutionStatusFilterOutput = datum.resolutionStatus.toLowerCase() === statusFilter;
			const resolutionFilterOutput = (responseFilter==="pending"?true:datum.resolution === responseFilter);
			return (
				resolutionStatusFilterOutput && resolutionFilterOutput
			)});
		storeValue("filteredData",filteredData);
		return filteredData;
	}
}