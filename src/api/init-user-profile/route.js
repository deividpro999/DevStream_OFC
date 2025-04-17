async function handler({ userId, bio, avatar_url }) {
  try {
    const existingProfile = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    if (existingProfile.length > 0) {
      return {
        success: true,
        profile: existingProfile[0],
        message: "Profile already exists",
      };
    }

    const initialCoins = 500;
    const defaultBio = bio || "Olá! Sou novo no DevStream.";

    const newProfile = await sql`
      INSERT INTO user_profiles 
        (user_id, coins, bio, avatar_url) 
      VALUES 
        (${userId}, ${initialCoins}, ${defaultBio}, ${avatar_url})
      RETURNING *
    `;

    await sql`
      INSERT INTO coin_transactions
        (user_id, amount, description, transaction_type)
      VALUES
        (${userId}, ${initialCoins}, 'Bônus de boas-vindas', 'bonus')
    `;

    return {
      success: true,
      profile: newProfile[0],
      message: "Profile created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Failed to initialize user profile",
    };
  }
}