/// <reference types="lucia" />

declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
			tenant: string;
		}
	}
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			name: string;
			tenant_id: string;
		};
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		type DatabaseSessionAttributes = object;
	}
}

export {};
