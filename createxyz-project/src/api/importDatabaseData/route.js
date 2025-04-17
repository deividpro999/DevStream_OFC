async function handler({ data }) {
  const session = getSession();

  if (!session || !session.user) {
    return { error: "Não autenticado", status: 401 };
  }

  const adminEmail = "admin@devstream.com";
  if (session.user.email !== adminEmail) {
    return {
      error: "Permissão negada. Apenas administradores podem importar dados.",
      status: 403,
    };
  }

  if (!data || typeof data !== "object") {
    return {
      error: "Dados inválidos. É necessário fornecer um objeto JSON válido.",
      status: 400,
    };
  }

  try {
    const result = await sql.transaction(async (txn) => {
      const importResults = {};

      if (data.userProfiles && Array.isArray(data.userProfiles)) {
        const profileResults = [];

        for (const profile of data.userProfiles) {
          const existingProfiles = await txn`
            SELECT * FROM user_profiles WHERE user_id = ${profile.user_id}
          `;

          if (existingProfiles.length > 0) {
            const updated = await txn`
              UPDATE user_profiles 
              SET coins = ${profile.coins},
                  bio = ${profile.bio},
                  avatar_url = ${profile.avatar_url},
                  updated_at = CURRENT_TIMESTAMP
              WHERE user_id = ${profile.user_id}
              RETURNING *
            `;
            profileResults.push({ action: "updated", profile: updated[0] });
          } else {
            const inserted = await txn`
              INSERT INTO user_profiles (user_id, coins, bio, avatar_url)
              VALUES (${profile.user_id}, ${profile.coins}, ${profile.bio}, ${profile.avatar_url})
              RETURNING *
            `;
            profileResults.push({ action: "inserted", profile: inserted[0] });
          }
        }

        importResults.userProfiles = profileResults;
      }

      if (data.characters && Array.isArray(data.characters)) {
        const characterResults = [];

        for (const character of data.characters) {
          const existingCharacters = await txn`
            SELECT * FROM characters WHERE id = ${character.id}
          `;

          if (existingCharacters.length > 0) {
            const updated = await txn`
              UPDATE characters 
              SET name = ${character.name},
                  description = ${character.description},
                  rarity = ${character.rarity},
                  image_url = ${character.image_url}
              WHERE id = ${character.id}
              RETURNING *
            `;
            characterResults.push({ action: "updated", character: updated[0] });
          } else {
            const inserted = await txn`
              INSERT INTO characters (id, name, description, rarity, image_url)
              VALUES (${character.id}, ${character.name}, ${character.description}, ${character.rarity}, ${character.image_url})
              RETURNING *
            `;
            characterResults.push({
              action: "inserted",
              character: inserted[0],
            });
          }
        }

        importResults.characters = characterResults;
      }

      if (data.userCharacters && Array.isArray(data.userCharacters)) {
        const userCharacterResults = [];

        for (const userCharacter of data.userCharacters) {
          const existingUserCharacters = await txn`
            SELECT * FROM user_characters 
            WHERE user_id = ${userCharacter.user_id} AND character_id = ${userCharacter.character_id}
          `;

          if (existingUserCharacters.length === 0) {
            const inserted = await txn`
              INSERT INTO user_characters (user_id, character_id)
              VALUES (${userCharacter.user_id}, ${userCharacter.character_id})
              RETURNING *
            `;
            userCharacterResults.push({
              action: "inserted",
              userCharacter: inserted[0],
            });
          } else {
            userCharacterResults.push({
              action: "skipped",
              reason: "already exists",
            });
          }
        }

        importResults.userCharacters = userCharacterResults;
      }

      if (data.outfits && Array.isArray(data.outfits)) {
        const outfitResults = [];

        for (const outfit of data.outfits) {
          const existingOutfits = await txn`
            SELECT * FROM outfits WHERE id = ${outfit.id}
          `;

          if (existingOutfits.length > 0) {
            const updated = await txn`
              UPDATE outfits 
              SET name = ${outfit.name},
                  description = ${outfit.description},
                  price = ${outfit.price},
                  image_url = ${outfit.image_url}
              WHERE id = ${outfit.id}
              RETURNING *
            `;
            outfitResults.push({ action: "updated", outfit: updated[0] });
          } else {
            const inserted = await txn`
              INSERT INTO outfits (id, name, description, price, image_url)
              VALUES (${outfit.id}, ${outfit.name}, ${outfit.description}, ${outfit.price}, ${outfit.image_url})
              RETURNING *
            `;
            outfitResults.push({ action: "inserted", outfit: inserted[0] });
          }
        }

        importResults.outfits = outfitResults;
      }

      if (data.userOutfits && Array.isArray(data.userOutfits)) {
        const userOutfitResults = [];

        for (const userOutfit of data.userOutfits) {
          const existingUserOutfits = await txn`
            SELECT * FROM user_outfits 
            WHERE user_id = ${userOutfit.user_id} AND outfit_id = ${userOutfit.outfit_id}
          `;

          if (existingUserOutfits.length === 0) {
            const inserted = await txn`
              INSERT INTO user_outfits (user_id, outfit_id)
              VALUES (${userOutfit.user_id}, ${userOutfit.outfit_id})
              RETURNING *
            `;
            userOutfitResults.push({
              action: "inserted",
              userOutfit: inserted[0],
            });
          } else {
            userOutfitResults.push({
              action: "skipped",
              reason: "already exists",
            });
          }
        }

        importResults.userOutfits = userOutfitResults;
      }

      if (data.coinTransactions && Array.isArray(data.coinTransactions)) {
        const transactionResults = [];

        for (const transaction of data.coinTransactions) {
          const inserted = await txn`
            INSERT INTO coin_transactions (user_id, amount, description, transaction_type)
            VALUES (${transaction.user_id}, ${transaction.amount}, ${transaction.description}, ${transaction.transaction_type})
            RETURNING *
          `;
          transactionResults.push({
            action: "inserted",
            transaction: inserted[0],
          });
        }

        importResults.coinTransactions = transactionResults;
      }

      if (data.followers && Array.isArray(data.followers)) {
        const followerResults = [];

        for (const follower of data.followers) {
          const existingFollowers = await txn`
            SELECT * FROM followers 
            WHERE follower_id = ${follower.follower_id} AND following_id = ${follower.following_id}
          `;

          if (existingFollowers.length === 0) {
            const inserted = await txn`
              INSERT INTO followers (follower_id, following_id)
              VALUES (${follower.follower_id}, ${follower.following_id})
              RETURNING *
            `;
            followerResults.push({ action: "inserted", follower: inserted[0] });
          } else {
            followerResults.push({
              action: "skipped",
              reason: "already exists",
            });
          }
        }

        importResults.followers = followerResults;
      }

      return importResults;
    });

    return {
      success: true,
      message: "Dados importados com sucesso",
      results: result,
    };
  } catch (error) {
    console.error("Erro ao importar dados:", error);
    return {
      success: false,
      error: "Erro ao importar dados",
      details: error.message,
    };
  }
}