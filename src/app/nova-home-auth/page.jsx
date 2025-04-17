"use client";
import React from "react";

function MainComponent() {
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { data: user, loading: userLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.push("/account/signin?callbackUrl=/nova-home-auth");
      } else {
        fetchUserProfile();
      }
    }
  }, [user, userLoading, router]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar perfil: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setProfileData(data.profile);
      } else {
        throw new Error(data.message || "Erro ao carregar perfil");
      }
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
      setError("Não foi possível carregar seu perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      id: "gacha",
      name: "Sistema de Gacha",
      description: "Obtenha personagens e itens aleatórios",
      icon: "dice",
      color: "from-purple-600 to-indigo-700",
      link: "/sistema-de-gacha",
    },
    {
      id: "editor",
      name: "Editor de VTuber",
      description: "Personalize seu avatar virtual",
      icon: "user-edit",
      color: "from-pink-600 to-purple-700",
      link: "/editor",
    },
    {
      id: "loja",
      name: "Loja de Moedas",
      description: "Adquira moedas para usar no sistema",
      icon: "coins",
      color: "from-yellow-500 to-orange-600",
      link: "/loja",
    },
    {
      id: "roupas",
      name: "Roupas VTuber",
      description: "Compre roupas para seu avatar",
      icon: "tshirt",
      color: "from-blue-600 to-cyan-700",
      link: "/roupas-vtuber",
    },
  ];

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-md w-full border border-[#333]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Erro</h2>
            <p className="text-gray-400">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium"
          >
            Tentar novamente
          </button>
        </div>
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

      <header className="relative z-10 bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-[#333] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            DevStream
          </h1>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-[#2a2a2a] rounded-full px-4 py-1.5">
              <i className="fas fa-coins text-yellow-400 mr-2"></i>
              <span className="font-medium">{profileData?.coins || 0}</span>
            </div>

            <a
              href="/perfil"
              className="flex items-center space-x-2 bg-[#2a2a2a] hover:bg-[#333] rounded-full pl-2 pr-4 py-1.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                {profileData?.avatar_url ? (
                  <img
                    src={profileData.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fas fa-user text-white"></i>
                )}
              </div>
              <span className="font-medium truncate max-w-[100px]">
                {user?.name || "Usuário"}
              </span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#1e1e1e] to-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-[#333] shadow-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                {profileData?.avatar_url ? (
                  <img
                    src={profileData.avatar_url}
                    alt="Avatar do usuário"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fas fa-user text-white text-4xl"></i>
                )}
              </div>

              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Olá, {user?.name || "Desenvolvedor"}!
                </h2>
                <p className="text-gray-400 mb-4">
                  Bem-vindo(a) de volta ao DevStream
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">
                      <i className="fas fa-coins text-yellow-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Moedas</p>
                      <p className="font-bold text-yellow-400">
                        {profileData?.coins || 0}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                      <i className="fas fa-dice text-purple-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Personagens</p>
                      <p className="font-bold text-purple-400">
                        {profileData?.characters?.length || 0}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-900/30 flex items-center justify-center mr-3">
                      <i className="fas fa-tshirt text-pink-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Roupas</p>
                      <p className="font-bold text-pink-400">
                        {profileData?.outfits?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="/loja"
                  className="bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i>
                  Comprar Moedas
                </a>
                <a
                  href="/account/logout"
                  className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Sair
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Funcionalidades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <a
                key={feature.id}
                href={feature.link}
                className="bg-[#1a1a1a] hover:bg-[#222] border border-[#333] hover:border-[#444] rounded-xl overflow-hidden transition-all hover:transform hover:scale-105 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-r ${feature.color} p-6`}>
                  <div className="w-16 h-16 rounded-full bg-[#00000030] flex items-center justify-center mb-2">
                    <i
                      className={`fas fa-${feature.icon} text-white text-2xl`}
                    ></i>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm text-purple-400">
                    <span>Acessar</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-r from-[#1e1e1e] to-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-[#333] shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Novidades em breve!</h2>
                <p className="text-gray-400">
                  Estamos trabalhando em novas funcionalidades para melhorar sua
                  experiência.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                  <i className="fas fa-bell text-purple-400"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <i className="fas fa-gift text-blue-400"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center">
                  <i className="fas fa-star text-pink-400"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-[#1a1a1a] border-t border-[#333] py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 DevStream. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;