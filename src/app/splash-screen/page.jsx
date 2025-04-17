"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [typedText, setTypedText] = React.useState("");
  const [showLoader, setShowLoader] = React.useState(false);
  const [fadeOut, setFadeOut] = React.useState(false);
  const [showProfileSetup, setShowProfileSetup] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const fullText = "DevStream";
  const { data: user, loading: userLoading } = useUser();
  const router = useRouter();

  // Verificar se já existe um perfil salvo
  React.useEffect(() => {
    const checkExistingProfile = () => {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        // Se já tem perfil, redirecionar diretamente para a home
        window.location.href = "/nova-home";
        return true;
      }
      return false;
    };

    // Verificar imediatamente se há um perfil existente
    const hasProfile = checkExistingProfile();
    if (hasProfile) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowLoader(true);

        // Start redirect countdown after typing is complete
        setTimeout(() => {
          // Mostrar o menu de configuração
          setShowProfileSetup(true);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Por favor, escolha um nome de usuário");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const userProfileData = {
        name: username.trim(),
        avatar: 1, // Avatar padrão
        avatarUrl: avatarUrl || null,
        coins: 100, // Moedas iniciais
      };

      const response = await fetch("/api/initUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          avatarUrl: avatarUrl || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar perfil: ${response.status}`);
      }

      // Salvar no localStorage para não mostrar essa tela novamente
      localStorage.setItem("userProfile", JSON.stringify(userProfileData));

      // Salvar moedas separadamente também
      localStorage.setItem("moedas", "100");

      // Redirecionar para a página home
      setFadeOut(true);
      setTimeout(() => {
        window.location.href = "/nova-home";
      }, 1000);
    } catch (err) {
      setError("Erro ao salvar seu perfil. Tente novamente.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full bg-[#121212] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="absolute -inset-20 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center">
          {!showProfileSetup ? (
            <>
              <div className="mb-8 flex items-center">
                <i className="fas fa-code text-purple-500 text-4xl mr-4"></i>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                  {typedText}
                  <span className="animate-blink text-white">|</span>
                </h1>
                <i className="fas fa-terminal text-blue-500 text-4xl ml-4"></i>
              </div>

              {showLoader && (
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-64 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-loading-bar"></div>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm">
                    Carregando recursos...
                  </p>
                </div>
              )}

              <div className="mt-16 grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#333] animate-float"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {i === 1 && (
                      <i className="fas fa-dice text-purple-400 text-xl"></i>
                    )}
                    {i === 2 && (
                      <i className="fas fa-user-edit text-pink-400 text-xl"></i>
                    )}
                    {i === 3 && (
                      <i className="fas fa-store text-blue-400 text-xl"></i>
                    )}
                    {i === 4 && (
                      <i className="fas fa-plus text-green-400 text-xl"></i>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 border border-[#333] shadow-xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6 text-center">
                Bem-vindo ao DevStream!
              </h2>
              <p className="text-gray-300 mb-6 text-center">
                Vamos configurar seu perfil para começar
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#2a2a2a] border-2 border-purple-500 overflow-hidden mb-4 flex items-center justify-center">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fas fa-user text-gray-500 text-4xl"></i>
                    )}
                  </div>
                  <label className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-colors">
                    Escolher foto
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploadLoading}
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Como devemos te chamar?
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#2a2a2a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Seu nome de usuário"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || uploadLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Salvando..." : "Começar"}
                </button>
              </form>
            </div>
          )}

          <div className="absolute bottom-[-80px] left-0 right-0">
            <p className="text-center text-gray-500 text-xs">
              © 2025 DevStream
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-5 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-5 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-500 rounded-full opacity-5 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 h-16 bg-gradient-to-t from-purple-500 to-transparent opacity-20 animate-equalizer"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.8 + (i % 3) * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes loading-bar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes equalizer {
          0%, 100% { height: 8px; }
          50% { height: 16px; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-in-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-equalizer {
          animation: equalizer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;