import pool from "../../../lib/db";

export async function POST(req) {
  try {
    const { username, password, contact_no, email, selectedArcades } = await req.json();

    if (!username || !password || !contact_no || !email) {
      return new Response(JSON.stringify({ message: "All fields are required." }), {
        status: 400,
      });
    }

    // Update manager details
    const updateManagerQuery = `
      UPDATE users
      SET username = ?, password = ?, contact_no = ?
      WHERE email = ?
    `;
    await pool.execute(updateManagerQuery, [username, password, contact_no, email]);

    // Clear existing arcade assignments
    const deleteArcadesQuery = `
      DELETE FROM users_arcade
      WHERE email = ?
    `;
    await pool.execute(deleteArcadesQuery, [email]);

    // Add updated arcade assignments
    const insertArcadesQuery = `
      INSERT INTO users_arcade (email, arcade_id)
      VALUES (?, ?)
    `;
    for (const arcadeId of selectedArcades) {
      await pool.execute(insertArcadesQuery, [email, arcadeId]);
    }

    return new Response(JSON.stringify({ message: "Manager updated successfully." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating manager:", error);
    return new Response(
      JSON.stringify({ message: "Error updating manager.", error: error.message }),
      { status: 500 }
    );
  }
}
