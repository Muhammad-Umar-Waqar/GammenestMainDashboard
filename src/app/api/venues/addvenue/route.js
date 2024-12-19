import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { venue_name, venue_city } = await req.json();

    if (!venue_name || !venue_city) {
      return new Response(
        JSON.stringify({ message: 'Venue name and city are required' }),
        { status: 400 }
      );
    }

    const query = 'INSERT INTO venue (venue_name, venue_city) VALUES (?, ?)';
    await pool.execute(query, [venue_name, venue_city]);

    return new Response(JSON.stringify({ message: 'Venue added successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error adding venue:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding venue', error: error.message }),
      { status: 500 }
    );
  }
}
