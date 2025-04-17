"use client";
import React from "react";

function MainComponent() {
  const [userProfile, setUserProfile] = React.useState({
    name: "",
    avatar: 1,
    coins: 0,
  });
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);
  const profileMenuRef = React.useRef(null);
  const profileButtonRef = React.useRef(null);
  const { data: user, loading: userLoading } = useUser();

  React.useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/getUserProfile?userId=${user.id}`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar perfil: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.profile) {
          setUserProfile({
            name: user.name || "Desenvolvedor",
            avatar: data.profile.avatar_url
              ? parseInt(data.profile.avatar_url)
              : 1,
            coins: data.profile.coins || 0,
          });
        } else {
          const initResponse = await fetch("/api/initUserProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bio: "",
              avatar_url: "1",
            }),
          });

          if (!initResponse.ok) {
            throw new Error(
              `Erro ao inicializar perfil: ${initResponse.status}`
            );
          }

          setUserProfile({
            name: user.name || "Desenvolvedor",
            avatar: 1,
            coins: 1000,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError(
          "Não foi possível carregar seu perfil. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      loadUserProfile();
    }

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user, userLoading]);

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

  const renderAvatar = (avatarId) => {
    const avatar = avatars.find((a) => a.id === avatarId) || avatars[0];
    return (
      <div
        className={`bg-gradient-to-r ${avatar.color} w-full h-full rounded-full flex items-center justify-center`}
      >
        <i className={`fas fa-${avatar.icon} text-white`}></i>
      </div>
    );
  };

  const openFullProfileMenu = () => {
    setShowProfileOptions(false);
    setShowProfileMenu(true);
  };

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/account/signin",
        redirect: true,
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const goToFullProfile = () => {
    window.location.href = "/perfil-completo";
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center flex-col">
        <div className="text-red-500 mb-4">
          <i className="fas fa-exclamation-triangle text-3xl"></i>
        </div>
        <p className="text-white text-xl mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/account/signin?callbackUrl=/nova-home";
    return null;
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
            <div className="hidden md:flex items-center bg-[#2a2a2a] rounded-full px-4 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-2">
                <i className="fas fa-coins text-white text-xs"></i>
              </div>
              <span className="font-bold text-yellow-400">
                {userProfile.coins}
              </span>
            </div>

            <div className="relative">
              <div
                ref={profileButtonRef}
                className="flex items-center bg-[#2a2a2a] rounded-full p-1 pr-4 hover:bg-[#333] cursor-pointer"
                onClick={() => {
                  setShowProfileOptions(!showProfileOptions);
                  setShowProfileMenu(false);
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                    getCurrentAvatar().color
                  } flex items-center justify-center mr-2`}
                >
                  <i
                    className={`fas fa-${
                      getCurrentAvatar().icon
                    } text-white text-xs`}
                  ></i>
                </div>
                <span className="text-sm hidden md:inline">
                  {userProfile.name}
                </span>
              </div>

              {showProfileOptions && (
                <div className="absolute top-12 right-0 bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-xl shadow-xl border border-purple-500/30 p-2 min-w-[150px] z-50 animate-fadeIn">
                  <div
                    className="p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors flex items-center"
                    onClick={openFullProfileMenu}
                  >
                    <i className="fas fa-user-circle mr-2 text-purple-400"></i>
                    <span>Ver perfil</span>
                  </div>
                  <div
                    className="p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors flex items-center"
                    onClick={goToFullProfile}
                  >
                    <i className="fas fa-id-card mr-2 text-green-400"></i>
                    <span>Perfil completo</span>
                  </div>
                  <div
                    className="p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer transition-colors flex items-center"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2 text-red-400"></i>
                    <span>Sair</span>
                  </div>
                </div>
              )}

              {showProfileMenu && (
                <div
                  ref={profileMenuRef}
                  className="absolute top-12 right-0 bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-xl shadow-xl border border-purple-500/30 p-0 min-w-[300px] z-50 animate-fadeIn overflow-hidden"
                >
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
                    >
                      <i className="fas fa-arrow-left"></i>
                    </button>

                    <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
                      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1a1a1a] shadow-xl">
                          {renderAvatar(userProfile.avatar)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-20 text-center px-4 pb-4">
                      <div className="font-bold text-xl">
                        {userProfile.name}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        @{userProfile.name.toLowerCase().replace(/\s+/g, "")}
                      </div>

                      <div className="mt-3 relative group">
                        <p className="text-sm text-gray-300 bg-[#2a2a2a] p-3 rounded-lg">
                          Clique em "Perfil completo" para editar sua biografia
                          e ver mais detalhes.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#333] mt-2"></div>

                    <div className="p-4 space-y-2">
                      <div
                        className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                        onClick={goToFullProfile}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
                          <i className="fas fa-id-card text-white"></i>
                        </div>
                        <span>Ver Perfil Completo</span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                        onClick={() =>
                          (window.location.href = "/loja-de-moedas")
                        }
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 flex items-center justify-center">
                          <i className="fas fa-store text-white"></i>
                        </div>
                        <span>Loja de Moedas</span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                        onClick={() =>
                          (window.location.href = "/roupas-vtuber")
                        }
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 flex items-center justify-center">
                          <i className="fas fa-tshirt text-white"></i>
                        </div>
                        <span>Roupas VTuber</span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                        onClick={() =>
                          (window.location.href = "/editor-de-personagem")
                        }
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-center">
                          <i className="fas fa-user-edit text-white"></i>
                        </div>
                        <span>Editor de Personagem</span>
                      </div>
                      <div className="border-t border-[#333] my-2"></div>
                      <div
                        className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                        onClick={handleLogout}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                          <i className="fas fa-sign-out-alt text-white"></i>
                        </div>
                        <span>Sair do Aplicativo</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6 pb-24">
        {showWelcome && (
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-6 mb-8 animate-fadeIn shadow-lg border border-purple-800">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#ffffff20] flex items-center justify-center mr-4">
                <i className="fas fa-hand-sparkles text-white text-xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Bem-vindo, {userProfile.name}!
                </h2>
                <p className="text-gray-300">
                  Que bom ver você no DevStream hoje.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-5 mb-8 shadow-lg border border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-4">
                <i className="fas fa-coins text-white text-lg"></i>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Suas moedas</p>
                <p className="text-2xl font-bold text-white">
                  {userProfile.coins}
                </p>
              </div>
            </div>
            <a
              href="/loja"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg flex items-center"
            >
              <i className="fas fa-plus mr-2"></i>
              <span>Obter mais</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-purple-500 transition-all shadow-lg group">
            <div className="h-40 bg-gradient-to-r from-purple-900 to-pink-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/gacha-pattern.png')] bg-repeat opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-dice text-white text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500"></i>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1a1a] to-transparent h-20"></div>
            </div>
            <div className="p-6 relative -mt-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-3 shadow-lg">
                  <i className="fas fa-dice text-white text-xl"></i>
                </div>
                <h2 className="text-xl font-bold">Sistema de Gacha</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Colecione personagens desenvolvedores e VTubers através do nosso
                sistema de gacha.
              </p>
              <a
                href="/sistema-de-gacha"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Jogar Gacha
              </a>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-blue-500 transition-all shadow-lg group">
            <div className="h-40 bg-gradient-to-r from-blue-900 to-cyan-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/editor-pattern.png')] bg-repeat opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-user-edit text-white text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500"></i>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1a1a] to-transparent h-20"></div>
            </div>
            <div className="p-6 relative -mt-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                  <i className="fas fa-user-edit text-white text-xl"></i>
                </div>
                <h2 className="text-xl font-bold">Editor de VTuber</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Crie e personalize seu próprio VTuber com nosso editor avançado.
              </p>
              <a
                href="/editor-de-personagem"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Criar VTuber
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-green-500 transition-all shadow-lg group">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                  <i className="fas fa-store text-white text-xl"></i>
                </div>
                <h2 className="text-xl font-bold">Loja de Moedas</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Adquira moedas para usar no sistema de gacha e comprar itens
                exclusivos.
              </p>
              <a
                href="/loja-de-moedas"
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Visitar Loja
              </a>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-amber-500 transition-all shadow-lg group">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-red-600 flex items-center justify-center mr-3 shadow-lg">
                  <i className="fas fa-tshirt text-white text-xl"></i>
                </div>
                <h2 className="text-xl font-bold">Roupas VTuber</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Explore e adquira roupas exclusivas para personalizar seu
                VTuber.
              </p>
              <a
                href="/roupas-vtuber"
                className="inline-block bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Ver Roupas
              </a>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-indigo-500 transition-all shadow-lg group">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center mr-3 shadow-lg">
                  <i className="fas fa-plus text-white text-xl"></i>
                </div>
                <h2 className="text-xl font-bold">Novidades</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Fique por dentro das últimas atualizações e novidades do
                DevStream.
              </p>
              <a
                href="/new-page"
                className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Ver Novidades
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Sua Coleção</h2>
            <a
              href="/gacha"
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
            >
              <span>Ver tudo</span>
              <i className="fas fa-chevron-right ml-1 text-xs"></i>
            </a>
          </div>

          <div className="bg-[#222] rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-dice text-purple-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold mb-2">Comece sua coleção!</h3>
            <p className="text-gray-400 mb-4">
              Acesse o Sistema de Gacha para começar a colecionar personagens ou
              o Editor para criar seu VTuber personalizado!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/sistema-de-gacha"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Jogar Gacha
              </a>
              <a
                href="/editor-de-personagem"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Criar VTuber
              </a>
            </div>
          </div>
        </div>
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
            href="/editor-de-personagem"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-user-edit text-xl mb-1"></i>
            <span className="text-xs">Editor</span>
          </a>
          <a
            href="/loja-de-moedas"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-store text-xl mb-1"></i>
            <span className="text-xs">Loja</span>
          </a>
          <a
            href="/perfil-completo"
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
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;