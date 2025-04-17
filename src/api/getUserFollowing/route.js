async function handler({ userId }) {
  if (!userId) {
    return {
      success: false,
      error: "ID do usuário é obrigatório",
    };
  }

  try {
    const following = await sql`
      SELECT 
        au.id, 
        au.name, 
        au.image, 
        up.bio,
        f.created_at as followedAt
      FROM 
        followers f
      JOIN 
        auth_users au ON f.following_id = au.id
      LEFT JOIN 
        user_profiles up ON au.id = up.user_id
      WHERE 
        f.follower_id = ${userId}
      ORDER BY 
        f.created_at DESC
    `;

    return {
      success: true,
      following: following,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao buscar usuários seguidos: " + error.message,
    };
  }
}