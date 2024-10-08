import axios from 'axios'; // import 문법으로 axios 불러오기

// 테스트할 API의 URL
const API_URL = 'http://localhost:3000/comparison/select';

// 선택할 기업 ID 목록과 사용자 ID
const data = {
	selectedCompanyIds: ['companyId1', 'companyId2', 'companyId3'], // 예시 기업 ID
	userId: 'userId123', // 예시 사용자 ID
};

// POST 요청을 보내는 함수
async function testSelectCompareCompanies() {
	try {
		const response = await axios.post(API_URL, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('응답:', response.data); // 서버로부터 받은 응답 출력
	} catch (error) {
		console.error('오류 발생: ㅁㄴㅇ', error.response ? error.response.data : error.message);
	}
}

// 테스트 함수 호출
testSelectCompareCompanies();
