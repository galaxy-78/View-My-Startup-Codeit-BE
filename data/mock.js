const user = [
  {
    id: '53a10ad5-5c7a-4415-9683-a151b861b26d',
  },
  {
    id: 'e6cd05c6-34d5-4871-82c1-f882988d0ece',
  },
  {
    id: '364a024f-eeb5-4341-88c2-2259aa0bf0ce',
  },
  {
    id: 'df3085cd-1dd4-474d-8972-e65d716af906',
  },
  {
    id: 'efbea72e-0fd0-49b0-8ec5-bcf3eaf5e335',
  },
];
const company = [
  {
    id: '0bb13554-5c67-48b6-89a0-1c4be8e2ff78',
    name: '테스트 컴퍼니1',
    description: '테스트 컴퍼니1입니다.',
    category: '회사',
    cumulativeInvestmentAmount: 5000,
    renenue: 5000,
    employees: 5,
    selectedCount: 0,
    ownerId: '53a10ad5-5c7a-4415-9683-a151b861b26d',
  },
  {
    id: 'c6098a4e-05a5-4c35-8afc-a12bb866d983',
    name: '테스트 컴퍼니2',
    description: '테스트 컴퍼니2입니다.',
    category: '회사',
    cumulativeInvestmentAmount: 50000,
    renenue: 50000,
    employees: 50,
    selectedCount: 5,
    ownerId: 'e6cd05c6-34d5-4871-82c1-f882988d0ece',
  },
  {
    id: 'e0ca402d-73d2-434e-a224-7e667af0c95e',
    name: '테스트 컴퍼니3',
    description: '테스트 컴퍼니3입니다.',
    category: '회사',
    cumulativeInvestmentAmount: 2000,
    renenue: 2000,
    employees: 2,
    selectedCount: 1,
    ownerId: '364a024f-eeb5-4341-88c2-2259aa0bf0ce',
  },
  {
    id: '2a1ee054-5cb0-4746-90f3-7daf63e0c11d',
    name: '테스트 컴퍼니4',
    description: '테스트 컴퍼니4입니다.',
    category: '회사',
    cumulativeInvestmentAmount: 700000,
    renenue: 70000,
    employees: 1000,
    selectedCount: 2000,
    ownerId: 'df3085cd-1dd4-474d-8972-e65d716af906',
  },
  {
    id: '1973b351-b9e2-4995-8602-25cfb15133ae',
    name: '테스트 컴퍼니5',
    description: '테스트 컴퍼니5입니다.',
    category: '회사',
    cumulativeInvestmentAmount: 999999,
    renenue: 9999,
    employees: 90,
    selectedCount: 9999,
    ownerId: 'efbea72e-0fd0-49b0-8ec5-bcf3eaf5e335',
  },
];
const investment = [
  {
    id: '71841c8c-e8e7-446c-b55c-848bcc50b16e',
    name: '가상투자1',
    amount: 5000,
    comment: '가상투자1입니다.',
    password: 'password',
    userId: '53a10ad5-5c7a-4415-9683-a151b861b26d',
    companyId: '0bb13554-5c67-48b6-89a0-1c4be8e2ff78',
  },
  {
    id: '3b664b86-c2e0-4e2a-aa62-e43f6fba0939',
    name: '가상투자2',
    amount: 500000,
    comment: '가상투자2입니다.',
    password: 'password',
    userId: 'e6cd05c6-34d5-4871-82c1-f882988d0ece',
    companyId: 'c6098a4e-05a5-4c35-8afc-a12bb866d983',
  },
  {
    id: '18bd1d9d-9868-4805-9d49-d35f5f3ea96d',
    name: '가상투자3',
    amount: 9999,
    comment: '가상투자3입니다.',
    password: 'password',
    userId: '364a024f-eeb5-4341-88c2-2259aa0bf0ce',
    companyId: 'e0ca402d-73d2-434e-a224-7e667af0c95e',
  },
  {
    id: '72d2edd9-0eb3-4072-a702-5fbb02b32fd5',
    name: '가상투자4',
    amount: 800000,
    comment: '가상투자4입니다.',
    password: 'password',
    userId: 'df3085cd-1dd4-474d-8972-e65d716af906',
    companyId: '2a1ee054-5cb0-4746-90f3-7daf63e0c11d',
  },
  {
    id: '471cf3a4-6fe9-4d3d-942b-4d189cf99c88',
    name: '가상투자5',
    amount: 975350,
    comment: '가상투자5입니다.',
    password: 'password',
    userId: 'efbea72e-0fd0-49b0-8ec5-bcf3eaf5e335',
    companyId: '1973b351-b9e2-4995-8602-25cfb15133ae',
  },
];

// model User {
//   id String @id @default(uuid())

//   investments Investment[]
//   company     Company?
// }

// model Comparison {
//   id String @id @default(uuid())
//   // TODO ownerCompany
//   // TODO compareCompany * 5(최대)
//   // TODO 1:N 관계
//   // TODO 1의 주체가 User인가 Company인가 정해야됨
// }

// model Company {
//   // TODO 가상 투자 금액 총계를 직접 저장할 것인가, 매번 계산할 것인가
//   id                         String   @id @default(uuid())
//   name                       String   @unique
//   description                String
//   category                   Category
//   cumulativeInvestmentAmount Int // NOTE 이름 바꿀것, 누적 투자 금액(실제)
//   revenue                    Int // NOTE 매출액
//   employees                  Int // NOTE 고용 인원수
//   selectedCount              Int // NOTE 선택된 횟수

//   investments Investment[]
//   owner       User         @relation(fields: [ownerId], references: [id])
//   ownerId     String       @unique
// }

// model Investment {
//   id       String @id @default(uuid())
//   name     String
//   amount   Int
//   comment  String
//   password String

//   user      User    @relation(fields: [userId], references: [id])
//   userId    String // NOTE 투자자
//   company   Company @relation(fields: [companyId], references: [id])
//   companyId String // NOTE 투자대상 기업
// }
