async function handler({ userId }) {
  // Se não for fornecido um userId, tenta obter do usuário logado
  if (!userId) {
    const session = getSession();
    if (!session || !session.user) {
      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }
    userId = session.user.id;
  }

  try {
    // Buscar informações do usuário
    const user = await sql`
      SELECT id, name, email, image FROM auth_users WHERE id = ${userId}
    `;

    if (user.length === 0) {
      return {
        success: false,
        message: "Usuário não encontrado",
      };
    }

    // Buscar perfil do usuário
    let userProfile = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    // Se o perfil não existir, inicializamos automaticamente
    if (userProfile.length === 0) {
      // Inicializar o perfil com valores padrão
      const initialCoins = 500;
      const defaultBio = "Olá! Sou novo no DevStream.";

      const newProfile = await sql`
        INSERT INTO user_profiles 
          (user_id, coins, bio, avatar_url) 
        VALUES 
          (${userId}, ${initialCoins}, ${defaultBio}, null)
        RETURNING *
      `;

      await sql`
        INSERT INTO coin_transactions
          (user_id, amount, description, transaction_type)
        VALUES
          (${userId}, ${initialCoins}, 'Bônus de boas-vindas', 'bonus')
      `;

      userProfile = [newProfile[0]];
    }

    // Buscar contagem de seguidores
    const followersCount = await sql`
      SELECT COUNT(*) as count FROM followers WHERE following_id = ${userId}
    `;

    // Buscar contagem de seguindo
    const followingCount = await sql`
      SELECT COUNT(*) as count FROM followers WHERE follower_id = ${userId}
    `;

    // Buscar personagens do usuário
    const userCharacters = await sql`
      SELECT uc.*, c.name, c.description, c.rarity, c.image_url
      FROM user_characters uc
      JOIN characters c ON uc.character_id = c.id
      WHERE uc.user_id = ${userId}
    `;

    // Buscar roupas do usuário
    const userOutfits = await sql`
      SELECT uo.*, o.name, o.description, o.price, o.image_url
      FROM user_outfits uo
      JOIN outfits o ON uo.outfit_id = o.id
      WHERE uo.user_id = ${userId}
    `;

    return {
      success: true,
      message: "Perfil encontrado com sucesso",
      user: user[0],
      profile: userProfile[0],
      followersCount: followersCount[0].count,
      followingCount: followingCount[0].count,
      characters: userCharacters,
      outfits: userOutfits,
    };
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return {
      success: false,
      message: "Erro ao buscar perfil: " + error.message,
    };
  }
}