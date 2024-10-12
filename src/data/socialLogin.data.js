export class SocialLoginData {
	constructor(client) {
		this.socialLogin = client.SocialLogin; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	// NOTE UserSession의 DB 작업 코드만을 다룹니다.
	create = async data => {
		return this.socialLogin.create({ data });
	};

	getSocialLogin = async data => {
		return this.socialLogin.findUnique({
			where: {
				state_ip: {
					state: data.state,
					ip: data.ip,
				}
			}
		});
	}
}
