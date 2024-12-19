import pool from "@/app/lib/db";

export async function POST(req) {
  try {
    const { arcade_id, coins_required, venue_id, games } = await req.json();

    if (!arcade_id || !coins_required || !games) {
      return new Response(
        JSON.stringify({ message: 'Required fields are missing.' }),
        { status: 400 }
      );
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    // Update arcade
    const updateArcadeQuery = `
      UPDATE arcade
      SET coins_required = ?
      WHERE arcade_id = ?
    `;
    await conn.query(updateArcadeQuery, [coins_required, arcade_id]);

    const updateArcadeVenueQuery = 'UPDATE arcade_venue SET venue_id = ? WHERE arcade_id = ?';
    await conn.query(updateArcadeVenueQuery, [venue_id, arcade_id]) 

    // Update games
    const deleteGamesQuery = 'DELETE FROM arcade_game WHERE arcade_id = ?';
    await conn.query(deleteGamesQuery, [arcade_id]);

    const insertGameQuery = 'INSERT INTO arcade_game (arcade_id, game_id) VALUES (?, ?)';
    for (const gameId of games) {
      await conn.query(insertGameQuery, [arcade_id, gameId]);
    }

    await conn.commit();
    conn.release();

    return new Response(JSON.stringify({ message: 'Arcade updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating arcade:', error.message);
    return new Response(
      JSON.stringify({ message: 'Error updating arcade', error: error.message }),
      { status: 500 }
    );
  }
}
