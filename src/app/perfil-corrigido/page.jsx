"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

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
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editName, setEditName] = React.useState("");
  const [selectedAvatar, setSelectedAvatar] = React.useState(1);
  const [error, setError] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [upload, { loading: uploadLoading }] = useUpload();
  const [customAvatarUrl, setCustomAvatarUrl] = React.useState(null);
  const optionsMenuRef = React.useRef(null);
  const avatarRef = React.useRef(null);

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
          setCustomAvatarUrl(profile.avatarUrl || null);
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) {
        setError(`Erro ao fazer upload da imagem: ${uploadError}`);
        return;
      }
      setCustomAvatarUrl(url);
    } catch (err) {
      setError("Erro ao fazer upload da imagem. Tente novamente.");
      console.error(err);
    }
  };

  const saveProfile = async () => {
    if (!editName.trim()) {
      setError("Por favor, escolha um nome de usuário");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const updatedProfile = {
        ...userProfile,
        name: editName.trim(),
        avatar: selectedAvatar,
        avatarUrl: customAvatarUrl,
      };

      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

      setUserProfile(updatedProfile);
      setShowEditModal(false);
    } catch (err) {
      setError("Erro ao salvar seu perfil. Tente novamente.");
      console.error(err);
    } finally {
      setIsSaving(false);
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
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <button
                ref={avatarRef}
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-600 focus:outline-none"
              >
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Avatar personalizado"
                    className="w-full h-full object-cover"
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
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all rounded-full">
                  <i className="fas fa-cog text-white opacity-0 hover:opacity-100 text-xl"></i>
                </div>
              </button>

              {showOptionsMenu && (
                <div
                  ref={optionsMenuRef}
                  className="absolute left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-50"
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

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                  <i className="fas fa-users text-purple-400 mr-2"></i>
                  <div>
                    <p className="text-xs text-gray-400">Seguidores</p>
                    <p className="font-bold">{userProfile.followers}</p>
                  </div>
                </div>
                <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                  <i className="fas fa-user-friends text-blue-400 mr-2"></i>
                  <div>
                    <p className="text-xs text-gray-400">Seguindo</p>
                    <p className="font-bold">{userProfile.following}</p>
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
                href="/gacha"
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
                href="/editor"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Criar VTuber
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
            href="/perfil-corrigido"
            className="flex flex-col items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">Perfil</span>
          </a>
        </div>
      </footer>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-xl max-w-md w-full overflow-hidden animate-fadeIn">
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
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Seu nome de usuário"
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
                      className={`w-full aspect-square rounded-full bg-gradient-to-r ${
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
                  <p className="text-sm font-medium text-gray-300 mb-2">
                    Ou faça upload de uma imagem personalizada:
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[#2a2a2a] flex items-center justify-center">
                      {customAvatarUrl ? (
                        <img
                          src={customAvatarUrl}
                          alt="Avatar personalizado"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-user text-gray-500 text-xl"></i>
                      )}
                    </div>
                    <label className="flex-1 px-4 py-2 bg-[#2a2a2a] hover:bg-[#333] rounded-lg text-white cursor-pointer text-center">
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
                  onClick={saveProfile}
                  disabled={isSaving || uploadLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
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