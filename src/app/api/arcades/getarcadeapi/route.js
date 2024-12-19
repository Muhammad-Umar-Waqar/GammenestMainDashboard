import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { arcade_id } = await req.json();

    const query = 'SELECT api_key FROM api WHERE arcade_id = ?';
    const [api] = await pool.execute(query, [arcade_id]);

    return new Response(JSON.stringify({ api }), { status: 200 });
  } catch (error) {
    console.error('Error fetching api key:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching api key', error: error.message }),
      { status: 500 }
    );
  }
}
