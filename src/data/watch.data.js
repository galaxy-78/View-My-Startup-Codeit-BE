export class WatchData {
	constructor(client) {
		this.data = client.Watch; // Prisma Client에서 Watch 모델과 통신합니다.
	}

	// '나의 기업' 선택
	selectMyCompany = async (companyId, userId) => {
		// 새로 선택한 기업 저장
		return await this.data.create({
			data: {
				companyId,
				userId,
			},
		});
	};

	// '나의 기업' 조회
	getMyCompany = async userId => {
		return await this.data.findFirst({
			where: { userId },
			include: { company: true }, // company 정보를 포함
		});
	};
}
