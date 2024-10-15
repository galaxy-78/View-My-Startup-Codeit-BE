export class UserData {
	constructor(client) {
		this.data = client.User; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	// NOTE User의 DB 작업 코드만을 다룹니다.
	findMany = async () => {
		return this.data.findMany();
	};

	findByEmail = async email => {
		return this.data.findUnique({ where: { email: email.trim() } });
	};

	findByNickname = async nickname => {
		return this.data.findUnique({ where: { nickname: nickname.trim() } });
	};

	// findByEmailOrThrow = async email => {
	// 	return this.data.findUniqueOrThrow({ where: { email: email.trim() } });
	// };

	create = async data => {
		Object.keys(data).forEach(key => {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
		})
		return this.data.create({ data });
	};

	// NOTE 기존 service.postPwdIter에 해당하는 부분. 코드를 봐선 get 요청인듯 하여 메소드명을 변경했습니다.
	// get 으로 쓰겠습니다.
	getPwdIterByEmail = async email => {
		return this.data.findUnique({
			where: { email: email.trim() },
			select: { iter: true, salt: true },
		});
	};

	// NOTE 기존 service.updateUserIterAndCreateSession에서 user의 iter 변경하는 부분
	updateIterByEmail = async email => {
		return this.data.update({
			where: { email: email.trim() },
			data: { iter: { decrement: 1 } },
		});
	};
}
