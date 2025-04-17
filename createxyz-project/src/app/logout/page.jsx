"use client";
import React from "react";

function MainComponent() {
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut({
          callbackUrl: "/account/signin",
          redirect: true,
        });
      } catch (err) {
        setError("Ocorreu um erro ao sair. Tente novamente.");
        setIsLoggingOut(false);
      }
    };

    performLogout();
  }, [signOut]);

  return (
    <div className="min-h-screen w-full bg-[#121212] flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
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
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#1a1a1a] p-8 shadow-xl border border-[#333]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-2">
            DevStream
          </h1>
          <p className="text-gray-400">Encerrando sua sessão</p>
        </div>

        {isLoggingOut ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin mb-6"></div>
            <p className="text-xl text-gray-300">Saindo...</p>
            <p className="text-sm text-gray-500 mt-2">
              Você será redirecionado em instantes
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-900 bg-opacity-30 p-3 text-sm text-red-300 border border-red-800">
                {error}
              </div>
            )}

            <button
              onClick={() => {
                setIsLoggingOut(true);
                signOut({
                  callbackUrl: "/account/signin",
                  redirect: true,
                });
              }}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Tentar Novamente
            </button>

            <a
              href="/account/signin"
              className="block w-full text-center rounded-lg bg-[#2a2a2a] hover:bg-[#333] px-4 py-3 text-base font-medium text-white transition-colors"
            >
              Voltar para Login
            </a>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[#333] text-center">
          <a
            href="/splash"
            className="text-sm text-gray-500 hover:text-gray-400"
          >
            Voltar para a tela inicial
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;