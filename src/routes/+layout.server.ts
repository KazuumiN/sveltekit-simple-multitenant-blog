import db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const load = async ({ request, locals }) => {
	const currentPath = new URL(request.url).pathname;
	const tenantId = locals.tenant;
	const tenant = await db
		.selectFrom('tenant')
		.where('id', '=', tenantId)
		.selectAll()
		.executeTakeFirst();
	if (!tenant && currentPath != '/newtenant') {
		throw redirect(302, '/newtenant');
	} else if (!tenant) {
		return {};
	}
	if (currentPath == '/newtenant') {
		throw redirect(302, '/');
	}
	return { tenant };
};
