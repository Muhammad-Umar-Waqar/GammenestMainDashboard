import pool from '../../../lib/db';

export async function GET() {
  try {
    const query = 'SELECT username, email, password, contact_no FROM users WHERE role = "manager"';
    const [managers] = await pool.execute(query);

    return new Response(JSON.stringify({ managers }), { status: 200 });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching managers', error: error.message }),
      { status: 500 }
    );
  }
}
