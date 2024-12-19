
import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { arcade_id } = await req.json();
    
    const query = 'DELETE FROM arcade WHERE arcade_id = ?';
    await pool.query(query, [arcade_id]);

    return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
  } catch (error) {
    console.error('Error fetching arcade:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching arcade', error: error.message }),
      { status: 500 }
    );
  }
}