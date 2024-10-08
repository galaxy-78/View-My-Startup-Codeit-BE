export class AccountData {
	constructor(client) {
		this.data0 = client.User; // 이 부분에 각 모델(스키마)를 연결합니다.
		this.data = client.UserSession;
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	// findMany0 = async (...args) => {
	// 	const users = await this.data0.findMany(...args);
	// 	return users;
	// };

	// findMany = async (...args) => {
	// 	const users = await this.data.findMany(...args);
	// 	return users;
	// };

	// findUnique0 = async (...args) => {
	// 	const user = await this.data0.findUnique(...args);
	// 	return user;
	// };

	// delete = async (...args) => {
	// 	const session = await this.data.delete(...args);
	// 	return session;
	// }

	// deleteMany = async (...args) => {
	// 	const session = await this.data.deleteMany(...args);
	// 	return session;
	// }

	// update0 = async (...args) => {
	// 	const user = await this.data0.update(...args);
	// 	return user;
	// };

	// update = async (...args) => {
	// 	const user = await this.data.update(...args);
	// 	return user;
	// };

	// create0 = async (...args) => {
	// 	const user = await this.data0.create(...args);
	// 	return user;
	// }

	// create = async (...args) => {
	// 	const session = await this.data.create(...args);
	// 	return session;
	// };

	// findUniqueOrThrow0 = async (...args) => {
	// 	const account = await this.data0.findUniqueOrThrow(...args);
	// 	return account;
	// };

	// findUniqueOrThrow = async (...args) => {
	// 	const session = await this.data.findUniqueOrThrow(...args);
	// 	return session;
	// };
}
