import * as s from "superstruct";
import isUuid from "is-uuid";

const CATEGORIES = [
	'유통',
	'물류',
	'IT/테크',
	'제조',
	'교육',
	'헬스케어',
]

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));

export const CreateUser = s.object({
	name: s.size(s.string(), 1, 10),
	nickname: s.size(s.string(), 1, 10),
	password: s.min(s.union([string(), number()]), 8),
})

export const PatchUser = s.partial

export const createCompany = s.object({
	name: s.size(s.string(), 1, 20),
	description: s.size(s.string(), 100, 500),
	category: s.enums(CATEGORIES),
	accumulInvest: s.min(s.number(), 0), // 억 단위
	revenue: s.min(s.number(), 0), // 억 단위
	employees: s.min(s.integer(), 0),
	selectedCount: s.min(s.number(), 0),
})

export const PatchCompany = s.partial(createCompany);

export const createInvestment = s.object({
	name: s.size(s.string(), 1, 10),
	amount: s.min(s.number(), 0), // 억 단위
	comment: s.size(s.string(), 1, 20),
	password: s.min(s.union([string(), number()]), 8),
	userId: Uuid,
	companyId: Uuid,
})

export const PatchInvestment = s.partial
