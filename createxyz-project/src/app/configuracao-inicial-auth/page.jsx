"use client";
import React from "react";

function MainComponent() {
  const [typingText, setTypingText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [selectedAvatar, setSelectedAvatar] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { data: user, loading: userLoading } = useUser();
  const router = useRouter();
  const fullText = "DevStream";

  React.useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypingText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  React.useEffect(() => {
    if (!userLoading && !user) {
      router.push("/account/signin?callbackUrl=/configuracao-inicial-auth");
    }
  }, [user, userLoading, router]);

  const avatars = [
    { id: 1, icon: "user-ninja", color: "from-purple-600 to-purple-800" },
    { id: 2, icon: "user-astronaut", color: "from-blue-600 to-blue-800" },
    { id: 3, icon: "user-graduate", color: "from-green-600 to-green-800" },
    { id: 4, icon: "user-secret", color: "from-red-600 to-red-800" },
    { id: 5, icon: "user-tie", color: "from-yellow-600 to-yellow-800" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Por favor, insira seu nome de usuário");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const nameResponse = await fetch("/api/updateUserName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username }),
      });

      const nameData = await nameResponse.json();

      if (!nameResponse.ok || !nameData.success) {
        throw new Error(nameData.message || "Erro ao atualizar nome");
      }

      const profileResponse = await fetch("/api/initUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData.success) {
        throw new Error(profileData.message || "Erro ao inicializar perfil");
      }

      const avatarUrl = `/avatars/avatar-${selectedAvatar}.png`;
      const updateResponse = await fetch("/api/updateUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          avatar_url: avatarUrl,
        }),
      });

      const updateData = await updateResponse.json();

      if (!updateResponse.ok || !updateData.success) {
        throw new Error(updateData.message || "Erro ao atualizar avatar");
      }

      setShowSuccess(true);

      setTimeout(() => {
        router.push("/nova-home-auth");
      }, 2000);
    } catch (error) {
      console.error("Erro na configuração inicial:", error);
      setError(error.message || "Erro ao salvar perfil. Tente novamente.");
      setIsLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-green-400 rounded-full"></div>
      </div>

      <div className="w-full max-w-md mx-auto p-8 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#333] relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-2">
            {typingText}
            <span className="animate-blink text-white">|</span>
          </h1>
          <p className="text-gray-400">Configure seu perfil para começar</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {showSuccess ? (
          <div className="text-center p-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-check text-green-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Perfil configurado!</h3>
            <p className="text-gray-400 mb-4">
              Redirecionando para a página principal...
            </p>
            <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 animate-loading-bar"></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Nome de usuário
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Como devemos te chamar?"
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
                    className={`w-full aspect-square rounded-lg bg-[#2a2a2a] flex items-center justify-center transition-all ${
                      selectedAvatar === avatar.id
                        ? "ring-2 ring-purple-500 scale-110"
                        : "hover:bg-[#333] hover:scale-105"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${avatar.color} flex items-center justify-center`}
                    >
                      <i className={`fas fa-${avatar.icon} text-white`}></i>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Salvando...
                </span>
              ) : (
                "Salvar e Continuar"
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-600">
          © 2025 DevStream. Todos os direitos reservados.
        </p>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes loading-bar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;