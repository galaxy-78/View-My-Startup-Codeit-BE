export class WatchService {
	constructor(watchData) {
		this.data = watchData;
	}

	selectMyCompany = async (companyId, userId) => {
		return await this.data.selectMyCompany(companyId, userId);
	};

	getMyCompany = async userId => {
		return await this.data.getMyCompany(userId);
	};
}
