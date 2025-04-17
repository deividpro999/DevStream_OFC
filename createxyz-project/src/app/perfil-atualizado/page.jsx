"use client";
import React from "react";

function MainComponent() {
  const [userProfile, setUserProfile] = React.useState({
    name: "Desenvolvedor",
    avatar: 1,
    coins: 100,
    followers: 0,
    following: 0,
    avatarUrl: null,
  });
  const [loading, setLoading] = React.useState(true);
  const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
  const optionsMenuRef = React.useRef(null);
  const avatarRef = React.useRef(null);
  const { data: user } = useUser();

  React.useEffect(() => {
    const loadUserProfile = () => {
      try {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setUserProfile((prev) => ({
            ...prev,
            name: profile.name || "Desenvolvedor",
            avatar: profile.avatar || 1,
            coins: profile.coins || 100,
            avatarUrl: profile.avatarUrl || null,
          }));
        }

        const savedCoins = localStorage.getItem("moedas");
        if (savedCoins) {
          setUserProfile((prev) => ({
            ...prev,
            coins: parseInt(savedCoins),
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowOptionsMenu(false);
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
    { id: 6, icon: "user-md", color: "from-pink-600 to-pink-800" },
  ];

  const getCurrentAvatar = () => {
    return (
      avatars.find((avatar) => avatar.id === userProfile.avatar) || avatars[0]
    );
  };

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
                {userProfile.coins}
              </span>
            </div>

            <a
              href="/nova-home"
              className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-md transition-all flex items-center"
            >
              <i className="fas fa-home mr-2"></i>
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6 pb-24">
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <button
                ref={avatarRef}
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1 cursor-pointer hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                {userProfile.avatarUrl ? (
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
                      } text-white text-4xl`}
                    ></i>
                  </div>
                )}
              </button>

              {showOptionsMenu && (
                <div
                  ref={optionsMenuRef}
                  className="absolute left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-50 animate-fadeIn"
                >
                  <div className="py-2">
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
                    {user ? (
                      <a
                        href="/account/logout"
                        className="block px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] hover:text-red-300"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i> Sair
                      </a>
                    ) : (
                      <a
                        href="/account/signin"
                        className="block px-4 py-2 text-sm text-blue-400 hover:bg-[#2a2a2a] hover:text-blue-300"
                      >
                        <i className="fas fa-sign-in-alt mr-2"></i> Entrar
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{userProfile.name}</h2>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                  <i className="fas fa-users text-purple-400 mr-2"></i>
                  <div>
                    <p className="text-xs text-gray-400">Seguidores</p>
                    <p className="font-bold">{userProfile.followers || 0}</p>
                  </div>
                </div>

                <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                  <i className="fas fa-user-friends text-blue-400 mr-2"></i>
                  <div>
                    <p className="text-xs text-gray-400">Seguindo</p>
                    <p className="font-bold">{userProfile.following || 0}</p>
                  </div>
                </div>

                <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                  <i className="fas fa-coins text-yellow-400 mr-2"></i>
                  <div>
                    <p className="text-xs text-gray-400">Moedas</p>
                    <p className="font-bold">{userProfile.coins}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-dice text-purple-400 mr-2"></i>
              Meus Personagens
            </h3>

            <div className="bg-[#222] rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-dice text-purple-400 text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-2">Comece sua coleção!</h4>
              <p className="text-gray-400 mb-4">
                Acesse o Sistema de Gacha para começar a colecionar personagens!
              </p>
              <a
                href="/sistema-de-gacha"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Jogar Gacha
              </a>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-user-edit text-blue-400 mr-2"></i>
              Meus VTubers
            </h3>

            <div className="bg-[#222] rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-user-edit text-blue-400 text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-2">Crie seu VTuber!</h4>
              <p className="text-gray-400 mb-4">
                Use nosso editor para criar e personalizar seu próprio VTuber!
              </p>
              <a
                href="/editor"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Criar VTuber
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <i className="fas fa-trophy text-yellow-400 mr-2"></i>
            Conquistas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#222] rounded-lg p-4 flex items-center opacity-50">
              <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center mr-3">
                <i className="fas fa-user-plus text-gray-400 text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold">Primeiro Login</h4>
                <p className="text-xs text-gray-400">
                  Faça login pela primeira vez
                </p>
              </div>
            </div>

            <div className="bg-[#222] rounded-lg p-4 flex items-center opacity-50">
              <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center mr-3">
                <i className="fas fa-dice text-gray-400 text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold">Colecionador</h4>
                <p className="text-xs text-gray-400">
                  Obtenha 5 personagens no gacha
                </p>
              </div>
            </div>

            <div className="bg-[#222] rounded-lg p-4 flex items-center opacity-50">
              <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center mr-3">
                <i className="fas fa-user-edit text-gray-400 text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold">Designer</h4>
                <p className="text-xs text-gray-400">
                  Crie seu primeiro VTuber
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
            className="flex flex-col items-center text-purple-400 hover:text-purple-300 transition-colors"
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