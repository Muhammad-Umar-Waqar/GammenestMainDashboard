import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { game_id } = await req.json();
    
    const query = 'DELETE FROM game WHERE game_id = ?';
    await pool.query(query, [game_id]);

    return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
  } catch (error) {
    console.error('Error fetching games:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching games', error: error.message }),
      { status: 500 }
    );
  }
}