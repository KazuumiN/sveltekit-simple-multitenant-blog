import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';

import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

// superforms用にzodのスキーマを定義
const schema = z.object({
	name: z.string(),
	password: z.string()
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
			// ユーザーをキーで検索し、パスワードを検証する
			const key = await auth.useKey(`${locals.tenant}_name`, name, password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect name or password'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
