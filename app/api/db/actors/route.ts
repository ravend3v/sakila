import mysql from 'mysql';
import { promisify } from 'util';
import { NextResponse, NextRequest } from 'next/server';

const connection = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'sakila'
});

const query = promisify(connection.query).bind(connection);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const pageSize = 40;

  const page = searchParams.get("page") || "0";
  const offset = Number(page) * pageSize;

  try {
    const results = await query(
      `SELECT actor_id, first_name, last_name FROM actor ORDER BY first_name ASC LIMIT ${pageSize} OFFSET ${offset}`
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}