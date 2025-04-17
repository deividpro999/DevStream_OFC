async function handler({ followerId, followingId }) {
  // Validate input parameters
  if (!followerId || !followingId) {
    return {
      success: false,
      error:
        "Missing required parameters: followerId and followingId are required",
    };
  }

  // Check if users exist
  try {
    const followerExists =
      await sql`SELECT id FROM auth_users WHERE id = ${followerId}`;
    const followingExists =
      await sql`SELECT id FROM auth_users WHERE id = ${followingId}`;

    if (followerExists.length === 0) {
      return {
        success: false,
        error: "Follower user does not exist",
      };
    }

    if (followingExists.length === 0) {
      return {
        success: false,
        error: "Following user does not exist",
      };
    }

    // Check if already following
    const existingFollow = await sql`
      SELECT id FROM followers 
      WHERE follower_id = ${followerId} AND following_id = ${followingId}
    `;

    if (existingFollow.length > 0) {
      return {
        success: false,
        error: "Already following this user",
      };
    }

    // Create follow relationship
    await sql`
      INSERT INTO followers (follower_id, following_id)
      VALUES (${followerId}, ${followingId})
    `;

    return {
      success: true,
      message: "Successfully followed user",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to follow user: " + error.message,
    };
  }
}