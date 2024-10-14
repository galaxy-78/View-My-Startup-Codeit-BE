export class UserService {
	constructor(userData) {
		this.data = userData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.
	checkAvailability = async ({ email, nickname }) => {
		const userByEmail = await this.data.findByEmail(email.trim());
		const userByNickname = await this.data.findByNickname(nickname.trim());
		return { email: !userByEmail, nickname: !userByNickname };
	};

	getUsers = async () => {
		return this.data.findMany();
	};

	getUserByEmail = async email => {
		return this.data.findByEmail(email);
	};

	create = async userData => {
		return this.data.create(userData);
	};

	// NOTE 기존 service.postPwdIter에 해당하는 부분. 코드를 봐선 get 요청인듯 하여 메소드명을 변경했습니다.
	// 여기선 get 으로 이름 지어도 괜찮을거 같네요.
	getPwdIterByEmail = async email => {
		const iterNSalt = await this.data.getPwdIterByEmail(email);
		if (iterNSalt) {
			return iterNSalt;
		} else {
			return { message: '해당 계정을 찾을 수 없습니다.' };
		}
	};

	updateUserIterByEmail = async email => {
		return this.data.updateIterByEmail(email);
	};
}
