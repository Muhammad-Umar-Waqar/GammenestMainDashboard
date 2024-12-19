import pool from '../../../lib/db';

export async function GET() {
  try {
    const query = 'SELECT game_id, game_name FROM game';
    const [rows] = await pool.query(query);
    return new Response(JSON.stringify({ games: rows }), { status: 200 });
  } catch (error) {
    console.error('Error fetching games:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
