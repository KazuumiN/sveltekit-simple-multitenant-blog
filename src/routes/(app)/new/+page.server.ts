import db from '$lib/server/database';
import { redirect, fail } from '@sveltejs/kit';

import domuprify from 'isomorphic-dompurify';
const { sanitize } = domuprify;


import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

// superforms用にzodのスキーマを定義
const schema = z.object({
	title: z.string(),
	subtitle: z.string(),
	body: z.string()
});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		return fail(401, {
			message: 'ログインしてください'
		});
	}
	const form = await superValidate(schema);
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const user = (await locals.auth.validate())?.user;
		if (!user) {
			return fail(401, {
				message: 'ログインしてください'
			});
		}
		const tenantId = locals.tenant;
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { title, subtitle, body } = form.data;
		try {
			await db
				.insertInto('article')
				.values({
					tenant_id: tenantId,
					user_id: user.userId,
					title: title,
					subtitle: subtitle,
					body: sanitize(body)
				})
				.execute();
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
