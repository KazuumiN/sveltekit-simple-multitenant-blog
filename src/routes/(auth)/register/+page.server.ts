import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

// superforms用にzodのスキーマを定義
const schema = z
	.object({
		name: z
			.string()
			.min(1)
			.max(255)
			.regex(/^[a-zA-Z0-9]+$/),
		password: z.string().min(12).max(127),
		passwordConfirm: z.string(),
		// 利用規約類への同意
		terms: z.boolean().refine((v) => v, { message: '利用規約に同意してください' })
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.passwordConfirm) {
			ctx.addIssue({
				path: ['passwordConfirm'],
				code: 'custom',
				message: 'パスワードが一致しません'
			});
		}
	});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
	// supeformsで初期化したフォームを返す
	const form = await superValidate(schema);
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const name = form.data.name;
		const password = form.data.password;

		try {
			const user = await auth.createUser({
				key: {
					providerId: `${locals.tenant}_name`, // プロバイダーのID、今後ログイン方法が増えた場合、nameの部分を変更する
					providerUserId: name, // ユーザーのID
					password // こう指定することで、Luciaがハッシュ化してくれる
				},
				attributes: {
					name: name,
					tenant_id: locals.tenant
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
