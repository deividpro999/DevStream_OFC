"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({
  selectedOutfit = 1,
  outfitColor = "#ff5252",
  onOutfitChange,
  onColorChange,
  outfitCategory = "all",
}) {
  const outfits = [
    {
      id: 1,
      name: "Casual Básico",
      category: "casual",
      image: "/vtuber/outfit1.png",
    },
    {
      id: 2,
      name: "Uniforme Escolar",
      category: "formal",
      image: "/vtuber/outfit2.png",
    },
    {
      id: 3,
      name: "Vestido Elegante",
      category: "formal",
      image: "/vtuber/outfit3.png",
    },
    {
      id: 4,
      name: "Roupa Esportiva",
      category: "esportivo",
      image: "/vtuber/outfit4.png",
    },
    {
      id: 5,
      name: "Fantasia Mágica",
      category: "fantasia",
      image: "/vtuber/outfit5.png",
    },
    {
      id: 6,
      name: "Traje Ninja",
      category: "fantasia",
      image: "/vtuber/outfit6.png",
    },
    {
      id: 7,
      name: "Pijama Fofo",
      category: "casual",
      image: "/vtuber/outfit7.png",
    },
    {
      id: 8,
      name: "Roupa de Praia",
      category: "casual",
      image: "/vtuber/outfit8.png",
    },
    {
      id: 9,
      name: "Traje Espacial",
      category: "fantasia",
      image: "/vtuber/outfit9.png",
    },
    {
      id: 10,
      name: "Uniforme Militar",
      category: "formal",
      image: "/vtuber/outfit10.png",
    },
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "casual", name: "Casual" },
    { id: "formal", name: "Formal" },
    { id: "fantasia", name: "Fantasia" },
    { id: "esportivo", name: "Esportivo" },
  ];

  const popularColors = [
    "#ff5252",
    "#4287f5",
    "#42f5a7",
    "#f542f2",
    "#f5d442",
    "#8c42f5",
    "#f58c42",
    "#42f5f2",
    "#ffffff",
    "#000000",
  ];

  const filteredOutfits =
    outfitCategory === "all"
      ? outfits
      : outfits.filter((outfit) => outfit.category === outfitCategory);

  const getHueRotation = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16) / 255;
    const g = parseInt(hexColor.substr(3, 2), 16) / 255;
    const b = parseInt(hexColor.substr(5, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;

    if (max === min) {
      h = 0;
    } else if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else {
      h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) h += 360;

    return `${h}deg`;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
      <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Roupas para VTuber
      </h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">Visualização</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">Cor:</span>
            <input
              type="color"
              value={outfitColor}
              onChange={(e) => onColorChange && onColorChange(e.target.value)}
              className="w-8 h-8 rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-gradient-to-b from-purple-900 to-pink-900 rounded-xl p-4 flex items-center justify-center">
          <div className="relative w-48 h-48">
            <img
              src={
                outfits.find((o) => o.id === selectedOutfit)?.image ||
                "/vtuber/outfit1.png"
              }
              alt="Roupa selecionada"
              className="w-full h-full object-contain"
              style={{
                filter: `hue-rotate(${getHueRotation(outfitColor)})`,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/random/300x300/?anime,outfit,${selectedOutfit}`;
              }}
            />
          </div>
        </div>

        <div className="mt-3">
          <h4 className="font-bold text-center">
            {outfits.find((o) => o.id === selectedOutfit)?.name ||
              "Roupa Padrão"}
          </h4>
          <p className="text-sm text-gray-400 text-center">
            Categoria:{" "}
            {outfits.find((o) => o.id === selectedOutfit)?.category || "casual"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Cores Populares</h3>
        <div className="grid grid-cols-5 gap-2">
          {popularColors.map((color, index) => (
            <button
              key={index}
              onClick={() => onColorChange && onColorChange(color)}
              className={`w-full h-10 rounded-md transition-all transform hover:scale-110 ${color === outfitColor ? "ring-2 ring-white" : ""}`}
              style={{ backgroundColor: color }}
              title={color}
            ></button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onOutfitChange && onOutfitChange(selectedOutfit, category.id)
              }
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                outfitCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Roupas Disponíveis</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredOutfits.map((outfit) => (
            <div
              key={outfit.id}
              onClick={() =>
                onOutfitChange && onOutfitChange(outfit.id, outfitCategory)
              }
              className={`bg-[#2a2a2a] rounded-lg overflow-hidden cursor-pointer transition-all hover:bg-[#333] ${
                selectedOutfit === outfit.id ? "ring-2 ring-purple-500" : ""
              }`}
            >
              <div className="h-24 bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center">
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  className="h-20 w-20 object-contain"
                  style={{
                    filter: `hue-rotate(${getHueRotation(outfitColor)})`,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://source.unsplash.com/random/300x300/?anime,outfit,${outfit.id}`;
                  }}
                />
              </div>
              <div className="p-2">
                <h4 className="text-sm font-bold truncate">{outfit.name}</h4>
                <p className="text-xs text-gray-400">{outfit.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        img {
          image-rendering: pixelated;
          mix-blend-mode: normal;
        }
      `}</style>
    </div>
  );
}

function StoryComponent() {
  const [selectedOutfit, setSelectedOutfit] = React.useState(1);
  const [outfitColor, setOutfitColor] = React.useState("#ff5252");
  const [outfitCategory, setOutfitCategory] = React.useState("all");

  const handleOutfitChange = (outfitId, category) => {
    setSelectedOutfit(outfitId);
    setOutfitCategory(category);
  };

  const handleColorChange = (color) => {
    setOutfitColor(color);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Componente de Roupas VTuber
      </h1>

      <div className="max-w-3xl mx-auto">
        <MainComponent
          selectedOutfit={selectedOutfit}
          outfitColor={outfitColor}
          outfitCategory={outfitCategory}
          onOutfitChange={handleOutfitChange}
          onColorChange={handleColorChange}
        />
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Variantes do Componente</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Categoria Casual</h3>
            <MainComponent
              selectedOutfit={7}
              outfitColor="#42f5a7"
              outfitCategory="casual"
              onOutfitChange={() => {}}
              onColorChange={() => {}}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Categoria Fantasia</h3>
            <MainComponent
              selectedOutfit={5}
              outfitColor="#8c42f5"
              outfitCategory="fantasia"
              onOutfitChange={() => {}}
              onColorChange={() => {}}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Categoria Formal</h3>
            <MainComponent
              selectedOutfit={3}
              outfitColor="#f542f2"
              outfitCategory="formal"
              onOutfitChange={() => {}}
              onColorChange={() => {}}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Categoria Esportivo</h3>
            <MainComponent
              selectedOutfit={4}
              outfitColor="#4287f5"
              outfitCategory="esportivo"
              onOutfitChange={() => {}}
              onColorChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
}