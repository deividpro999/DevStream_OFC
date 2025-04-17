"use client";
import React from "react";

function MainComponent() {
  const [characters, setCharacters] = React.useState([
    {
      id: 1,
      name: "Ruby Developer",
      rarity: 5,
      image: "/ruby.jpg",
      description: "Master of elegant code",
      type: "developer",
    },
    {
      id: 2,
      name: "Python Wizard",
      rarity: 5,
      image: "/python.jpg",
      description: "Data science specialist",
      type: "developer",
    },
    {
      id: 3,
      name: "JavaScript Ninja",
      rarity: 4,
      image: "/javascript.jpg",
      description: "Frontend virtuoso",
      type: "developer",
    },
    {
      id: 4,
      name: "Rust Engineer",
      rarity: 5,
      image: "/rust.jpg",
      description: "Performance optimizer",
      type: "developer",
    },
    {
      id: 5,
      name: "Go Architect",
      rarity: 4,
      image: "/go.jpg",
      description: "Concurrency expert",
      type: "developer",
    },
    {
      id: 6,
      name: "C# Specialist",
      rarity: 4,
      image: "/csharp.jpg",
      description: "Enterprise solution builder",
      type: "developer",
    },
    {
      id: 7,
      name: "Java Veteran",
      rarity: 3,
      image: "/java.jpg",
      description: "Backend stalwart",
      type: "developer",
    },
    {
      id: 8,
      name: "PHP Artisan",
      rarity: 3,
      image: "/php.jpg",
      description: "Web development pioneer",
      type: "developer",
    },
    {
      id: 9,
      name: "Swift Coder",
      rarity: 4,
      image: "/swift.jpg",
      description: "Mobile app creator",
      type: "developer",
    },
    {
      id: 10,
      name: "Kotlin Developer",
      rarity: 3,
      image: "/kotlin.jpg",
      description: "Android specialist",
      type: "developer",
    },
    {
      id: 11,
      name: "Kizuna AI",
      rarity: 5,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,girl,pink",
      description: "A primeira e mais famosa VTuber",
      type: "vtuber",
    },
    {
      id: 12,
      name: "Gawr Gura",
      rarity: 5,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,shark,blue",
      description: "VTuber com tema de tubarão",
      type: "vtuber",
    },
    {
      id: 13,
      name: "Mori Calliope",
      rarity: 5,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,dark,pink",
      description: "VTuber com tema de ceifadora",
      type: "vtuber",
    },
    {
      id: 14,
      name: "Inugami Korone",
      rarity: 4,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,dog,orange",
      description: "VTuber com tema de cachorro",
      type: "vtuber",
    },
    {
      id: 15,
      name: "Nekomata Okayu",
      rarity: 4,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,cat,purple",
      description: "VTuber com tema de gato",
      type: "vtuber",
    },
    {
      id: 16,
      name: "Usada Pekora",
      rarity: 4,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,rabbit,blue",
      description: "VTuber com tema de coelho",
      type: "vtuber",
    },
    {
      id: 17,
      name: "Shirakami Fubuki",
      rarity: 4,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,fox,white",
      description: "VTuber com tema de raposa",
      type: "vtuber",
    },
    {
      id: 18,
      name: "Amelia Watson",
      rarity: 4,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,detective,blonde",
      description: "VTuber detetive do tempo",
      type: "vtuber",
    },
    {
      id: 19,
      name: "Houshou Marine",
      rarity: 3,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,pirate,red",
      description: "VTuber com tema de pirata",
      type: "vtuber",
    },
    {
      id: 20,
      name: "Sakura Miko",
      rarity: 3,
      image:
        "https://source.unsplash.com/random/300x400/?anime,vtuber,shrine,pink",
      description: "VTuber com tema de sacerdotisa",
      type: "vtuber",
    },
  ]);

  const [inventory, setInventory] = React.useState([]);
  const [pullResults, setPullResults] = React.useState([]);
  const [isPulling, setIsPulling] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [selectedRarity, setSelectedRarity] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("gacha");
  const [moedas, setMoedas] = React.useState(1000);
  const [showNotEnoughCoins, setShowNotEnoughCoins] = React.useState(false);
  const [pullCounter, setPullCounter] = React.useState(0);
  const [showPityReset, setShowPityReset] = React.useState(false);
  const [showCollectedMessage, setShowCollectedMessage] = React.useState(false);
  const [cardsToOpen, setCardsToOpen] = React.useState([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [isCardOpening, setIsCardOpening] = React.useState(false);
  const [showCardOpeningScreen, setShowCardOpeningScreen] =
    React.useState(false);
  const [showAllCards, setShowAllCards] = React.useState(false);
  const [destino, setDestino] = React.useState(0);
  const [pontos, setPontos] = React.useState(0);
  const [showDuplicateMessage, setShowDuplicateMessage] = React.useState(false);
  const [duplicateInfo, setDuplicateInfo] = React.useState({
    destino: 0,
    pontos: 0,
  });
  const [showDestinoEarned, setShowDestinoEarned] = React.useState(false);

  const { data: user, loading: userLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!userLoading && !user) {
      router.push("/account/signin?callbackUrl=/sistema-de-gacha");
      return;
    }

    if (!userLoading && user) {
      const checkProfile = async () => {
        try {
          const response = await fetch("/api/getUserProfile", {
            method: "POST",
          });

          if (!response.ok) {
            router.push("/configuracao-inicial-auth");
            return;
          }

          const data = await response.json();

          if (!data.success || !data.profile) {
            router.push("/configuracao-inicial-auth");
            return;
          }

          setMoedas(data.profile.coins || 1000);
        } catch (error) {
          console.error("Erro ao verificar perfil:", error);
          router.push("/configuracao-inicial-auth");
        }
      };

      checkProfile();
    }

    const savedInventory = localStorage.getItem("gachaInventory");
    if (savedInventory) {
      const parsedInventory = JSON.parse(savedInventory);

      const uniqueIds = new Set();
      let newDestino = 0;
      let newPontos = 0;

      const cleanInventory = parsedInventory.filter((card) => {
        if (uniqueIds.has(card.id)) {
          if (card.rarity === 5) {
            newDestino += 1;
          } else if (card.rarity === 4) {
            newPontos += 50;
          } else {
            newPontos += 10;
          }
          return false;
        } else {
          uniqueIds.add(card.id);
          return true;
        }
      });

      if (parsedInventory.length !== cleanInventory.length) {
        setInventory(cleanInventory);
        localStorage.setItem("gachaInventory", JSON.stringify(cleanInventory));

        if (newDestino > 0) {
          setDestino((prev) => prev + newDestino);
          localStorage.setItem("destino", (destino + newDestino).toString());
        }

        if (newPontos > 0) {
          setPontos((prev) => prev + newPontos);
          localStorage.setItem("pontos", (pontos + newPontos).toString());
        }

        if (newDestino > 0 || newPontos > 0) {
          setDuplicateInfo({ destino: newDestino, pontos: newPontos });
          setShowDuplicateMessage(true);
          setTimeout(() => setShowDuplicateMessage(false), 4000);
        }
      } else {
        setInventory(parsedInventory);
      }
    }

    const savedCoins = localStorage.getItem("moedas");
    if (savedCoins) {
      setMoedas(parseInt(savedCoins));
    }

    const savedPullCounter = localStorage.getItem("pullCounter");
    if (savedPullCounter) {
      setPullCounter(parseInt(savedPullCounter));
    }

    const savedDestino = localStorage.getItem("destino");
    if (savedDestino) {
      setDestino(parseInt(savedDestino));
    }

    const savedPontos = localStorage.getItem("pontos");
    if (savedPontos) {
      setPontos(parseInt(savedPontos));
    }
  }, [userLoading, user, router]);

  React.useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem("gachaInventory", JSON.stringify(inventory));
    }
  }, [inventory]);

  React.useEffect(() => {
    localStorage.setItem("moedas", moedas.toString());
  }, [moedas]);

  React.useEffect(() => {
    localStorage.setItem("pullCounter", pullCounter.toString());
  }, [pullCounter]);

  React.useEffect(() => {
    localStorage.setItem("destino", destino.toString());
  }, [destino]);

  React.useEffect(() => {
    localStorage.setItem("pontos", pontos.toString());
  }, [pontos]);

  const getRandomCharacter = () => {
    const rarityRoll = Math.random() * 100;
    let rarityFilter;

    if (rarityRoll < 3) {
      rarityFilter = 5;
    } else if (rarityRoll < 18) {
      rarityFilter = 4;
    } else {
      rarityFilter = 3;
    }

    const possibleCharacters = characters.filter(
      (char) => char.rarity === rarityFilter
    );
    const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
    return (
      possibleCharacters[randomIndex] ||
      characters[Math.floor(Math.random() * characters.length)]
    );
  };

  const doPull = (times) => {
    const cost = times === 1 ? 100 : 900;

    if (moedas < cost) {
      setShowNotEnoughCoins(true);
      setTimeout(() => setShowNotEnoughCoins(false), 3000);
      return;
    }

    setMoedas((prev) => prev - cost);
    setIsPulling(true);
    setShowResults(false);

    setTimeout(() => {
      const results = [];
      let foundLegendary = false;

      for (let i = 0; i < times; i++) {
        const character = getRandomCharacter();
        results.push(character);

        if (character.rarity === 5) {
          foundLegendary = true;
        }
      }

      if (foundLegendary) {
        setPullCounter(0);
        setShowPityReset(true);
        setTimeout(() => setShowPityReset(false), 3000);
      } else {
        setPullCounter((prev) => prev + times);
      }

      setPullResults(results);
      setCardsToOpen(results);
      setCurrentCardIndex(0);
      setIsPulling(false);
      setShowCardOpeningScreen(true);
    }, 2000);
  };

  const processNewCards = (newCards) => {
    let newDestino = 0;
    let newPontos = 0;
    const uniqueCards = [];
    const existingIds = inventory.map((card) => card.id);

    newCards.forEach((card) => {
      const existingCardIndex = existingIds.findIndex((id) => id === card.id);

      if (existingCardIndex === -1) {
        uniqueCards.push(card);
      } else {
        if (card.rarity === 5) {
          newDestino += 1;
          setShowDestinoEarned(true);
          setTimeout(() => setShowDestinoEarned(false), 3000);
        } else if (card.rarity === 4) {
          newPontos += 50;
        } else {
          newPontos += 10;
        }
      }
    });

    if (newDestino > 0 || newPontos > 0) {
      setDuplicateInfo({ destino: newDestino, pontos: newPontos });
      setShowDuplicateMessage(true);
      setTimeout(() => setShowDuplicateMessage(false), 4000);

      setDestino((prev) => prev + newDestino);
      setPontos((prev) => prev + newPontos);
    }

    return uniqueCards;
  };

  const openNextCard = () => {
    if (currentCardIndex < cardsToOpen.length - 1) {
      setIsCardOpening(true);
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev + 1);
        setIsCardOpening(false);
      }, 1000);
    } else {
      setIsCardOpening(true);
      setTimeout(() => {
        setShowCardOpeningScreen(false);

        const uniqueCards = processNewCards(cardsToOpen);
        setInventory((prev) => [...prev, ...uniqueCards]);

        setShowCollectedMessage(true);
        setTimeout(() => setShowCollectedMessage(false), 3000);
        setIsCardOpening(false);
      }, 1000);
    }
  };

  const skipCardOpening = () => {
    setShowCardOpeningScreen(false);
    setShowAllCards(true);
  };

  const collectAllCards = () => {
    setShowAllCards(false);

    const uniqueCards = processNewCards(cardsToOpen);
    setInventory((prev) => [...prev, ...uniqueCards]);

    setShowCollectedMessage(true);
    setTimeout(() => setShowCollectedMessage(false), 3000);
  };

  const renderStars = (rarity) => {
    return Array(rarity)
      .fill()
      .map((_, i) => (
        <i key={i} className="fas fa-star text-yellow-400 mr-1"></i>
      ));
  };

  const renderCharacterCard = (character, index, isPreview = false) => {
    if (!character) return null;

    const rarityColors = {
      3: "border-blue-500 from-blue-900 to-blue-700",
      4: "border-purple-500 from-purple-900 to-purple-700",
      5: "border-yellow-500 from-yellow-900 to-yellow-700",
    };

    const rarityNames = {
      3: "Comum",
      4: "Raro",
      5: "Lendário",
    };

    return (
      <div
        key={index}
        className={`relative rounded-lg overflow-hidden border-2 ${
          rarityColors[character.rarity].split(" ")[0]
        } transition-all duration-300 transform ${
          isPreview ? "hover:scale-105 cursor-pointer" : ""
        } ${showResults && !isPreview ? "animate-fadeIn" : ""}`}
        onClick={() => isPreview && setSelectedRarity(character.rarity)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            rarityColors[character.rarity].split(" ")[1]
          } ${rarityColors[character.rarity].split(" ")[2]} opacity-50`}
        ></div>
        <div className="relative h-full flex flex-col">
          <div className="p-2 bg-black bg-opacity-50 flex justify-between items-center">
            <div className="flex items-center">
              {renderStars(character.rarity)}
            </div>
            <span className="text-xs font-bold text-white">
              {rarityNames[character.rarity]}
            </span>
          </div>

          <div className="flex-grow flex items-center justify-center p-2">
            <img
              src={character.image}
              alt={character.name}
              className={`w-full h-32 object-cover rounded ${
                isPreview ? "opacity-80" : ""
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/random/300x400/?developer,${character.name
                  .split(" ")[0]
                  .toLowerCase()}`;
              }}
            />
          </div>

          <div className="p-2 bg-black bg-opacity-70">
            <h3 className="text-white font-bold truncate text-center">
              {character.name}
            </h3>
            {!isPreview && (
              <p className="text-gray-300 text-xs text-center">
                {character.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRarityPreview = () => {
    const rarityGroups = {};
    characters.forEach((char) => {
      if (!rarityGroups[char.rarity]) {
        rarityGroups[char.rarity] = [];
      }
      rarityGroups[char.rarity].push(char);
    });

    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Cartas por Raridade
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(rarityGroups)
            .sort((a, b) => b - a)
            .map((rarity) => {
              const char = rarityGroups[rarity][0];
              return renderCharacterCard(char, `preview-${rarity}`, true);
            })}
        </div>
      </div>
    );
  };

  const renderInventoryStats = () => {
    const stats = inventory.reduce((acc, char) => {
      acc.rarity = acc.rarity || {};
      acc.type = acc.type || {};

      acc.rarity[char.rarity] = (acc.rarity[char.rarity] || 0) + 1;
      acc.type[char.type] = (acc.type[char.type] || 0) + 1;

      return acc;
    }, {});

    return (
      <div className="bg-[#1e1e1e] rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold mb-2 text-center">Seu Inventário</h3>
        <div className="flex justify-around mb-3">
          <div className="text-center">
            <div className="text-blue-400 text-xl font-bold">
              {stats.rarity?.[3] || 0}
            </div>
            <div className="text-xs text-gray-400">Comum</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 text-xl font-bold">
              {stats.rarity?.[4] || 0}
            </div>
            <div className="text-xs text-gray-400">Raro</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-xl font-bold">
              {stats.rarity?.[5] || 0}
            </div>
            <div className="text-xs text-gray-400">Lendário</div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-3 mt-2">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-green-400 text-xl font-bold">
                {stats.type?.developer || 0}
              </div>
              <div className="text-xs text-gray-400">Desenvolvedores</div>
            </div>
            <div className="text-center">
              <div className="text-pink-400 text-xl font-bold">
                {stats.type?.vtuber || 0}
              </div>
              <div className="text-xs text-gray-400">VTubers</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const collectCards = () => {
    setShowResults(false);
    setActiveTab("inventory");
  };

  const renderCurrencyDisplay = () => {
    return (
      <div className="bg-[#1e1e12] rounded-lg p-3 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-2">
              <i className="fas fa-coins text-white"></i>
            </div>
            <span className="font-bold text-yellow-400">{moedas}</span>
            <span className="text-xs text-gray-400 ml-2">Moedas</span>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center mr-2">
              <i className="fas fa-certificate text-white"></i>
            </div>
            <span className="font-bold text-purple-400">{pontos}</span>
            <span className="text-xs text-gray-400 ml-2">Pontos</span>
            {pontos >= 1000 && (
              <button
                onClick={buyDestino}
                className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-xs text-white px-2 py-1 rounded-md hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <i className="fas fa-exchange-alt mr-1"></i> Trocar
              </button>
            )}
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center mr-2">
              <i className="fas fa-compass text-white"></i>
            </div>
            <span className="font-bold text-amber-400">{destino}</span>
            <span className="text-xs text-gray-400 ml-2">Destino</span>
            <a
              href="/loja-destino"
              className="ml-2 bg-gradient-to-r from-amber-500 to-red-500 text-xs text-white px-2 py-1 rounded-md hover:from-amber-600 hover:to-red-600 transition-all"
            >
              <i className="fas fa-store mr-1"></i> Loja
            </a>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-400 flex justify-between">
          <span>1 Puxada: 100 Moedas</span>
          <span>10 Puxadas: 900 Moedas</span>
          <span>1 Destino: 1000 Pontos</span>
        </div>
      </div>
    );
  };

  const renderPityCounter = () => {
    return (
      <div className="bg-[#1e1e1e] rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center mr-2">
              <i className="fas fa-sync-alt text-white"></i>
            </div>
            <div>
              <span className="text-sm text-gray-400">
                Puxadas desde o último lendário:
              </span>
              <span className="ml-2 font-bold text-purple-400">
                {pullCounter}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            O contador reseta quando você obtém um item lendário
          </div>
        </div>
      </div>
    );
  };

  const getRarityGradient = (rarity) => {
    switch (rarity) {
      case 5:
        return "from-yellow-500 via-amber-400 to-yellow-600";
      case 4:
        return "from-purple-500 via-indigo-400 to-purple-600";
      case 3:
        return "from-blue-500 via-cyan-400 to-blue-600";
      default:
        return "from-gray-500 via-gray-400 to-gray-600";
    }
  };

  const buyDestino = () => {
    if (pontos >= 1000) {
      setPontos((prev) => prev - 1000);
      setDestino((prev) => prev + 1);
      setShowDestinoEarned(true);
      setTimeout(() => setShowDestinoEarned(false), 3000);
    } else {
      setShowNotEnoughCoins(true);
      setTimeout(() => setShowNotEnoughCoins(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            DevStream Gacha
          </h1>
          <a
            href="/loja"
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-md text-sm transition-all flex items-center group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center mr-2 group-hover:animate-pulse">
              <i className="fas fa-coins text-white text-lg"></i>
            </div>
            <span>Loja de Moedas</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="flex justify-center mb-6">
          <div className="bg-[#1a1a1a] rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab("gacha")}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === "gacha"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fas fa-dice mr-2"></i>
              Gacha
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === "inventory"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fas fa-folder-open mr-2"></i>
              Inventário
            </button>
          </div>
        </div>

        {activeTab === "gacha" && (
          <>
            {renderCurrencyDisplay()}
            {renderPityCounter()}
            {renderRarityPreview()}

            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative w-full max-w-md bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-xl overflow-hidden p-1">
                <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4">Girar Cartas</h2>

                  <div className="flex justify-center space-x-4 mb-4">
                    <button
                      onClick={() => doPull(1)}
                      disabled={isPulling}
                      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 hover:shadow-lg"
                    >
                      <span className="relative z-10">1x Carta</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-50 transition-opacity"></span>
                    </button>

                    <button
                      onClick={() => doPull(10)}
                      disabled={isPulling}
                      className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 hover:shadow-lg"
                    >
                      <span className="relative z-10">10x Cartas</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-50 transition-opacity"></span>
                    </button>
                  </div>

                  <p className="text-sm text-gray-400">
                    Lendário: 3% | Raro: 15% | Comum: 82%
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "inventory" && (
          <div className="animate-fadeIn">
            <div className="bg-[#1e1e1e] rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500">
                Seu Inventário de Cartas
              </h2>
            </div>

            {inventory.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-lg p-12 text-center">
                <i className="fas fa-box-open text-5xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-bold mb-2 text-gray-300">
                  Inventário Vazio
                </h3>
                <p className="text-gray-400 mb-6">
                  Você ainda não tem nenhuma carta. Volte para o Gacha e comece
                  a coletar!
                </p>
                <button
                  onClick={() => setActiveTab("gacha")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-md transition-all"
                >
                  <i className="fas fa-gem mr-2"></i> Ir para o Gacha
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-purple-400">
                      Filtrar Cartas
                    </h3>
                    <button
                      onClick={() => setActiveTab("gacha")}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      <i className="fas fa-arrow-left mr-1"></i> Voltar ao Gacha
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm text-gray-400 mb-2">
                      Por Raridade:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedRarity(null)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedRarity === null
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-[#2a2a2a] text-gray-300"
                        }`}
                      >
                        Todas
                      </button>
                      <button
                        onClick={() => setSelectedRarity(5)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedRarity === 5
                            ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-white"
                            : "bg-[#2a2a2a] text-yellow-400"
                        }`}
                      >
                        <i className="fas fa-star mr-1 text-yellow-400"></i>{" "}
                        Lendárias
                      </button>
                      <button
                        onClick={() => setSelectedRarity(4)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedRarity === 4
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                            : "bg-[#2a2a2a] text-purple-400"
                        }`}
                      >
                        <i className="fas fa-star mr-1 text-purple-400"></i>{" "}
                        Raras
                      </button>
                      <button
                        onClick={() => setSelectedRarity(3)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedRarity === 3
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                            : "bg-[#2a2a2a] text-blue-400"
                        }`}
                      >
                        <i className="fas fa-star mr-1 text-blue-400"></i>{" "}
                        Comuns
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Por Tipo:</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedType(null)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedType === null
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-[#2a2a2a] text-gray-300"
                        }`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setSelectedType("developer")}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedType === "developer"
                            ? "bg-gradient-to-r from-green-600 to-teal-600 text-white"
                            : "bg-[#2a2a2a] text-green-400"
                        }`}
                      >
                        <i className="fas fa-code mr-1 text-green-400"></i>{" "}
                        Desenvolvedores
                      </button>
                      <button
                        onClick={() => setSelectedType("vtuber")}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedType === "vtuber"
                            ? "bg-gradient-to-r from-pink-600 to-red-600 text-white"
                            : "bg-[#2a2a2a] text-pink-400"
                        }`}
                      >
                        <i className="fas fa-video mr-1 text-pink-400"></i>{" "}
                        VTubers
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {inventory
                    .filter(
                      (char) =>
                        (selectedRarity === null ||
                          char.rarity === selectedRarity) &&
                        (selectedType === null || char.type === selectedType)
                    )
                    .map((character, index) =>
                      renderCharacterCard(character, `inv-${index}`)
                    )}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {isPulling && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-gem text-white text-xl animate-pulse"></i>
              </div>
            </div>
            <p className="text-xl font-bold text-white animate-pulse">
              Girando cartas...
            </p>
          </div>
        </div>
      )}

      {showCardOpeningScreen && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-95">
          <div className="max-w-md w-full text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              {currentCardIndex + 1} de {cardsToOpen.length} Cartas
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Clique na carta para abri-la
            </p>
          </div>

          <div
            className={`relative cursor-pointer transform transition-all duration-500 ${
              isCardOpening ? "animate-cardOpen" : "animate-cardFloat"
            }`}
            onClick={() => !isCardOpening && openNextCard()}
          >
            <div
              className={`relative w-64 h-96 rounded-xl overflow-hidden transition-all duration-500 ${
                isCardOpening ? "animate-cardTear" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-indigo-900 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <i className="fas fa-question text-white text-5xl"></i>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-purple-500 rounded-xl z-30"></div>

              <div
                className={`absolute top-0 left-0 w-full h-full z-40 ${
                  isCardOpening ? "animate-tearLeft" : "opacity-0"
                }`}
              >
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-b from-purple-900 to-indigo-900 border-r-2 border-white"></div>
              </div>
              <div
                className={`absolute top-0 right-0 w-full h-full z-40 ${
                  isCardOpening ? "animate-tearRight" : "opacity-0"
                }`}
              >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-purple-900 to-indigo-900 border-l-2 border-white"></div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isCardOpening ? "opacity-100 z-50" : "opacity-0 -z-10"
                }`}
              >
                {cardsToOpen[currentCardIndex] &&
                  renderCharacterCard(
                    cardsToOpen[currentCardIndex],
                    `opening-${currentCardIndex}`
                  )}
              </div>
            </div>

            <div
              className={`absolute -inset-4 bg-gradient-to-r ${getRarityGradient(
                cardsToOpen[currentCardIndex]?.rarity
              )} opacity-0 rounded-xl blur-xl transition-opacity duration-1000 ${
                isCardOpening ? "opacity-70" : ""
              }`}
            ></div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={skipCardOpening}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-md text-sm transition-all"
            >
              Ver todas as cartas
            </button>
          </div>
        </div>
      )}

      {showAllCards && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-95 p-4">
          <div className="max-w-4xl w-full text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Suas Novas Cartas
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Você obteve{" "}
              {cardsToOpen.filter((card) => card.rarity === 5).length} cartas
              lendárias!
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-4xl w-full max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cardsToOpen.map((character, index) => (
                <div
                  key={`result-${index}`}
                  className="animate-cardReveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {renderCharacterCard(character, `result-${index}`)}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={collectAllCards}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-md text-sm font-bold transition-all"
            >
              Coletar Todas as Cartas
            </button>
            <button
              onClick={() => setShowAllCards(false)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 rounded-md text-sm transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {showDuplicateMessage && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-indigo-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-sync-alt mr-2 text-indigo-400"></i>
              <span>
                Cartas repetidas convertidas:
                {duplicateInfo.destino > 0 && (
                  <span className="ml-1 text-amber-400">
                    +{duplicateInfo.destino} Destino
                  </span>
                )}
                {duplicateInfo.destino > 0 && duplicateInfo.pontos > 0 && (
                  <span className="mx-1">e</span>
                )}
                {duplicateInfo.pontos > 0 && (
                  <span className="text-purple-400">
                    +{duplicateInfo.pontos} Pontos
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {showDestinoEarned && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-amber-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-compass mr-2 text-amber-400"></i>
              <span>Você obteve 1 Destino!</span>
            </div>
          </div>
        </div>
      )}

      {showCollectedMessage && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2 text-green-400"></i>
              <span>Cartas coletadas com sucesso!</span>
            </div>
          </div>
        </div>
      )}

      {showPityReset && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-purple-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-crown mr-2 text-yellow-400"></i>
              <span>Lendário obtido! Contador de puxadas resetado.</span>
            </div>
          </div>
        </div>
      )}

      {showNotEnoughCoins && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              <span>Moedas insuficientes!</span>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-3 shadow-lg z-40">
        <div className="container mx-auto flex justify-center items-center space-x-6">
          <a
            href="/nova-home"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs">Home</span>
          </a>
          <a
            href="/sistema-de-gacha"
            className="flex flex-col items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <i className="fas fa-dice text-xl mb-1"></i>
            <span className="text-xs">Gacha</span>
          </a>
          <a
            href="/editor"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
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
        </div>
      </footer>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes cardReveal {
          0% { transform: scale(0.5) rotateY(180deg); opacity: 0; }
          50% { transform: scale(1.1) rotateY(0deg); opacity: 1; }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(5px) rotate(1deg); }
        }
        
        @keyframes cardOpen {
          0% { transform: scale(1); }
          10% { transform: scale(1.05); }
          20% { transform: scale(0.95); }
          30% { transform: scale(1.02); }
          40% { transform: scale(0.98); }
          50% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        
        @keyframes tearLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        
        @keyframes tearRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes cardTear {
          0% { transform: scale(1); }
          5% { transform: scale(1.05); }
          10% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        
        .animate-progress {
          animation: progress 3s linear forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-in-out;
        }
        
        .animate-cardReveal {
          animation: cardReveal 0.8s ease-out forwards;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .animate-slideDown {
          animation: slideDown 3s ease-in-out forwards;
        }
        
        .animate-cardFloat {
          animation: cardFloat 3s ease-in-out infinite;
        }
        
        .animate-cardOpen {
          animation: cardOpen 1s ease-in-out forwards;
        }
        
        .animate-tearLeft {
          animation: tearLeft 0.8s ease-in-out forwards;
        }
        
        .animate-tearRight {
          animation: tearRight 0.8s ease-in-out forwards;
        }
        
        .animate-cardTear {
          animation: cardTear 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;