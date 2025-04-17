"use client";
import React from "react";

function MainComponent() {
  const [typingText, setTypingText] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [selectedAvatar, setSelectedAvatar] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    const text = "DevStream";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypingText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  React.useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      window.location.href = "/nova-home";
    }
  }, []);

  const avatars = [
    { id: 1, icon: "user-ninja", color: "from-purple-600 to-purple-800" },
    { id: 2, icon: "user-astronaut", color: "from-blue-600 to-blue-800" },
    { id: 3, icon: "user-graduate", color: "from-green-600 to-green-800" },
    { id: 4, icon: "user-secret", color: "from-red-600 to-red-800" },
    { id: 5, icon: "user-tie", color: "from-yellow-600 to-yellow-800" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError("Por favor, insira seu nome de usuário");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/initUserProfileNoAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          avatarUrl: selectedAvatar.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            avatar: selectedAvatar,
            coins: data.user.profile.coins,
          })
        );

        setShowSuccess(true);

        setTimeout(() => {
          window.location.href = "/nova-home";
        }, 2000);
      } else {
        throw new Error(data.error || "Erro ao criar perfil");
      }
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError("Erro ao salvar perfil. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121212] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>

        {[...Array.from({ length: 20 })].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl border border-[#333] animate-fadeIn">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-2">
              {typingText}
              <span className="animate-blink text-white">|</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Configure seu perfil para começar
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-900 bg-opacity-30 p-3 text-sm text-red-300 border border-red-800 animate-shake">
              {error}
            </div>
          )}

          {showSuccess && (
            <div className="mb-6 rounded-lg bg-green-900 bg-opacity-30 p-3 text-sm text-green-300 border border-green-800 animate-pulse">
              Perfil criado com sucesso! Redirecionando...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Como devemos chamar você?
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Seu nome ou apelido"
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Escolha seu avatar
              </label>
              <div className="grid grid-cols-5 gap-3">
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`w-full aspect-square rounded-lg bg-gradient-to-r ${
                      avatar.color
                    } flex items-center justify-center transition-all ${
                      selectedAvatar === avatar.id
                        ? "ring-4 ring-purple-500 scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <i
                      className={`fas fa-${avatar.icon} text-white text-xl`}
                    ></i>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || showSuccess}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 text-base font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Salvando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className="fas fa-rocket mr-2"></i>
                  Começar minha jornada
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Ao continuar, você concorda com nossos Termos de Serviço e
              Política de Privacidade
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            © 2025 DevStream. Todos os direitos reservados.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;