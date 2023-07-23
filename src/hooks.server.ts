import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Lucia周り
	event.locals.auth = auth.handleRequest(event);

	// サブドメインからtenantを取得する
	const host = event.request.headers.get('host');
	let tenantId = '';
	if (host?.includes('localhost:')) {
		// localhostのとき
		tenantId = host?.includes('.localhost') ? host.split('.localhost')[0] : '';
	} else {
		// 本番環境のとき
		const baseDomain = 'mypost.studio';
		tenantId = host?.includes(`.${baseDomain}`) ? host.split(`.${baseDomain}`)[0] : '';
	}
	if (!tenantId) {
		return Response.redirect(`http://demo.${host}`, 302);
	}
	event.locals.tenant = tenantId;
	return await resolve(event);
};
