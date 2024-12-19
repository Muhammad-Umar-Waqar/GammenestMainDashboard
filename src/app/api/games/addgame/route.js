import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { game_name } = await req.json();

    if (!game_name) {
      return new Response(
        JSON.stringify({ message: 'Game name is required' }),
        { status: 400 }
      );
    }

    // Insert into the `game` table
    const query = 'INSERT INTO game (game_name) VALUES (?)';
    const [result] = await pool.execute(query, [game_name]);

    return new Response(
      JSON.stringify({ message: 'Game added successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding game:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding game', error: error.sqlMessage }),
      { status: 400 }
    );
  }
}
