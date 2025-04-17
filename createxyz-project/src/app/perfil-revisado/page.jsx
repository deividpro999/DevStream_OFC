"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [userProfile, setUserProfile] = React.useState({
    name: "Desenvolvedor",
    avatar: 1,
    avatarUrl: null,
    coins: 100,
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editName, setEditName] = React.useState("");
  const [selectedAvatar, setSelectedAvatar] = React.useState(1);
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const optionsMenuRef = React.useRef(null);
  const avatarButtonRef = React.useRef(null);
  const { data: user, loading: userLoading } = useUser();

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
            avatarUrl: profile.avatarUrl || null,
            coins: profile.coins || 100,
          }));
          setEditName(profile.name || "Desenvolvedor");
          setSelectedAvatar(profile.avatar || 1);
          setAvatarUrl(profile.avatarUrl || "");
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

    const handleClickOutside = (event) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) {
        setError(`Erro ao fazer upload da imagem: ${uploadError}`);
        return;
      }
      setAvatarUrl(url);
    } catch (err) {
      setError("Erro ao fazer upload da imagem. Tente novamente.");
      console.error(err);
    }
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setError("Por favor, escolha um nome de usuário");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedProfile = {
        ...userProfile,
        name: editName.trim(),
        avatar: selectedAvatar,
        avatarUrl: avatarUrl || userProfile.avatarUrl,
      };

      // Salvar no localStorage
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

      // Atualizar o estado
      setUserProfile(updatedProfile);
      setShowEditModal(false);
    } catch (err) {
      setError("Erro ao salvar seu perfil. Tente novamente.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="hidden md:flex items-center bg-[#2a2a2a] rounded-full px-4 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-2">
                <i className="fas fa-coins text-white text-xs"></i>
              </div>
              <span className="font-bold text-yellow-400">
                {userProfile.coins}
              </span>
            </div>

            <div className="relative">
              <button
                ref={avatarButtonRef}
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="flex items-center bg-[#2a2a2a] rounded-full p-1 pr-4 hover:bg-[#333]"
              >
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Avatar personalizado"
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
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
                )}
                <span className="text-sm">{userProfile.name}</span>
                <i className="fas fa-chevron-down text-xs ml-2 text-gray-400"></i>
              </button>

              {showOptionsMenu && (
                <div
                  ref={optionsMenuRef}
                  className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-50"
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowEditModal(true);
                        setShowOptionsMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-edit mr-2"></i> Editar Perfil
                    </button>
                    <a
                      href="/nova-home"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2a2a] hover:text-white"
                    >
                      <i className="fas fa-home mr-2"></i> Página Inicial
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
                    <div className="border-t border-[#333] my-1"></div>
                    <a
                      href="/account/logout"
                      className="block px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] hover:text-red-300"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Sair
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6 pb-24">
        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] shadow-lg mb-6">
          <div className="h-32 bg-gradient-to-r from-purple-900 to-blue-900 relative">
            <div className="absolute inset-0 bg-[url('/profile-pattern.png')] bg-repeat opacity-10"></div>
          </div>

          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-4">
              <div className="relative group">
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Avatar personalizado"
                    className="w-32 h-32 rounded-full border-4 border-[#1a1a1a] object-cover"
                  />
                ) : (
                  <div
                    className={`w-32 h-32 rounded-full bg-gradient-to-r ${
                      getCurrentAvatar().color
                    } flex items-center justify-center border-4 border-[#1a1a1a]`}
                  >
                    <i
                      className={`fas fa-${
                        getCurrentAvatar().icon
                      } text-white text-4xl`}
                    ></i>
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors"
                >
                  <i className="fas fa-edit text-white"></i>
                </button>
              </div>

              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <div className="flex items-center justify-center md:justify-start mt-2 text-gray-400">
                  <div className="flex items-center mr-4">
                    <i className="fas fa-users mr-1"></i>
                    <span>{userProfile.followers} seguidores</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-user-friends mr-1"></i>
                    <span>{userProfile.following} seguindo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#222] rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-4">
                  <i className="fas fa-coins text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Moedas</p>
                  <p className="text-xl font-bold">{userProfile.coins}</p>
                </div>
              </div>

              <div className="bg-[#222] rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center mr-4">
                  <i className="fas fa-dice text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Personagens</p>
                  <p className="text-xl font-bold">0</p>
                </div>
              </div>

              <div className="bg-[#222] rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mr-4">
                  <i className="fas fa-user-edit text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">VTubers</p>
                  <p className="text-xl font-bold">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Personagens</h3>
              <a
                href="/gacha"
                className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
              >
                <span>Obter mais</span>
                <i className="fas fa-chevron-right ml-1 text-xs"></i>
              </a>
            </div>

            <div className="bg-[#222] rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-dice text-purple-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">
                Nenhum personagem ainda
              </h3>
              <p className="text-gray-400 mb-4">
                Acesse o Sistema de Gacha para começar a colecionar personagens!
              </p>
              <a
                href="/gacha"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Jogar Gacha
              </a>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">VTubers</h3>
              <a
                href="/editor"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <span>Criar novo</span>
                <i className="fas fa-chevron-right ml-1 text-xs"></i>
              </a>
            </div>

            <div className="bg-[#222] rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-user-edit text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Nenhum VTuber ainda</h3>
              <p className="text-gray-400 mb-4">
                Use o Editor de VTuber para criar seu personagem personalizado!
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Atividades Recentes</h3>
          </div>

          <div className="bg-[#222] rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-[#333] rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-history text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold mb-2">
              Nenhuma atividade recente
            </h3>
            <p className="text-gray-400 mb-4">
              Suas atividades no DevStream aparecerão aqui.
            </p>
            <a
              href="/nova-home"
              className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
            >
              Explorar DevStream
            </a>
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
            href="/gacha"
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
            href="/loja"
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-store text-xl mb-1"></i>
            <span className="text-xs">Loja</span>
          </a>
        </div>
      </footer>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1a1a1a] rounded-xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-[#333]">
              <h2 className="text-xl font-bold">Editar Perfil</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Digite seu nome de usuário"
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Avatar
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`w-full aspect-square rounded-lg bg-gradient-to-r ${
                        avatar.color
                      } flex items-center justify-center border-2 ${
                        selectedAvatar === avatar.id
                          ? "border-white"
                          : "border-transparent"
                      }`}
                    >
                      <i
                        className={`fas fa-${avatar.icon} text-white text-xl`}
                      ></i>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ou faça upload de uma imagem personalizada
                  </label>
                  <div className="flex items-center space-x-4">
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <label className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-[#444] rounded-md text-white cursor-pointer hover:bg-[#333] transition-colors text-center">
                      Escolher imagem
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={uploadLoading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-[#333] hover:bg-[#444] text-white py-2 px-4 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSubmitting || !editName.trim()}
                  className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md transition-colors ${
                    !editName.trim() || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-purple-700 hover:to-pink-700"
                  }`}
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;