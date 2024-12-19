import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { arcade_id, api_key } = await req.json();

    if (!arcade_id || !api_key) {
      return new Response(
        JSON.stringify({ message: 'Arcade id and Api key is required' }),
        { status: 400 }
      );
    }

    // Insert into the `game` table
    const query = 'INSERT INTO api (arcade_id, api_key) VALUES (?, ?)';
    const [result] = await pool.execute(query, [arcade_id, api_key]);

    return new Response(
      JSON.stringify({ message: 'Arcade api added successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding api:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding api', error: error.sqlMessage }),
      { status: 400 }
    );
  }
}