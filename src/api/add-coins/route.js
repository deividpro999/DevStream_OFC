async function handler({ amount, description = "Adição de moedas" }) {
  try {
    const session = getSession();

    if (!session || !session.user) {
      return {
        success: false,
        error: "Usuário não autenticado",
      };
    }

    const userId = session.user.id;

    if (!amount || isNaN(amount) || amount <= 0) {
      return {
        success: false,
        error: "Quantidade de moedas inválida",
      };
    }

    const result = await sql.transaction(async (txn) => {
      const transaction = await txn`
        INSERT INTO coin_transactions 
        (user_id, amount, description, transaction_type)
        VALUES (${userId}, ${amount}, ${description}, 'credit')
        RETURNING id
      `;

      // Verificar se o perfil existe
      const existingProfile = await txn`
        SELECT * FROM user_profiles WHERE user_id = ${userId}
      `;

      let updatedProfile;

      if (existingProfile.length === 0) {
        // Se o perfil não existir, criar um novo
        updatedProfile = await txn`
          INSERT INTO user_profiles
          (user_id, coins, bio, avatar_url)
          VALUES (${userId}, ${amount}, '', null)
          RETURNING *
        `;
      } else {
        // Se o perfil existir, atualizar o saldo
        updatedProfile = await txn`
          UPDATE user_profiles
          SET coins = coins + ${amount},
              updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ${userId}
          RETURNING *
        `;
      }

      return updatedProfile[0];
    });

    return {
      success: true,
      profile: result,
      newBalance: result.coins,
      message: `${amount} moedas adicionadas com sucesso`,
    };
  } catch (error) {
    console.error("Erro ao adicionar moedas:", error);
    return {
      success: false,
      error: "Erro ao adicionar moedas",
      details: error.message,
    };
  }
}