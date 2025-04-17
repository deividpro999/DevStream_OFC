async function handler({ amount, description = "Moedas removidas" }) {
  try {
    const session = getSession();

    if (!session || !session.user) {
      return {
        success: false,
        error: "Usuário não autenticado",
      };
    }

    const userId = session.user.id;

    const userProfiles = await sql`
      SELECT * FROM user_profiles 
      WHERE user_id = ${userId}
    `;

    if (userProfiles.length === 0) {
      return {
        success: false,
        error: "Perfil de usuário não encontrado",
      };
    }

    const userProfile = userProfiles[0];

    if (userProfile.coins < amount) {
      return {
        success: false,
        error: "Saldo insuficiente",
        currentBalance: userProfile.coins,
      };
    }

    const result = await sql.transaction(async (txn) => {
      const updatedProfile = await txn`
        UPDATE user_profiles 
        SET coins = coins - ${amount},
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
        RETURNING *
      `;

      await txn`
        INSERT INTO coin_transactions 
        (user_id, amount, description, transaction_type)
        VALUES 
        (${userId}, ${amount}, ${description}, 'debit')
      `;

      return updatedProfile;
    });

    return {
      success: true,
      profile: result[0],
      message: `${amount} moedas removidas com sucesso`,
    };
  } catch (error) {
    console.error("Erro ao remover moedas:", error);
    return {
      success: false,
      error: "Erro ao remover moedas",
      details: error.message,
    };
  }
}