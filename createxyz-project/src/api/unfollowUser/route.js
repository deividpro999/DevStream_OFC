async function handler({ followerId, followingId }) {
  if (!followerId || !followingId) {
    return {
      success: false,
      error: "Ambos followerId e followingId são obrigatórios",
    };
  }

  try {
    // Remove the follower relationship from the database
    const result = await sql`
      DELETE FROM followers 
      WHERE follower_id = ${followerId} AND following_id = ${followingId}
    `;

    if (result.count === 0) {
      return {
        success: false,
        error: "Relação de seguidor não encontrada",
      };
    }

    return {
      success: true,
      message: "Deixou de seguir com sucesso",
    };
  } catch (error) {
    console.error("Erro ao deixar de seguir:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao deixar de seguir o usuário",
    };
  }
}