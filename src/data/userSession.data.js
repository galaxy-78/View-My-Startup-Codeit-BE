export class UserSessionData {
	constructor(client) {
		this.data = client.UserSession; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	// NOTE UserSession의 DB 작업 코드만을 다룹니다.
	create = async data => {
		Object.keys(data).forEach(key => {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
		});
		return this.data.create({ data });
	};

	findByUserIdAndCreatedAt = async (userId, createdAt) => {
		return this.data.findUniqueOrThrow({
			where: { userId_createdAt: { userId, createdAt } },
		});
	};

	updateSsnIterByUserIdAndCreatedAt = async (userId, createdAt) => {
		return this.data.update({
			where: { userId_createdAt: { userId, createdAt } },
			data: {
				iter: { decrement: 1 },
			},
		});
	};

	findManyByUserIdCreatedAtDesc = async userId => {
		return this.data.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				iter: true,
				ip: true,
				createdAt: true,
			}
		});
	};

	delete = async (userId, createdAt) => {
		return this.data.delete({
			where: { userId_createdAt: { userId, createdAt } },
		});
	};

	deleteManyByUserId = async userId => {
		return this.data.deleteMany({
			where: { userId },
		})
	};
}
