import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { arcade_id } = await req.json();
    console.log(arcade_id)
    if (!arcade_id) {
      return new Response(
        JSON.stringify({ message: 'Arcade id is required.' }),
        { status: 400 }
      );
    }

    const query = `
      SELECT *
      FROM arcade_game
      WHERE arcade_id = ?
    `;

    const [rows] = await pool.execute(query, [arcade_id]);

    return new Response(JSON.stringify({ games: rows.map(row => row.game_id) }), { status: 200 });
  } catch (error) {
    console.error('Error fetching arcade games:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching arcade games', error: error.message }),
      { status: 500 }
    );
  }
}
