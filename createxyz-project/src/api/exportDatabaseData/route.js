async function handler() {
  const session = getSession();

  if (!session || !session.user) {
    return {
      success: false,
      error: "Não autorizado. Faça login para exportar dados.",
    };
  }

  try {
    // Fetch data from all required tables
    const characters = await sql`SELECT * FROM characters`;
    const outfits = await sql`SELECT * FROM outfits`;
    const userProfiles =
      await sql`SELECT id, user_id, coins, created_at, updated_at, bio, avatar_url FROM user_profiles`;
    const userCharacters = await sql`SELECT * FROM user_characters`;
    const userOutfits = await sql`SELECT * FROM user_outfits`;
    const coinTransactions = await sql`SELECT * FROM coin_transactions`;
    const followers = await sql`SELECT * FROM followers`;

    // Compile all data into a single object
    const exportData = {
      exportDate: new Date().toISOString(),
      characters,
      outfits,
      userProfiles,
      userCharacters,
      userOutfits,
      coinTransactions,
      followers,
    };

    return {
      success: true,
      data: exportData,
    };
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    return {
      success: false,
      error: "Erro ao exportar dados do banco de dados: " + error.message,
    };
  }
}