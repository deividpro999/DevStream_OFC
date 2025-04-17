async function handler({ userId }) {
  if (!userId) {
    return {
      success: false,
      error: "ID do usuário é obrigatório",
    };
  }

  try {
    const userExists =
      await sql`SELECT id FROM auth_users WHERE id = ${userId}`;

    if (userExists.length === 0) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    const followers = await sql`
      SELECT 
        f.id as follow_id,
        u.id,
        u.name,
        u.image,
        p.bio,
        f.created_at as followed_at
      FROM followers f
      JOIN auth_users u ON f.follower_id = u.id
      LEFT JOIN user_profiles p ON u.id = p.user_id
      WHERE f.following_id = ${userId}
      ORDER BY f.created_at DESC
    `;

    return {
      success: true,
      followers: followers,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao buscar seguidores: " + error.message,
    };
  }
}