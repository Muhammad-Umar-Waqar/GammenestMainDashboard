import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { game_id, game_name } = await req.json();

    if (!game_id || !game_name) {
      return new Response(
        JSON.stringify({ message: 'Game ID and Game Name are required' }),
        { status: 400 }
      );
    }

    // Update the `game` table
    const query = 'UPDATE game SET game_name = ? WHERE game_id = ?';
    const [result] = await pool.execute(query, [game_name, game_id]);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ message: 'Game updated successfully' }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'No game found with the given ID' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error editing game:', error);
    return new Response(
      JSON.stringify({ message: 'Error editing game', error: error.message }),
      { status: 500 }
    );
  }
}