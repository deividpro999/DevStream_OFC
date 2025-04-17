"use client";
import React from "react";

function MainComponent() {
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef(null);
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    const checkUserProfile = () => {
      try {
        const savedProfile = localStorage.getItem("userProfile");
        if (!savedProfile) {
          window.location.href = "/configuracao-inicial";
          return;
        }

        const profile = JSON.parse(savedProfile);
        if (!profile || !profile.name) {
          window.location.href = "/configuracao-inicial";
          return;
        }

        const savedCoins = localStorage.getItem("moedas");
        if (savedCoins) {
          profile.coins = parseInt(savedCoins);
        }

        setUserProfile(profile);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        window.location.href = "/configuracao-inicial";
      } finally {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const avatars = [
    { id: 1, icon: "user-ninja", color: "from-purple-600 to-purple-800" },
    { id: 2, icon: "user-astronaut", color: "from-blue-600 to-blue-800" },
    { id: 3, icon: "user-graduate", color: "from-green-600 to-green-800" },
    { id: 4, icon: "user-secret", color: "from-red-600 to-red-800" },
    { id: 5, icon: "user-tie", color: "from-yellow-600 to-yellow-800" },
  ];

  const getCurrentAvatar = () => {
    if (!userProfile) return avatars[0];
    return (
      avatars.find((avatar) => avatar.id === userProfile.avatar) || avatars[0]
    );
  };

  const featureCards = [
    {
      id: 1,
      title: "Sistema de Gacha",
      description:
        "Colecione personagens únicos através do nosso sistema de sorteio",
      icon: "dice",
      color: "from-purple-600 to-indigo-600",
      hoverColor: "from-purple-500 to-indigo-500",
      link: "/sistema-de-gacha",
      bgImage: "https://source.unsplash.com/random/300x200/?anime,game",
    },
    {
      id: 2,
      title: "Editor de VTuber",
      description:
        "Crie e personalize seu próprio avatar virtual com nosso editor",
      icon: "user-edit",
      color: "from-blue-600 to-cyan-600",
      hoverColor: "from-blue-500 to-cyan-500",
      link: "/editor",
      bgImage: "https://source.unsplash.com/random/300x200/?avatar,design",
    },
    {
      id: 3,
      title: "Loja de Moedas",
      description: "Adquira moedas para usar em nosso sistema de gacha e loja",
      icon: "coins",
      color: "from-yellow-600 to-amber-600",
      hoverColor: "from-yellow-500 to-amber-500",
      link: "/loja",
      bgImage: "https://source.unsplash.com/random/300x200/?coins,gold",
    },
    {
      id: 4,
      title: "Roupas VTuber",
      description: "Vista seu VTuber com roupas exclusivas e acessórios",
      icon: "tshirt",
      color: "from-pink-600 to-rose-600",
      hoverColor: "from-pink-500 to-rose-500",
      link: "/roupas-vtuber",
      bgImage: "https://source.unsplash.com/random/300x200/?fashion,clothes",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <header className="relative z-10 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            DevStream
          </h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-[#2a2a2a] rounded-full px-4 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-2">
                <i className="fas fa-coins text-white text-xs"></i>
              </div>
              <span className="font-bold text-yellow-400">
                {userProfile?.coins || 0}
              </span>
            </div>

            <div className="relative">
              <button
                ref={avatarRef}
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 cursor-pointer hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                {userProfile?.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Avatar do usuário"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-r ${
                      getCurrentAvatar().color
                    } flex items-center justify-center`}
                  >
                    <i
                      className={`fas fa-${
                        getCurrentAvatar().icon
                      } text-white text-sm`}
                    ></i>
                  </div>
                )}
              </button>

              {showMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-50 animate-fadeIn"
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-[#333]">
                      <p className="font-bold truncate">{userProfile?.name}</p>
                      <p className="text-xs text-gray-400 truncate">
                        Desenvolvedor
                      </p>
                    </div>
                    <a
                      href="/perfil-atualizado"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-user mr-2"></i> Meu Perfil
                    </a>
                    <a
                      href="/editor"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-user-edit mr-2"></i> Editor de VTuber
                    </a>
                    <a
                      href="/loja"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-coins mr-2"></i> Comprar Moedas
                    </a>
                    <a
                      href="/sistema-de-gacha"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-dice mr-2"></i> Sistema de Gacha
                    </a>
                    <a
                      href="/exportar-dados"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-database mr-2"></i> Exportar Dados
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6 pb-24">
        <section className="mb-10">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                {userProfile?.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Avatar do usuário"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-r ${
                      getCurrentAvatar().color
                    } flex items-center justify-center`}
                  >
                    <i
                      className={`fas fa-${
                        getCurrentAvatar().icon
                      } text-white text-3xl`}
                    ></i>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">
                  Olá, {userProfile?.name}!
                </h2>
                <p className="text-gray-400 mb-4">
                  Bem-vindo ao DevStream, seu portal para criação e coleção de
                  VTubers!
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                    <i className="fas fa-coins text-yellow-400 mr-2"></i>
                    <div>
                      <p className="text-xs text-gray-400">Moedas</p>
                      <p className="font-bold">{userProfile?.coins || 0}</p>
                    </div>
                  </div>

                  <a
                    href="/loja"
                    className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 rounded-lg px-4 py-2 flex items-center transition-colors"
                  >
                    <i className="fas fa-plus-circle mr-2"></i>
                    <span>Comprar Moedas</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Funcionalidades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] shadow-lg hover:border-purple-500 transition-all hover:transform hover:scale-105"
              >
                <div className="h-40 relative">
                  <img
                    src={card.bgImage}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold">{card.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4">
                    {card.description}
                  </p>
                  <div
                    className={`bg-gradient-to-r ${card.color} hover:${card.hoverColor} text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors`}
                  >
                    <i className={`fas fa-${card.icon} mr-2`}></i>
                    <span>Acessar</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Novidades
          </h2>

          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3">
                <i className="fas fa-bullhorn text-white"></i>
              </div>
              <h3 className="text-xl font-bold">Últimas Atualizações</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-[#222] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">Exportação de Dados</h4>
                  <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
                    Novo
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Agora você pode exportar seus dados para backup ou
                  transferência. Mantenha seus personagens e itens seguros!
                </p>
                <a
                  href="/exportar-dados"
                  className="text-green-400 text-sm mt-2 inline-block hover:text-green-300"
                >
                  Exportar agora <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>

              <div className="bg-[#222] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">Novo Sistema de Gacha</h4>
                  <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full">
                    Novo
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Experimente nosso novo sistema de gacha com personagens
                  exclusivos e chances de raridades especiais!
                </p>
                <a
                  href="/sistema-de-gacha"
                  className="text-purple-400 text-sm mt-2 inline-block hover:text-purple-300"
                >
                  Saiba mais <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>

              <div className="bg-[#222] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">Editor de VTuber Atualizado</h4>
                  <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
                    Atualizado
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Nosso editor agora conta com mais opções de personalização e
                  novos acessórios!
                </p>
                <a
                  href="/editor"
                  className="text-blue-400 text-sm mt-2 inline-block hover:text-blue-300"
                >
                  Experimentar <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-3 shadow-lg z-40">
        <div className="container mx-auto flex justify-center items-center space-x-6">
          <a
            href="/nova-home"
            className="flex flex-col items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs">Home</span>
          </a>
          <a
            href="/sistema-de-gacha"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
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
            href="/perfil-atualizado"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">Perfil</span>
          </a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;