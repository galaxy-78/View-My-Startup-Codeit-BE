import { encryptSSNRest } from '../utils/encrypt.js';

export class UserSessionService {
	constructor(userSessionData) {
		this.data = userSessionData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.

	// NOTE 기존 service.postSsnIter에 해당하는 부분. 기능상 get요청으로 보여서 메소드명을 수정했습니다.
	getSessionIter = async ({ userId, createdAt }) => {
		const session = await this.data.findByUserIdAndCreatedAt(userId, createdAt);
		return { iter: session.iter, sessionSalt: session.sessionSalt };
	};

	createSession = async sessionData => {
		return this.data.create(sessionData);
	};

	// NOTE 기존 service.postLogoutAndDeleteSession 부분.
	deleteSession = async ({ userId, createdAt, sessionEncrypted }) => {
		const session = await this.data.findByUserIdAndCreatedAt(userId, createdAt);

		if (session.sessionEncrypted === encryptSSNRest(session.sessionSalt, sessionEncrypted, session.iter)) {
			await this.data.delete(userId, createdAt);
			return { message: 'Session이 안전하게 지워졌습니다.' };
		}
		return { message: 'Session이 유효하지 않아 server 상의 session은 지워지지 않았습니다.' };
	};
}
