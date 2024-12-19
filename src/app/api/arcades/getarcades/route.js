import pool from '../../../lib/db';

export async function GET() {
  try {
    const query = 'SELECT * FROM arcade';
    const countQuery = 'SELECT COUNT(*) as count FROM arcade';
    
    const [arcades] = await pool.execute(query);
    const [[{ count }]] = await pool.execute(countQuery);

    return new Response(JSON.stringify({ arcades, count }), { status: 200 });
  } catch (error) {
    console.error('Error fetching arcades:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching arcades', error: error.message }),
      { status: 500 }
    );
  }
}
