async function handler({ userId, bio, avatar_url, coins }) {
  try {
    // Obter a sessão atual
    const session = getSession();

    if (!session || !session.user) {
      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }

    // Usar o userId fornecido ou o da sessão
    const userIdToUpdate = userId || session.user.id;

    // Verificar se o perfil existe
    const existingProfile = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userIdToUpdate}
    `;

    if (existingProfile.length === 0) {
      // Se o perfil não existir, inicializamos um novo
      return await initUserProfile({ userId: userIdToUpdate, bio, avatar_url });
    }

    // Preparar os campos para atualização
    const updates = {};

    if (bio !== undefined) updates.bio = bio;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;

    // Atualizar moedas apenas se fornecido
    if (coins !== undefined) {
      // Se estamos adicionando moedas (valor positivo)
      if (coins > 0) {
        // Registrar a transação
        await sql`
          INSERT INTO coin_transactions 
            (user_id, amount, description, transaction_type)
          VALUES
            (${userIdToUpdate}, ${coins}, 'Adição de moedas', 'add')
        `;
      }
      // Se estamos removendo moedas (valor negativo)
      else if (coins < 0) {
        // Verificar se o usuário tem moedas suficientes
        if (existingProfile[0].coins + coins < 0) {
          return {
            success: false,
            message: "Saldo de moedas insuficiente",
          };
        }

        // Registrar a transação
        await sql`
          INSERT INTO coin_transactions 
            (user_id, amount, description, transaction_type)
          VALUES
            (${userIdToUpdate}, ${coins}, 'Remoção de moedas', 'remove')
        `;
      }

      updates.coins = sql`COALESCE(coins, 0) + ${coins}`;
    }

    // Construir a query de atualização dinamicamente
    let updateQuery = sql`
      UPDATE user_profiles 
      SET updated_at = CURRENT_TIMESTAMP
    `;

    // Adicionar cada campo à query
    if (bio !== undefined) {
      updateQuery = sql`${updateQuery}, bio = ${bio}`;
    }

    if (avatar_url !== undefined) {
      updateQuery = sql`${updateQuery}, avatar_url = ${avatar_url}`;
    }

    if (coins !== undefined) {
      updateQuery = sql`${updateQuery}, coins = COALESCE(coins, 0) + ${coins}`;
    }

    // Completar a query
    updateQuery = sql`
      ${updateQuery}
      WHERE user_id = ${userIdToUpdate}
      RETURNING *
    `;

    // Executar a atualização
    const updatedProfile = await updateQuery;

    return {
      success: true,
      profile: updatedProfile[0],
      message: "Perfil atualizado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return {
      success: false,
      error: error.message,
      message: "Falha ao atualizar perfil de usuário",
    };
  }
}