import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { venue_id } = await req.json();
    
    const query = 'DELETE FROM venue WHERE venue_id = ?';
    await pool.query(query, [venue_id]);

    return new Response(JSON.stringify({ message: 'Deleted venue' }), { status: 200 });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching venues', error: error.message }),
      { status: 500 }
    );
  }
}