import mysql from 'mysql'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila'
  })

  connection.connect()

  const queryPromise = new Promise((resolve, reject) => {
    connection.query(
      'SELECT store.store_id, address.address_id, city.city, city.city_id, address.address ' +
      'FROM store ' +
      'JOIN address ON store.address_id = address.address_id ' +
      'JOIN city ON address.city_id = city.city_id',
      function (error, results, fields) {
        if (error) {
          console.log('error:', error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });

  try {
    const results = await queryPromise;
    return NextResponse.json(results);
  }
  catch (error) {
    return NextResponse.error();
  }
}