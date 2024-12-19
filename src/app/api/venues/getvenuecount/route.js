import pool from '../../../lib/db';

export async function GET() {
  try {
    const countQuery = 'SELECT COUNT(*) as count FROM venue';
    
    const [[{ count }]] = await pool.execute(countQuery);

    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (error) {
    console.error('Error fetching venue count:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching venue count', error: error.message }),
      { status: 500 }
    );
  }
}