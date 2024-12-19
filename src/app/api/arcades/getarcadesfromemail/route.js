import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'Manager email is required.' }),
        { status: 400 }
      );
    }

    const query = `
      SELECT arcade_id
      FROM users_arcade
      WHERE email = ?
    `;

    const [rows] = await pool.execute(query, [email]);

    return new Response(JSON.stringify({ arcades: rows.map(row => row.arcade_id) }), { status: 200 });
  } catch (error) {
    console.error('Error fetching manager arcades:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching manager arcades', error: error.message }),
      { status: 500 }
    );
  }
}
