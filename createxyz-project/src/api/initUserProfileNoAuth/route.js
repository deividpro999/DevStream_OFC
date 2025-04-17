async function handler({ name, avatarUrl }) {
  try {
    if (!name || name.trim() === "") {
      return {
        success: false,
        error: "Nome de usuário é obrigatório",
      };
    }

    const newUser = await sql`
      INSERT INTO auth_users (name, image)
      VALUES (${name}, ${avatarUrl || null})
      RETURNING id, name, image
    `;

    if (!newUser || newUser.length === 0) {
      return {
        success: false,
        error: "Falha ao criar usuário",
      };
    }

    const userId = newUser[0].id;
    const initialCoins = 1000;

    const newProfile = await sql`
      INSERT INTO user_profiles (user_id, coins, avatar_url)
      VALUES (${userId}, ${initialCoins}, ${avatarUrl || null})
      RETURNING id, user_id, coins, bio, avatar_url, created_at, updated_at
    `;

    const coinTransaction = await sql`
      INSERT INTO coin_transactions 
      (user_id, amount, description, transaction_type)
      VALUES 
      (${userId}, ${initialCoins}, 'Bônus inicial de boas-vindas', 'bonus')
      RETURNING id, amount, description, transaction_type, created_at
    `;

    const userToken = Buffer.from(`${userId}:${Date.now()}`).toString("base64");

    return {
      success: true,
      message: "Perfil criado com sucesso!",
      user: {
        id: userId,
        name: newUser[0].name,
        image: newUser[0].image,
        profile: newProfile[0],
        initialTransaction: coinTransaction[0],
        token: userToken,
      },
      token: userToken,
    };
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    return {
      success: false,
      error: "Erro ao criar perfil de usuário",
      details: error.message,
    };
  }
}