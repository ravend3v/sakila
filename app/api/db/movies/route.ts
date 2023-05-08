import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sakila",
  });

  connection.connect();

  // Määritellään sivun koko
  const pageSize = 20;

  const queryPromise = new Promise((resolve, reject) => {
    const page = searchParams.get("page") || "0";
    const actor = searchParams.get("actor") || "";
    const category = searchParams.get("category") || "";
    const offset = Number(page) * pageSize;

    // Tarkistetaan, että sivu on numero
    if (isNaN(Number(page))) {
      reject("page must be a number");
    }

    //
    const query = `
    SELECT
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.length,
    f.rating,
    f.special_features,
    GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR ', ') AS actor_names,
    GROUP_CONCAT(DISTINCT c.name SEPARATOR ', ') AS category
    FROM film f
    JOIN film_actor fa ON f.film_id = fa.film_id
    JOIN actor a ON fa.actor_id = a.actor_id
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    WHERE (a.actor_id LIKE '%${actor}%')
      AND c.name LIKE '%${category}%'
    GROUP BY f.film_id
    LIMIT ${pageSize}
    OFFSET ${offset}
    `;

    try {
      connection.query(query, function (error, results, fields) {
        if (error) {
          console.log("error: ", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    } catch (error: any) {
      reject(error);
    }
  });

  try {
    const results = await queryPromise;
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}