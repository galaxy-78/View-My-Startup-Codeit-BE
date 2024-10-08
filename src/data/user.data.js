export class UserData {
	constructor(client) {
		this.data = client.User; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	// NOTE User의 DB 작업 코드만을 다룹니다.
	findMany = async () => {
		const users = await this.data.findMany();

		return users;
	};

	findByEmail = async email => {
		const user = await this.data.findUnique({ where: { email } });

		return user;
	};

	findByNickname = async nickname => {
		const user = await this.data.findUnique({ where: { nickname } });

		return user;
	};

	findByEmailOrThrow = async email => {
		const user = await this.data.findUniqueOrThrow({ where: { email } });

		return user;
	};

	create = async data => {
		const user = await this.data.create({ data });

		return user;
	};

	// NOTE 기존 service.postPwdIter에 해당하는 부분. 코드를 봐선 get 요청인듯 하여 메소드명을 변경했습니다.
	getPwdIter = async email => {
		const iterNSalt = await this.data.findUniqueOrThrow({
			where: { email },
			select: { iter: true, salt: true },
		});

		return iterNSalt;
	};

	// NOTE 기존 service.updateUserIterAndCreateSession에서 user의 iter 변경하는 부분
	updateIter = async email => {
		const user = await this.data.update({
			where: { email },
			data: { iter: { decrement: 1 } },
		});

		return user;
	};
}
