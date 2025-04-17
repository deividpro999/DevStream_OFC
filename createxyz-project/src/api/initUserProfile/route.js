async function handler({ bio, avatar_url }) {
  try {
    // Obter a sessão atual
    const session = getSession();

    if (!session || !session.user) {
      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }

    const userId = session.user.id;
    const username = session.user.name || "Usuário";
    const initialCoins = 1000; // Aumentando o valor inicial de moedas

    // Verificar se o usuário já tem um perfil
    const existingProfile = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    if (existingProfile && existingProfile.length > 0) {
      // Atualizar o perfil existente
      await sql`
        UPDATE user_profiles
        SET 
          avatar_url = ${avatar_url || existingProfile[0].avatar_url},
          bio = ${bio || existingProfile[0].bio},
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `;

      return {
        success: true,
        profile: {
          id: userId,
          name: username,
          avatar_url: avatar_url || existingProfile[0].avatar_url,
          coins: existingProfile[0].coins,
          bio: bio || existingProfile[0].bio,
        },
        message: "Perfil atualizado com sucesso",
      };
    } else {
      // Criar o perfil do usuário
      await sql`
        INSERT INTO user_profiles 
          (user_id, coins, bio, avatar_url) 
        VALUES 
          (${userId}, ${initialCoins}, ${bio || ""}, ${avatar_url || "1"})
      `;

      // Registrar a transação de moedas inicial
      await sql`
        INSERT INTO coin_transactions
          (user_id, amount, description, transaction_type)
        VALUES
          (${userId}, ${initialCoins}, 'Bônus de boas-vindas', 'bonus')
      `;

      // Retornar o perfil completo com informações do usuário
      return {
        success: true,
        profile: {
          id: userId,
          name: username,
          avatar_url: avatar_url || "1",
          coins: initialCoins,
          bio: bio || "",
        },
        message: "Perfil criado com sucesso",
      };
    }
  } catch (error) {
    console.error("Erro ao inicializar perfil:", error);
    return {
      success: false,
      error: error.message,
      message: "Falha ao inicializar perfil de usuário",
    };
  }
}