import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { username, password, contact_no, email, selectedArcades } = await req.json();

    if (!username || !password || !contact_no || !email || !Array.isArray(selectedArcades) || selectedArcades.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Some fields are missing data or no arcades selected.' }),
        { status: 400 }
      );
    }

    const contactNo = contact_no || 'N/A'; 
    console.log(contactNo);
    const managerCreationQuery = `INSERT INTO users (username, email, password, contact_no, role) VALUES (?, ?, ?, ?, ?)`;
    await pool.execute(managerCreationQuery, [username, email, password, contactNo, "manager"]);

    // Insert arcade linkages into the `users_arcade` table
    const arcadeManagerLinkageQuery = 'INSERT INTO users_arcade (email, arcade_id) VALUES (?, ?)';
    for (const arcade_id of selectedArcades) {
      await pool.execute(arcadeManagerLinkageQuery, [email, arcade_id]);
    }

    return new Response(JSON.stringify({ message: 'Manager added successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error adding manager:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding manager', error: error.message }),
      { status: 500 }
    );
  }
}