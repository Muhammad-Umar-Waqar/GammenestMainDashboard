import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { venue_id, venue_name, venue_city } = await req.json();

    if (!venue_id || !venue_name) {
      return new Response(
        JSON.stringify({ message: 'Venue ID and Venue Name are required' }),
        { status: 400 }
      );
    }

    // Update the `game` table
    const query = 'UPDATE venue SET venue_name = ?, venue_city = ? WHERE venue_id = ?';
    const [result] = await pool.execute(query, [venue_name, venue_city, venue_id]);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ message: 'Venue updated successfully' }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'No venue found with the given ID' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error editing venue:', error);
    return new Response(
      JSON.stringify({ message: 'Error editing venue', error: error.message }),
      { status: 500 }
    );
  }
}