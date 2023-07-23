import db from '$lib/server/database';

import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const tenantId = locals.tenant;
	const articleId = params.article;
	const article = await db
		.selectFrom('article')
		.where('article.tenant_id', '=', tenantId)
		.where('article.id', '=', articleId)
		.innerJoin('user', 'user.id', 'article.user_id')
		.select(['article.id', 'title', 'subtitle', 'body', 'user.name as author'])
		.executeTakeFirst();
	if (!article) {
		throw redirect(302, '/');
	}

	return { article };
};
