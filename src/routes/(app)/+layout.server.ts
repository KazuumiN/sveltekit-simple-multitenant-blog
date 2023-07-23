export const load = async ({ locals }) => {
	const user = (await locals.auth.validate())?.user;
	return {
		user
	};
};
