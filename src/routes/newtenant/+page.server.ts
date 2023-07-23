import db from '$lib/server/database';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

// superforms用にzodのスキーマを定義
const schema = z.object({
	title: z.string()
});

export const load = async ({ request, locals }) => {
	const host = new URL(request.url).host;
	const tenantId = locals.tenant;
	// supeformsで初期化したフォームを返す
	const form = await superValidate(schema);
	return { host, tenantId, form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const tenantId = locals.tenant;
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const title = form.data.title;
		try {
			await db
				.insertInto('tenant')
				.values({
					id: tenantId,
					title: title
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
