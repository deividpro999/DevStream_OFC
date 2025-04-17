"use client";
import React from "react";

function MainComponent() {
  const [userProfile, setUserProfile] = React.useState(null);
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);
  const [showFollowers, setShowFollowers] = React.useState(false);
  const [showFollowing, setShowFollowing] = React.useState(false);
  const [coins, setCoins] = React.useState(0);
  const [bio, setBio] = React.useState("");
  const [isEditingBio, setIsEditingBio] = React.useState(false);
  const [showInitialSetup, setShowInitialSetup] = React.useState(false);
  const [newUserName, setNewUserName] = React.useState("");
  const [selectedAvatar, setSelectedAvatar] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(true);

  const renderAvatar = (avatarId) => {
    const avatarStyles = {
      1: "bg-gradient-to-br from-blue-500 to-purple-600",
      2: "bg-gradient-to-br from-green-500 to-teal-600",
      3: "bg-gradient-to-br from-red-500 to-pink-600",
      4: "bg-gradient-to-br from-yellow-500 to-orange-600",
      5: "bg-gradient-to-br from-indigo-500 to-blue-600",
    };

    return (
      <div
        className={`w-full h-full ${
          avatarStyles[avatarId] || avatarStyles[1]
        } flex items-center justify-center`}
      >
        <i className="fas fa-user text-white text-xl"></i>
      </div>
    );
  };

  const openFullProfileMenu = () => {
    setShowProfileMenu(true);
    setShowProfileOptions(false);
  };

  const goToFullProfile = () => {
    window.location.href = "/perfil-completo";
  };

  const goToShop = () => {
    window.location.href = "/loja-de-moedas";
  };

  const goToOutfits = () => {
    window.location.href = "/roupas-vtuber";
  };

  const goToCharacterEditor = () => {
    window.location.href = "/editor-de-personagem";
  };

  const handleLogout = () => {
    try {
      window.location.href = "/nova-home-sem-auth";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    setShowFollowing(false);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };

  const saveBio = async () => {
    try {
      setIsEditingBio(false);
      // Implementação para salvar a bio no servidor
    } catch (error) {
      console.error("Erro ao salvar biografia:", error);
    }
  };

  const renderInitialSetupForm = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] max-w-md w-full">
          <h3 className="text-xl font-bold mb-4 text-center">
            Configuração inicial
          </h3>
          <p className="text-gray-400 mb-6 text-center">
            Vamos configurar seu perfil para começar
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nome de usuário
              </label>
              <input
                type="text"
                name="username"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Seu nome de usuário"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Escolha um avatar
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((avatar) => (
                  <div
                    key={avatar}
                    className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer ${
                      selectedAvatar === avatar
                        ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1a1a1a]"
                        : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    {renderAvatar(avatar)}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={saveInitialSetup}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg mt-4"
            >
              Salvar e continuar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const saveInitialSetup = async () => {
    try {
      if (!newUserName.trim()) {
        alert("Por favor, insira um nome de usuário");
        return;
      }

      const response = await fetch("/api/initUserProfileNoAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUserName,
          avatar: selectedAvatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar perfil");
      }

      setShowInitialSetup(false);
      window.location.href = "/nova-home";
    } catch (error) {
      console.error("Erro ao configurar perfil:", error);
    }
  };

  React.useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = "/nova-home";
    }, 3000);

    const loadUserProfile = async () => {
      try {
        setUserLoading(true);

        const mockUser = {
          id: "user123",
          name: "Desenvolvedor",
        };
        setUser(mockUser);

        const response = await fetch(`/api/getUserProfileNoAuth`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar perfil: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.profile) {
          setUserProfile({
            name: data.profile.name || "Desenvolvedor",
            avatar: data.profile.avatar_url
              ? parseInt(data.profile.avatar_url)
              : 1,
            coins: data.profile.coins || 0,
          });
          setBio(data.profile.bio || "");
          setCoins(data.profile.coins || 0);
        } else {
          setShowInitialSetup(true);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError(
          "Não foi possível carregar seu perfil. Tente novamente mais tarde."
        );
      } finally {
        setUserLoading(false);
        setLoading(false);
      }
    };

    loadUserProfile();

    return () => clearTimeout(redirectTimer);
  }, []);

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

          {userProfile && (
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <i className="fas fa-coins text-yellow-400 mr-1"></i>
                <span className="font-medium">{coins}</span>
              </div>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer transform hover:scale-110 transition-transform border-2 border-purple-500 shadow-lg shadow-purple-500/30"
                  onClick={() => {
                    setShowProfileOptions(!showProfileOptions);
                    setShowProfileMenu(false);
                  }}
                >
                  {renderAvatar(userProfile.avatar)}
                </div>

                {showProfileOptions && (
                  <div className="absolute top-12 right-0 bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-xl shadow-xl border border-purple-500/30 p-2 min-w-[150px] z-20 animate-fadeIn">
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
                  <div className="absolute top-12 right-0 bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-xl shadow-xl border border-purple-500/30 p-0 min-w-[300px] z-20 animate-fadeIn overflow-hidden">
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

                        {isEditingBio ? (
                          <div className="mt-3">
                            <textarea
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              name="bio"
                              className="w-full bg-[#333] border border-[#444] rounded-lg p-2 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Escreva algo sobre você..."
                              rows={3}
                              maxLength={150}
                            />
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-gray-400">
                                {bio.length}/150
                              </span>
                              <div>
                                <button
                                  onClick={() => setIsEditingBio(false)}
                                  className="text-xs bg-[#333] hover:bg-[#444] px-3 py-1 rounded-lg mr-2"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={saveBio}
                                  className="text-xs bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg"
                                >
                                  Salvar
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 relative group">
                            <p className="text-sm text-gray-300 bg-[#2a2a2a] p-3 rounded-lg">
                              {bio || "Adicione uma biografia..."}
                            </p>
                            <button
                              onClick={() => setIsEditingBio(true)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 p-1 rounded-full"
                            >
                              <i className="fas fa-pencil-alt text-xs"></i>
                            </button>
                          </div>
                        )}

                        <div className="flex justify-center space-x-8 mt-4">
                          <div
                            className="text-center cursor-pointer hover:text-purple-400 transition-colors"
                            onClick={toggleFollowers}
                          >
                            <div className="font-bold">{followers.length}</div>
                            <div className="text-xs text-gray-400">
                              Seguidores
                            </div>
                          </div>
                          <div
                            className="text-center cursor-pointer hover:text-purple-400 transition-colors"
                            onClick={toggleFollowing}
                          >
                            <div className="font-bold">{following.length}</div>
                            <div className="text-xs text-gray-400">
                              Seguindo
                            </div>
                          </div>
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
                          onClick={goToShop}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 flex items-center justify-center">
                            <i className="fas fa-store text-white"></i>
                          </div>
                          <span>Loja de Moedas</span>
                        </div>
                        <div
                          className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                          onClick={goToOutfits}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 flex items-center justify-center">
                            <i className="fas fa-tshirt text-white"></i>
                          </div>
                          <span>Roupas VTuber</span>
                        </div>
                        <div
                          className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-lg cursor-pointer group transition-colors"
                          onClick={goToCharacterEditor}
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
              <div className="ml-2 text-sm">
                <div className="font-medium">{userProfile.name}</div>
              </div>
            </div>
          )}
        </div>
      </header>

      <nav className="sticky top-0 z-20 bg-[#1a1a1a] shadow-md border-b border-[#333]">
        <div className="container mx-auto">
          <div className="flex justify-between overflow-x-auto">
            <div className="flex space-x-1">
              <a
                href="/nova-home"
                className="py-3 px-4 text-center hover:bg-[#2a2a2a] transition-colors flex flex-col items-center"
              >
                <i className="fas fa-home text-lg mb-1"></i>
                <span className="text-xs">Home</span>
              </a>
              <a
                href="/perfil"
                className="py-3 px-4 text-center bg-[#2a2a2a] text-purple-400 border-b-2 border-purple-500 transition-colors flex flex-col items-center"
              >
                <i className="fas fa-user text-lg mb-1"></i>
                <span className="text-xs">Perfil</span>
              </a>
              <a
                href="/sistema-de-gacha"
                className="py-3 px-4 text-center hover:bg-[#2a2a2a] transition-colors flex flex-col items-center"
              >
                <i className="fas fa-dice text-lg mb-1"></i>
                <span className="text-xs">Gacha</span>
              </a>
              <a
                href="/loja-de-moedas"
                className="py-3 px-4 text-center hover:bg-[#2a2a2a] transition-colors flex flex-col items-center"
              >
                <i className="fas fa-store text-lg mb-1"></i>
                <span className="text-xs">Loja</span>
              </a>
              <a
                href="/roupas-vtuber"
                className="py-3 px-4 text-center hover:bg-[#2a2a2a] transition-colors flex flex-col items-center"
              >
                <i className="fas fa-tshirt text-lg mb-1"></i>
                <span className="text-xs">Roupas</span>
              </a>
              <a
                href="/editor-de-personagem"
                className="py-3 px-4 text-center hover:bg-[#2a2a2a] transition-colors flex flex-col items-center"
              >
                <i className="fas fa-user-edit text-lg mb-1"></i>
                <span className="text-xs">Editor</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {showFollowers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Seguidores</h3>
              <button
                onClick={() => setShowFollowers(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {followers.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                Nenhum seguidor ainda
              </p>
            ) : (
              <div className="space-y-3">
                {followers.map((follower) => (
                  <div
                    key={follower.id}
                    className="flex items-center p-2 hover:bg-[#2a2a2a] rounded"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {renderAvatar(follower.avatar || 1)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{follower.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Seguindo</h3>
              <button
                onClick={() => setShowFollowing(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {following.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                Não está seguindo ninguém ainda
              </p>
            ) : (
              <div className="space-y-3">
                {following.map((follow) => (
                  <div
                    key={follow.id}
                    className="flex items-center p-2 hover:bg-[#2a2a2a] rounded"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {renderAvatar(follow.avatar || 1)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{follow.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] animate-fadeIn">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              Redirecionando...
            </h2>
            <p className="text-gray-400 mt-2">
              Você será redirecionado para a página inicial
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>

      {showInitialSetup && renderInitialSetupForm()}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
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