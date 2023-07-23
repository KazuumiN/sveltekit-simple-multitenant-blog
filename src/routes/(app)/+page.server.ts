import db from '$lib/server/database';

export const load = async ({ locals }) => {
	const tenantId = locals.tenant;
	const articles = await db
		.selectFrom('article')
		.where('article.tenant_id', '=', tenantId)
		.innerJoin('user', 'user.id', 'article.user_id')
		.orderBy('article.id', 'desc')
		.select(['article.id', 'title', 'subtitle', 'user.name as author'])
		.execute();

	return { articles };
};
