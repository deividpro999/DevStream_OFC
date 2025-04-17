"use client";
import React from "react";

function MainComponent() {
  const [moedas, setMoedas] = React.useState(0);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = React.useState(false);
  const [purchasedAmount, setPurchasedAmount] = React.useState(0);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { data: user, loading: userLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!userLoading && !user) {
      router.push("/account/signin?callbackUrl=/loja-de-moedas");
    }
  }, [user, userLoading, router]);

  React.useEffect(() => {
    const fetchUserCoins = async () => {
      if (user && user.id) {
        try {
          const response = await fetch("/api/getUserProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.profile) {
              setMoedas(data.profile.coins || 0);
            }
          }
        } catch (error) {
          console.error("Erro ao buscar moedas:", error);
        }
      }
    };

    fetchUserCoins();
  }, [user]);

  const coinPackages = [
    {
      id: 1,
      amount: 100,
      price: 4.99,
      bonus: 0,
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700",
      icon: "coins",
    },
    {
      id: 2,
      amount: 500,
      price: 19.99,
      bonus: 50,
      color: "from-purple-600 to-purple-800",
      hoverColor: "from-purple-500 to-purple-700",
      icon: "coins",
    },
    {
      id: 3,
      amount: 1000,
      price: 34.99,
      bonus: 150,
      color: "from-pink-600 to-pink-800",
      hoverColor: "from-pink-500 to-pink-700",
      icon: "gem",
    },
    {
      id: 4,
      amount: 5000,
      price: 149.99,
      bonus: 1000,
      color: "from-yellow-600 to-yellow-800",
      hoverColor: "from-yellow-500 to-yellow-700",
      icon: "crown",
    },
  ];

  const handlePurchase = (coinPackage) => {
    setSelectedPackage(coinPackage);
    setShowConfirmation(true);
    setError(null);
  };

  const confirmPurchase = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    const totalCoins = selectedPackage.amount + selectedPackage.bonus;

    try {
      const response = await fetch("/api/addCoins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalCoins,
          description: `Compra de pacote de ${selectedPackage.amount} moedas`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMoedas(data.newBalance);
        setPurchasedAmount(totalCoins);
        setShowPurchaseSuccess(true);
        setShowConfirmation(false);

        setTimeout(() => {
          setShowPurchaseSuccess(false);
        }, 3000);
      } else {
        setError(data.error || "Erro ao processar a compra");
      }
    } catch (error) {
      console.error("Erro na compra:", error);
      setError("Erro ao processar a compra. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelPurchase = () => {
    setShowConfirmation(false);
    setSelectedPackage(null);
    setError(null);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Loja de Moedas
          </h1>
          <a
            href="/nova-home-auth"
            className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-md text-sm transition-all flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Voltar
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="bg-[#1e1e1e] rounded-lg p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-3">
              <i className="fas fa-coins text-white text-lg"></i>
            </div>
            <div>
              <span className="font-bold text-2xl text-yellow-400">
                {moedas}
              </span>
              <p className="text-xs text-gray-400">Seu saldo de moedas</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-[#1e1e1e] rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500">
              Escolha seu pacote de moedas
            </h2>
            <p className="text-center text-gray-400 text-sm">
              Quanto mais moedas comprar, mais bônus você recebe!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coinPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#333] transition-transform hover:scale-105"
              >
                <div
                  className={`bg-gradient-to-r ${pkg.color} p-4 text-center`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#00000050] mx-auto flex items-center justify-center mb-2">
                    <i className={`fas fa-${pkg.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold">{pkg.amount} Moedas</h3>
                  {pkg.bonus > 0 && (
                    <span className="inline-block bg-[#00000050] text-yellow-300 text-xs px-2 py-1 rounded-full mt-1">
                      +{pkg.bonus} BÔNUS
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Preço:</span>
                    <span className="text-xl font-bold">
                      R$ {pkg.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePurchase(pkg)}
                    className={`w-full bg-gradient-to-r ${pkg.hoverColor} text-white font-bold py-2 px-4 rounded-md transition-all hover:shadow-lg flex items-center justify-center`}
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Comprar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
          <h3 className="text-lg font-bold mb-4 text-center">
            Informações Importantes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-shield-alt text-blue-400"></i>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 mb-1">
                  Pagamento Seguro
                </h4>
                <p className="text-sm text-gray-400">
                  Todas as transações são processadas com segurança.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-bolt text-purple-400"></i>
              </div>
              <div>
                <h4 className="font-bold text-purple-400 mb-1">
                  Entrega Instantânea
                </h4>
                <p className="text-sm text-gray-400">
                  Suas moedas são creditadas imediatamente após a compra.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-pink-900 flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-headset text-pink-400"></i>
              </div>
              <div>
                <h4 className="font-bold text-pink-400 mb-1">Suporte 24/7</h4>
                <p className="text-sm text-gray-400">
                  Estamos sempre disponíveis para ajudar com suas dúvidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-[#333] animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-center">
              Confirmar Compra
            </h3>

            <div className="bg-[#222] p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Pacote:</span>
                <span className="font-bold">
                  {selectedPackage.amount} Moedas
                </span>
              </div>

              {selectedPackage.bonus > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Bônus:</span>
                  <span className="font-bold text-yellow-400">
                    +{selectedPackage.bonus} Moedas
                  </span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Total:</span>
                <span className="font-bold">
                  {selectedPackage.amount + selectedPackage.bonus} Moedas
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#333]">
                <span className="text-gray-400">Preço:</span>
                <span className="font-bold text-xl">
                  R$ {selectedPackage.price.toFixed(2)}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={cancelPurchase}
                className="flex-1 bg-[#333] hover:bg-[#444] text-white font-bold py-3 px-4 rounded-md transition-all"
                disabled={isLoading}
              >
                Cancelar
              </button>

              <button
                onClick={confirmPurchase}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-4 rounded-md transition-all"
                disabled={isLoading}
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
                    Processando...
                  </span>
                ) : (
                  "Confirmar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPurchaseSuccess && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>
                Compra realizada! +{purchasedAmount} Moedas adicionadas.
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;