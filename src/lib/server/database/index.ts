import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
const { Pool } = pg;
import type { DB } from './types'; // DBの型定義
import { DATABASE_URL } from '$env/static/private';
const connectionString = DATABASE_URL || import.meta.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('データベースの接続文字列が設定されていません。');
}

export const pool = new Pool({
	connectionString
});

const dialect = new PostgresDialect({
	pool
});

const db = new Kysely<DB>({
	dialect
});

export default db;
