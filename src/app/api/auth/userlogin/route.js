import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email, password)

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Invalid data: "email" and "password" are required' }),
        { status: 400 }
      );
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401 } 
      );
    }

    if (rows[0].email === email && rows[0].password === password) {
      return new Response(
        JSON.stringify({ message: 'Login successful', role: rows[0].role}),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'Login failed' }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    return new Response(
      JSON.stringify({ message: 'Error logging in user', error: error.message }),
      { status: 500 }
    );
  }
}
