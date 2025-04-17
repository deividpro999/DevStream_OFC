async function handler({ name }) {
  const session = getSession();

  if (!session || !session.user) {
    return {
      success: false,
      message: "Usuário não autenticado",
    };
  }

  try {
    const result = await sql`
      UPDATE auth_users 
      SET name = ${name}
      WHERE id = ${session.user.id}
      RETURNING id, name, email
    `;

    if (result.length === 0) {
      return {
        success: false,
        message: "Usuário não encontrado",
      };
    }

    return {
      success: true,
      message: "Nome atualizado com sucesso",
      user: result[0],
    };
  } catch (error) {
    console.error("Erro ao atualizar nome do usuário:", error);
    return {
      success: false,
      message: "Erro ao atualizar nome do usuário",
    };
  }
}