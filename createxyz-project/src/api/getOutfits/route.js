async function handler({ maxPrice }) {
  try {
    let outfits;

    if (maxPrice && !isNaN(maxPrice)) {
      outfits = await sql`
        SELECT * FROM outfits 
        WHERE price <= ${maxPrice}
        ORDER BY price ASC
      `;
    } else {
      outfits = await sql`
        SELECT * FROM outfits
        ORDER BY price ASC
      `;
    }

    return {
      success: true,
      outfits: outfits,
    };
  } catch (error) {
    console.error("Error fetching outfits:", error);
    return {
      success: false,
      error: "Erro ao buscar roupas",
      details: error.message,
    };
  }
}