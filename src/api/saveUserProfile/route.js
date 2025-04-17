async function handler({ name, avatar }) {
  try {
    // Create a temporary user ID based on a hash of the name and current timestamp
    // This is just for demo purposes without authentication
    const tempUserId = Math.floor(Math.random() * 1000000) + 1;

    // Store profile in localStorage (client-side will handle this)
    // Here we just return the profile data

    return {
      success: true,
      profile: {
        id: tempUserId,
        name: name,
        avatar: avatar,
        coins: 1000,
        createdAt: new Date().toISOString(),
      },
      message:
        "Perfil salvo com sucesso! Como estamos usando localStorage, os dados serão armazenados apenas neste dispositivo.",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

function MainComponent() {
  const [userProfile, setUserProfile] = React.useState({
    name: "Usuário",
    avatar: 1,
    coins: 1000,
  });
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadUserProfile = () => {
      try {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setUserProfile((prev) => ({
            ...prev,
            name: profile.name || "Usuário",
            avatar: profile.avatar || 1,
          }));
        } else {
          // Se não houver perfil salvo, redirecionar para a página de perfil
          window.location.href = "/perfil";
          return;
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

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
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
            <div className="hidden md:flex items-center bg-[#2a2a2a] rounded-full px-4 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-2">
                <i className="fas fa-coins text-white text-xs"></i>
              </div>
              <span className="font-bold text-yellow-400">
                {userProfile.coins}
              </span>
            </div>

            <div className="flex items-center bg-[#2a2a2a] rounded-full p-1 pr-4">
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
                href="/loja"
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
                href="/roupas"
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
                href="/gacha"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                Jogar Gacha
              </a>
              <a
                href="/editor"
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