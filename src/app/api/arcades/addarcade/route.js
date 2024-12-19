import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { arcade_id, coins_required, games } = await req.json();
    if (!arcade_id || !coins_required || !games || !Array.isArray(games)) {
      return new Response(
        JSON.stringify({ message: 'Some required fields are missing or invalid.' }),
        { status: 400 }
      );
    }

    const upsertArcadeQuery = `
      INSERT INTO arcade (arcade_id, coins_required)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      coins_required = VALUES(coins_required)
    `;
    await pool.execute(upsertArcadeQuery, [arcade_id, coins_required]);

    // Clear existing games for the arcade
    const deleteGamesQuery = `
      DELETE FROM arcade_game
      WHERE arcade_id = ?
    `;
    await pool.execute(deleteGamesQuery, [arcade_id]);

    // Insert new game assignments for the arcade
    const insertGameQuery = `
      INSERT INTO arcade_game (arcade_id, game_id)
      VALUES (?, ?)
    `;
    for (const game_id of games) {
      await pool.execute(insertGameQuery, [arcade_id, game_id]);
    }

    return new Response(
      JSON.stringify({ message: 'Arcade added/updated successfully.' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding/updating arcade:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding/updating arcade.', error: error.message }),
      { status: 500 }
    );
  }
}
