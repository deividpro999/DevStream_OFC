"use client";
import React from "react";

function MainComponent() {
  const [character, setCharacter] = React.useState({
    base: 1,
    hair: 1,
    eyes: 1,
    mouth: 1,
    outfit: 1,
    accessory: 0,
    hairColor: "#ff9cda",
    eyeColor: "#4287f5",
    outfitColor: "#ff5252",
    accessoryColor: "#ffeb3b",
    skinColor: "#ffe0bd",
    name: "Meu VTuber",
  });

  const [savedCharacters, setSavedCharacters] = React.useState([]);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showGallery, setShowGallery] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("base");
  const [characterName, setCharacterName] = React.useState("");
  const [showTemplateModal, setShowTemplateModal] = React.useState(false);

  const maxOptions = {
    base: 3,
    hair: 5,
    eyes: 4,
    mouth: 4,
    outfit: 10,
    accessory: 3,
  };

  const tabNames = {
    base: "Rosto",
    skin: "Pele",
    hair: "Cabelo",
    eyes: "Olhos",
    mouth: "Boca",
    outfit: "Roupa",
    accessory: "Acessório",
  };

  const tabIcons = {
    base: "user",
    skin: "palette",
    hair: "cut",
    eyes: "eye",
    mouth: "smile",
    outfit: "tshirt",
    accessory: "hat-wizard",
  };

  const characterTemplates = [
    {
      id: "template1",
      name: "Kawaii Chan",
      base: 1,
      hair: 2,
      eyes: 3,
      mouth: 2,
      outfit: 3,
      accessory: 1,
      hairColor: "#ff9cda",
      eyeColor: "#4287f5",
      outfitColor: "#ff5252",
      accessoryColor: "#ffeb3b",
      skinColor: "#ffe0bd",
      description: "Personagem fofo com estilo anime clássico",
      thumbnail: "https://source.unsplash.com/random/300x300/?anime,cute,pink",
    },
    {
      id: "template2",
      name: "Tech Ninja",
      base: 2,
      hair: 4,
      eyes: 1,
      mouth: 3,
      outfit: 6,
      accessory: 2,
      hairColor: "#3d3d3d",
      eyeColor: "#00ff00",
      outfitColor: "#2c2c2c",
      accessoryColor: "#00ff00",
      skinColor: "#f1c27d",
      description: "Personagem com estilo cyberpunk futurista",
      thumbnail: "https://source.unsplash.com/random/300x300/?cyberpunk,neon",
    },
    {
      id: "template3",
      name: "Magical Girl",
      base: 3,
      hair: 5,
      eyes: 2,
      mouth: 1,
      outfit: 5,
      accessory: 3,
      hairColor: "#ffb7ff",
      eyeColor: "#ff00ff",
      outfitColor: "#c4a7ff",
      accessoryColor: "#ffeb3b",
      skinColor: "#ffdbac",
      description: "Personagem mágico com poderes especiais",
      thumbnail:
        "https://source.unsplash.com/random/300x300/?anime,magical,girl",
    },
    {
      id: "template4",
      name: "Esportista",
      base: 2,
      hair: 3,
      eyes: 4,
      mouth: 2,
      outfit: 4,
      accessory: 1,
      hairColor: "#4287f5",
      eyeColor: "#333333",
      outfitColor: "#42f5a7",
      accessoryColor: "#ffffff",
      skinColor: "#c68642",
      description: "Personagem atlético pronto para competições",
      thumbnail: "https://source.unsplash.com/random/300x300/?anime,sports",
    },
  ];

  React.useEffect(() => {
    const savedData = localStorage.getItem("vtuberCharacters");
    if (savedData) {
      setSavedCharacters(JSON.parse(savedData));
    }
  }, []);

  const updateCharacter = (property, value) => {
    setCharacter((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handlePrevOption = (category) => {
    setCharacter((prev) => {
      const currentValue = prev[category];
      const maxValue = maxOptions[category];
      const newValue = currentValue <= 1 ? maxValue : currentValue - 1;
      return {
        ...prev,
        [category]: newValue,
      };
    });
  };

  const handleNextOption = (category) => {
    setCharacter((prev) => {
      const currentValue = prev[category];
      const maxValue = maxOptions[category];
      const newValue = currentValue >= maxValue ? 1 : currentValue + 1;
      return {
        ...prev,
        [category]: newValue,
      };
    });
  };

  const saveCharacter = () => {
    if (!characterName.trim()) return;

    const newCharacter = {
      ...character,
      id: Date.now(),
      name: characterName,
      createdAt: new Date().toISOString(),
    };

    const updatedCharacters = [...savedCharacters, newCharacter];
    setSavedCharacters(updatedCharacters);
    localStorage.setItem("vtuberCharacters", JSON.stringify(updatedCharacters));

    setShowSaveModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const loadCharacter = (char) => {
    setCharacter(char);
    setShowGallery(false);
  };

  const deleteCharacter = (id) => {
    const updatedCharacters = savedCharacters.filter((char) => char.id !== id);
    setSavedCharacters(updatedCharacters);
    localStorage.setItem("vtuberCharacters", JSON.stringify(updatedCharacters));
  };

  const openSaveModal = () => {
    setCharacterName(character.name);
    setShowSaveModal(true);
  };

  const openTemplateModal = (template) => {
    setCharacter(template);
    setShowTemplateModal(true);
  };

  const renderCharacterPreview = () => {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-b from-purple-900 to-pink-900 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat"></div>
        </div>

        <div className="relative w-48 md:w-64 h-48 md:h-64 z-10">
          <img
            src="/vtuber/base-character.png"
            alt="Base do personagem"
            className="w-full h-full object-contain"
            style={{
              filter:
                character.skinColor !== "#ffe0bd"
                  ? `hue-rotate(${getHueRotation(character.skinColor)})`
                  : "none",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ucarecdn.com/8032fc45-9a36-4819-b4ff-d04c6408a385/-/format/auto/";
            }}
          />

          <img
            src={`/vtuber/hair${character.hair}.png`}
            alt="Cabelo do personagem"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: `hue-rotate(${getHueRotation(character.hairColor)})`,
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/random/300x300/?anime,hair,${character.hair}`;
            }}
          />

          <img
            src={`/vtuber/eyes${character.eyes}.png`}
            alt="Olhos do personagem"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: `hue-rotate(${getHueRotation(character.eyeColor)})`,
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/random/300x300/?anime,eyes,${character.eyes}`;
            }}
          />

          <img
            src={`/vtuber/mouth${character.mouth}.png`}
            alt="Boca do personagem"
            className="absolute inset-0 w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/random/300x300/?anime,mouth,${character.mouth}`;
            }}
          />

          <img
            src={`/vtuber/outfit${character.outfit}.png`}
            alt="Roupa do personagem"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: `hue-rotate(${getHueRotation(character.outfitColor)})`,
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/random/300x300/?anime,outfit,${character.outfit}`;
            }}
          />

          {character.accessory > 0 && (
            <img
              src={`/vtuber/accessory${character.accessory}.png`}
              alt="Acessório do personagem"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                filter: `hue-rotate(${getHueRotation(
                  character.accessoryColor
                )})`,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/random/300x300/?anime,accessory,${character.accessory}`;
              }}
            />
          )}
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">
            {character.name}
          </h2>
        </div>
      </div>
    );
  };

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

  const renderColorPicker = (property, label) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        <div className="flex items-center">
          <input
            type="color"
            value={character[property]}
            onChange={(e) => updateCharacter(property, e.target.value)}
            className="w-10 h-10 rounded-md cursor-pointer mr-2"
          />
          <span className="text-sm text-gray-400 uppercase">
            {character[property]}
          </span>
        </div>
      </div>
    );
  };

  const renderOptionSelector = (category) => {
    return (
      <div className="flex items-center justify-between bg-[#2a2a2a] rounded-lg p-3 mb-4">
        <button
          onClick={() => handlePrevOption(category)}
          className="w-10 h-10 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center transition-colors"
        >
          <i className="fas fa-chevron-left text-gray-300"></i>
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-400">Opção</span>
          <div className="text-lg font-bold">
            {character[category]} / {maxOptions[category]}
          </div>
        </div>

        <button
          onClick={() => handleNextOption(category)}
          className="w-10 h-10 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center transition-colors"
        >
          <i className="fas fa-chevron-right text-gray-300"></i>
        </button>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "base":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Formato do Rosto</h3>
            {renderOptionSelector("base")}
          </div>
        );
      case "skin":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Cor da Pele</h3>
            {renderColorPicker("skinColor", "Escolha a cor da pele")}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {popularSkinColors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateCharacter("skinColor", color)}
                  className="w-full h-10 rounded-md border-2 border-white"
                  style={{ backgroundColor: color }}
                  title={color}
                ></button>
              ))}
            </div>
          </div>
        );
      case "hair":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Estilo de Cabelo</h3>
            {renderOptionSelector("hair")}
            {renderColorPicker("hairColor", "Cor do Cabelo")}
          </div>
        );
      case "eyes":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Formato dos Olhos</h3>
            {renderOptionSelector("eyes")}
            {renderColorPicker("eyeColor", "Cor dos Olhos")}
          </div>
        );
      case "mouth":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Estilo da Boca</h3>
            {renderOptionSelector("mouth")}
          </div>
        );
      case "outfit":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Estilo de Roupa</h3>
            {renderOptionSelector("outfit")}
            {renderColorPicker("outfitColor", "Cor da Roupa")}

            {character.outfit > 0 && outfitInfo[character.outfit - 1] && (
              <div className="mt-4 p-3 bg-[#2a2a2a] rounded-lg">
                <h4 className="font-bold">
                  {outfitInfo[character.outfit - 1].name}
                </h4>
                <p className="text-sm text-gray-400">
                  Categoria: {outfitInfo[character.outfit - 1].category}
                </p>
              </div>
            )}

            <div className="mt-4">
              <h4 className="font-bold mb-2">Filtrar por categoria:</h4>
              <div className="flex flex-wrap gap-2">
                {outfitCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      const firstOutfitInCategory =
                        category.id === "all"
                          ? 1
                          : outfitInfo.find((o) => o.category === category.id)
                              ?.id || 1;
                      updateCharacter("outfit", firstOutfitInCategory);
                    }}
                    className="px-3 py-1 rounded-md text-sm bg-[#2a2a2a] hover:bg-[#333] transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "accessory":
        return (
          <div>
            <h3 className="text-lg font-bold mb-3">Acessórios</h3>
            {renderOptionSelector("accessory")}
            {character.accessory > 0 &&
              renderColorPicker("accessoryColor", "Cor do Acessório")}
            <p className="text-sm text-gray-400 mt-2">
              Dica: Escolha 0 para não usar nenhum acessório
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderGallery = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-[#1a1a1a] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#333] flex justify-between items-center">
            <h2 className="text-xl font-bold">Galeria de Personagens</h2>
            <button
              onClick={() => setShowGallery(false)}
              className="w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center"
            >
              <i className="fas fa-times text-gray-300"></i>
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-grow">
            {savedCharacters.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-folder-open text-5xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">
                  Nenhum personagem salvo
                </h3>
                <p className="text-gray-400">
                  Crie e salve seu primeiro personagem para vê-lo aqui!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedCharacters.map((char) => (
                  <div
                    key={char.id}
                    className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#333] hover:border-purple-500 transition-colors"
                  >
                    <div className="h-48 bg-gradient-to-b from-purple-900 to-pink-900 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <img
                            src="/vtuber/base-character.png"
                            alt="Base"
                            className="w-full h-full object-contain"
                            style={{
                              filter: `hue-rotate(${getHueRotation(
                                char.skinColor
                              )})`,
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://source.unsplash.com/random/300x300/?anime,face,${char.base}`;
                            }}
                          />
                          <img
                            src={`/vtuber/hair${char.hair}.png`}
                            alt="Cabelo"
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                              filter: `hue-rotate(${getHueRotation(
                                char.hairColor
                              )})`,
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://source.unsplash.com/random/300x300/?anime,hair,${char.hair}`;
                            }}
                          />
                          <img
                            src={`/vtuber/eyes${char.eyes}.png`}
                            alt="Olhos"
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                              filter: `hue-rotate(${getHueRotation(
                                char.eyeColor
                              )})`,
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://source.unsplash.com/random/300x300/?anime,eyes,${char.eyes}`;
                            }}
                          />
                          <img
                            src={`/vtuber/mouth${char.mouth}.png`}
                            alt="Boca"
                            className="absolute inset-0 w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://source.unsplash.com/random/300x300/?anime,mouth,${char.mouth}`;
                            }}
                          />
                          <img
                            src={`/vtuber/outfit${char.outfit}.png`}
                            alt="Roupa"
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                              filter: `hue-rotate(${getHueRotation(
                                char.outfitColor
                              )})`,
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://source.unsplash.com/random/300x300/?anime,outfit,${char.outfit}`;
                            }}
                          />
                          {char.accessory > 0 && (
                            <img
                              src={`/vtuber/accessory${char.accessory}.png`}
                              alt="Acessório"
                              className="absolute inset-0 w-full h-full object-contain"
                              style={{
                                filter: `hue-rotate(${getHueRotation(
                                  char.accessoryColor
                                )})`,
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://source.unsplash.com/random/300x300/?anime,accessory,${char.accessory}`;
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="font-bold text-lg mb-1 truncate">
                        {char.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">
                        {new Date(char.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => loadCharacter(char)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm transition-colors"
                        >
                          Carregar
                        </button>
                        <button
                          onClick={() => deleteCharacter(char.id)}
                          className="w-10 h-10 bg-[#333] hover:bg-red-900 text-gray-300 hover:text-white rounded flex items-center justify-center transition-colors"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSaveModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-[#1a1a1a] rounded-xl max-w-md w-full overflow-hidden">
          <div className="p-4 border-b border-[#333]">
            <h2 className="text-xl font-bold">Salvar Personagem</h2>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome do Personagem
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Digite um nome para seu personagem"
                className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 bg-[#333] hover:bg-[#444] text-white py-2 px-4 rounded-md transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveCharacter}
                disabled={!characterName.trim()}
                className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md transition-colors ${
                  !characterName.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-purple-700 hover:to-pink-700"
                }`}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplateModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-[#1a1a1a] rounded-xl max-w-4xl w-full overflow-hidden">
          <div className="p-4 border-b border-[#333] flex justify-between items-center">
            <h2 className="text-xl font-bold">Modelos de Personagens</h2>
            <button
              onClick={() => setShowTemplateModal(false)}
              className="w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center"
            >
              <i className="fas fa-times text-gray-300"></i>
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <p className="text-gray-400 mb-6">
              Selecione um modelo para começar a personalizar seu VTuber:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {characterTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#333] hover:border-purple-500 transition-colors cursor-pointer"
                  onClick={() => {
                    setCharacter({
                      ...template,
                      name: template.name,
                    });
                    setShowTemplateModal(false);
                  }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-bold text-lg text-white">
                        {template.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-4">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[#333] rounded-md text-xs text-purple-300">
                        <i className="fas fa-cut mr-1"></i> Cabelo{" "}
                        {template.hair}
                      </span>
                      <span className="px-2 py-1 bg-[#333] rounded-md text-xs text-blue-300">
                        <i className="fas fa-eye mr-1"></i> Olhos{" "}
                        {template.eyes}
                      </span>
                      <span className="px-2 py-1 bg-[#333] rounded-md text-xs text-pink-300">
                        <i className="fas fa-tshirt mr-1"></i> Roupa{" "}
                        {template.outfit}
                      </span>
                    </div>

                    <button
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-md transition-colors text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCharacter({
                          ...template,
                          name: template.name,
                        });
                        setShowTemplateModal(false);
                      }}
                    >
                      Usar este modelo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const outfitCategories = [
    { id: "all", name: "Todos" },
    { id: "casual", name: "Casual" },
    { id: "formal", name: "Formal" },
    { id: "fantasia", name: "Fantasia" },
    { id: "esportivo", name: "Esportivo" },
  ];

  const outfitInfo = [
    {
      id: 1,
      name: "Casual Básico",
      category: "casual",
    },
    {
      id: 2,
      name: "Uniforme Escolar",
      category: "formal",
    },
    {
      id: 3,
      name: "Vestido Elegante",
      category: "formal",
    },
    {
      id: 4,
      name: "Roupa Esportiva",
      category: "esportivo",
    },
    {
      id: 5,
      name: "Fantasia Mágica",
      category: "fantasia",
    },
    {
      id: 6,
      name: "Traje Ninja",
      category: "fantasia",
    },
    {
      id: 7,
      name: "Pijama Fofo",
      category: "casual",
    },
    {
      id: 8,
      name: "Roupa de Praia",
      category: "casual",
    },
    {
      id: 9,
      name: "Traje Espacial",
      category: "fantasia",
    },
    {
      id: 10,
      name: "Uniforme Militar",
      category: "formal",
    },
  ];

  const popularSkinColors = [
    "#ffe0bd",
    "#f1c27d",
    "#c68642",
    "#8d5524",
    "#503335",
    "#ffdbac",
    "#f5d5c5",
    "#c58c85",
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Editor de VTuber
          </h1>
          <a
            href="/sistema-de-gacha"
            className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-md text-sm transition-all flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Voltar ao Gacha
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
              <h2 className="text-xl font-bold mb-4 text-center">Seu VTuber</h2>
              {renderCharacterPreview()}

              <div className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Personagem
                  </label>
                  <input
                    type="text"
                    value={character.name}
                    onChange={(e) => updateCharacter("name", e.target.value)}
                    placeholder="Digite um nome para seu personagem"
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowGallery(true)}
                    className="flex-1 bg-[#2a2a2a] hover:bg-[#333] text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-images mr-2"></i>
                    Galeria
                  </button>
                  <button
                    onClick={openSaveModal}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Salvar
                  </button>
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-file mr-2"></i>
                    Carregar Template
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
              <h2 className="text-xl font-bold mb-4 text-center">
                Personalização
              </h2>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                {Object.keys(tabNames).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`p-3 rounded-lg flex flex-col items-center transition-colors ${
                      selectedTab === tab
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
                    }`}
                  >
                    <i className={`fas fa-${tabIcons[tab]} text-lg mb-1`}></i>
                    <span className="text-xs">{tabNames[tab]}</span>
                  </button>
                ))}
              </div>

              <div className="bg-[#1e1e1e] rounded-lg p-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-3 shadow-lg z-40">
        <div className="container mx-auto flex justify-center items-center space-x-6">
          <a
            href="/sistema-de-gacha"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-dice text-xl mb-1"></i>
            <span className="text-xs">Gacha</span>
          </a>
          <a
            href="/editor"
            className="flex flex-col items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <i className="fas fa-user-edit text-xl mb-1"></i>
            <span className="text-xs">Editor</span>
          </a>
          <a
            href="/loja"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-store text-xl mb-1"></i>
            <span className="text-xs">Loja</span>
          </a>
          <a
            href="/new-page"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-1">
              <span className="text-lg font-bold">+</span>
            </div>
            <span className="text-xs">Novo</span>
          </a>
        </div>
      </footer>

      {showGallery && renderGallery()}
      {showSaveModal && renderSaveModal()}
      {showTemplateModal && renderTemplateModal()}

      {showSuccessMessage && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>Personagem salvo com sucesso!</span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 3s ease-in-out forwards;
        }
        
        img {
          image-rendering: pixelated;
          mix-blend-mode: normal;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;