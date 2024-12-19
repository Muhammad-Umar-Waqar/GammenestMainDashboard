
import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    const query = 'DELETE FROM users WHERE email = ?';
    await pool.query(query, [email]);

    return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
  } catch (error) {
    console.error('Error fetching manager:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching manager', error: error.message }),
      { status: 500 }
    );
  }
}