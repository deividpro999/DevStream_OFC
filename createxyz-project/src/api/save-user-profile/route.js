async function handler({ name, avatar }) {
  try {
    // Validate input
    if (!name || typeof name !== "string" || name.trim() === "") {
      return {
        success: false,
        error: "Nome de usuário é obrigatório",
      };
    }

    if (!avatar || typeof avatar !== "number") {
      return {
        success: false,
        error: "Avatar inválido",
      };
    }

    // Create a temporary user ID based on a hash of the name and current timestamp
    const tempUserId = Math.floor(Math.random() * 1000000) + 1;
    const currentTime = new Date();
    const initialCoins = 1000;

    // Return profile data
    return {
      success: true,
      profile: {
        id: tempUserId,
        name: name.trim(),
        avatar: avatar,
        coins: initialCoins,
        createdAt: currentTime.toISOString(),
      },
      message:
        "Perfil salvo com sucesso! Como estamos usando localStorage, os dados serão armazenados apenas neste dispositivo.",
    };
  } catch (error) {
    console.error("Error saving user profile:", error);
    return {
      success: false,
      error: "Erro ao salvar o perfil do usuário",
    };
  }
}