import pool from "@/app/lib/db";

export async function GET() {
  try {
    const query = 'SELECT venue_id, venue_name, venue_city FROM venue';
    const [rows] = await pool.query(query);
    return new Response(JSON.stringify({ venues: rows }), { status: 200 });
  } catch (error) {
    console.error('Error fetching venues:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
