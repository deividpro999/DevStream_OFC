async function handler({ rarity }) {
  try {
    let query;
    let characters;

    if (rarity) {
      characters = await sql`
        SELECT * FROM characters 
        WHERE rarity = ${rarity}
        ORDER BY name ASC
      `;
    } else {
      characters = await sql`
        SELECT * FROM characters
        ORDER BY name ASC
      `;
    }

    return {
      success: true,
      characters: characters,
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return {
      success: false,
      error: "Erro ao buscar personagens",
      details: error.message,
    };
  }
}