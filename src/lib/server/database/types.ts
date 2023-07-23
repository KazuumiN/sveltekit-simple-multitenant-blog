import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Article = {
	id: Generated<string>;
	title: string;
	subtitle: string;
	body: string;
	tenant_id: string;
	user_id: string;
};
export type Key = {
	id: string;
	hashed_password: string | null;
	user_id: string;
};
export type Session = {
	id: string;
	user_id: string;
	active_expires: string;
	idle_expires: string;
};
export type Tenant = {
	id: string;
	title: string;
};
export type User = {
	id: string;
	name: string;
	tenant_id: string;
};
export type DB = {
	article: Article;
	key: Key;
	session: Session;
	tenant: Tenant;
	user: User;
};
