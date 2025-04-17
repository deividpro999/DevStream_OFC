async function handler({ rarity, userId }) {
  try {
    const session = getSession();

    const currentUserId = userId || session?.user?.id;

    if (!currentUserId) {
      return {
        success: false,
        error: "Usuário não autenticado",
      };
    }

    let query = "SELECT c.* FROM characters c";
    let params = [];
    let paramCount = 0;

    if (rarity) {
      query += ` WHERE c.rarity = $${++paramCount}`;
      params.push(rarity);
    }

    const characters = await sql(query, params);

    const userCharacters = await sql(
      "SELECT character_id FROM user_characters WHERE user_id = $1",
      [currentUserId]
    );

    const ownedCharacterIds = new Set(
      userCharacters.map((uc) => uc.character_id)
    );

    const charactersWithOwnership = characters.map((character) => ({
      ...character,
      owned: ownedCharacterIds.has(character.id),
    }));

    return {
      success: true,
      characters: charactersWithOwnership,
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return {
      success: false,
      error: "Erro ao buscar personagens",
    };
  }
}