export class SocialLoginService {
	constructor(socialLoginData) {
		this.socialLogin = socialLoginData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.

	postPreGoogle = (data, ip) => {
		return this.socialLogin.create({ ...data, ip });
	}

	checkAccountGoogle = async data => {
		const socialLoginData = await getSocialLogin(data);
		return (new Date().getTime() - new Date(socialLoginData.createdAt).getTime()) < 100_000 && socialLoginData.sW === data.sW && socialLoginData.sH === data.sH;
	}
}