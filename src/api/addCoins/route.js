async function handler({ amount, description, transactionType = "purchase" }) {
  const session = getSession();

  if (!session || !session.user) {
    return { error: "Não autenticado" };
  }

  const userId = session.user.id;

  // Validate input
  if (!amount || isNaN(amount) || amount <= 0) {
    return { error: "Quantidade de moedas inválida" };
  }

  if (!description) {
    return { error: "Descrição da transação é obrigatória" };
  }

  try {
    // Run transaction to update user profile and record transaction
    const result = await sql.transaction(async (txn) => {
      // Update user profile
      const updatedProfile = await txn`
        UPDATE user_profiles 
        SET coins = coins + ${amount}, 
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
        RETURNING *
      `;

      // Record transaction
      const transaction = await txn`
        INSERT INTO coin_transactions 
        (user_id, amount, description, transaction_type)
        VALUES 
        (${userId}, ${amount}, ${description}, ${transactionType})
        RETURNING *
      `;

      return {
        profile: updatedProfile[0],
        transaction: transaction[0],
      };
    });

    return {
      success: true,
      message: `${amount} moedas adicionadas com sucesso!`,
      data: result,
    };
  } catch (error) {
    console.error("Erro ao adicionar moedas:", error);
    return {
      error: "Erro ao processar a transação",
      details: error.message,
    };
  }
}