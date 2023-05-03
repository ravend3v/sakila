import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  //make the connection to the database
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sakila",
  });

  connection.connect();

  const queryPromise = new Promise((resolve, reject) => {
    connection.query("SELECT name, category_id FROM category", 
    function (error, results, fields) {
      if (error) {
        console.log("error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  try {
    const results = await queryPromise;
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.error();
  }
}