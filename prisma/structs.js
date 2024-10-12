import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';

const CATEGORIES = ['유통', '물류', 'IT/테크', '제조', '교육', '헬스케어'];

export const Uuid = s.define('Uuid', value => isUuid.v4(value));
export const Email = s.define('Email', value => isEmail(value));
export const DateTime = s.define('DateTime', value => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value));

export const preGoogleBody = s.object({
	state: s.size(s.string(), 32),
	sW: s.integer(),
	sH: s.integer(),
});

export const loginWithGoogleBody = s.object({
	state: s.size(s.string(), 32),
	sW: s.integer(),
	sH: s.integer(),
	email: Email,
});

export const signupBody = s.object({
	email: Email,
	name: s.string(),
	nickname: s.size(s.string(), 1, 20),
	salt: s.size(s.string(), 32),
	pwdEncrypted: s.size(s.string(), 104),
});

export const patchUser = s.partial(signupBody);

export const postCheckBody = s.object({
	email: Email,
	nickname: s.size(s.string(), 1, 20),
});

export const ssnBody = s.object({
	userId: Uuid,
	createdAt: DateTime,
});

export const ssnBodyWithPwdEncrypted = s.object({
	userId: Uuid,
	createdAt: DateTime,
	sessionEncrypted: s.size(s.string(), 104),
});

export const loginBody = s.object({
	email: Email,
	pwdEncrypted: s.size(s.string(), 104),
})

export const createCompany = s.object({
	name: s.size(s.string(), 1, 20),
	description: s.size(s.string(), 100, 500),
	category: s.enums(CATEGORIES),
	accumulInvest: s.min(s.number(), 0), // 억 단위
	revenue: s.min(s.number(), 0), // 억 단위
	employees: s.min(s.integer(), 0),
	selectedCount: s.min(s.number(), 0),
});

export const patchCompany = s.partial(createCompany);

export const createInvestment = s.object({
	id: s.optional(Uuid),
	name: s.size(s.string(), 1, 10),
	amount: s.min(s.number(), 0), // 억 단위
	comment: s.size(s.string(), 1, 20),
	// password: s.min(s.union([s.string(), s.number()]), 8),
	password: s.string(),
	userId: Uuid,
	companyId: Uuid,
});

export const patchInvestment = s.partial(createInvestment);
