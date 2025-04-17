async function handler({ userId }) {
  if (!userId) {
    return {
      success: false,
      error: "ID do usuário é obrigatório",
    };
  }

  try {
    // Buscar informações do usuário
    const users = await sql`
      SELECT id, name, email, image 
      FROM auth_users 
      WHERE id = ${userId}
    `;

    if (users.length === 0) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    const user = users[0];

    // Buscar perfil do usuário
    const profiles = await sql`
      SELECT * FROM user_profiles 
      WHERE user_id = ${userId}
    `;

    const profile = profiles.length > 0 ? profiles[0] : null;

    // Buscar contagem de seguidores
    const followersCount = await sql`
      SELECT COUNT(*) as count 
      FROM followers 
      WHERE following_id = ${userId}
    `;

    // Buscar contagem de seguindo
    const followingCount = await sql`
      SELECT COUNT(*) as count 
      FROM followers 
      WHERE follower_id = ${userId}
    `;

    // Buscar personagens do usuário
    const characters = await sql`
      SELECT c.* 
      FROM characters c
      JOIN user_characters uc ON c.id = uc.character_id
      WHERE uc.user_id = ${userId}
    `;

    // Buscar roupas do usuário
    const outfits = await sql`
      SELECT o.* 
      FROM outfits o
      JOIN user_outfits uo ON o.id = uo.outfit_id
      WHERE uo.user_id = ${userId}
    `;

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        profile: profile,
        stats: {
          followers: parseInt(followersCount[0].count),
          following: parseInt(followingCount[0].count),
        },
        characters: characters,
        outfits: outfits,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    return {
      success: false,
      error: "Erro ao buscar perfil do usuário",
      details: error.message,
    };
  }
}