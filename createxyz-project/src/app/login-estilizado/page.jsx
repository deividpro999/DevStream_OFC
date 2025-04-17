"use client";
import React from "react";

function MainComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [typedText, setTypedText] = React.useState("");
  const fullText = "DevStream";
  const { signInWithCredentials } = useAuth();

  React.useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/nova-home",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: "Não foi possível iniciar o login. Tente novamente.",
        OAuthCallback: "Login falhou após redirecionamento. Tente novamente.",
        OAuthCreateAccount: "Não foi possível criar uma conta com este método.",
        EmailCreateAccount:
          "Este email não pode ser usado. Talvez já esteja registrado.",
        Callback: "Algo deu errado durante o login. Tente novamente.",
        OAuthAccountNotLinked:
          "Esta conta está vinculada a um método diferente de login.",
        CredentialsSignin: "Email ou senha incorretos. Tente novamente.",
        AccessDenied: "Você não tem permissão para fazer login.",
        Configuration:
          "Login não está funcionando no momento. Tente novamente mais tarde.",
        Verification: "Seu link de login expirou. Solicite um novo.",
      };

      setError(
        errorMessages[err.message] || "Algo deu errado. Tente novamente."
      );
      setLoading(false);
    }
  };

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

      <div className="w-full max-w-md mx-auto p-8 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#333] relative z-10 animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-2">
            {typedText}
            <span className="animate-blink text-white">|</span>
          </h1>
          <p className="text-gray-400">Entre na sua conta</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm animate-shake">
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-500"></i>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] pl-10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-500"></i>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] pl-10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 text-base font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
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
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-[#333]"></div>
            <div className="px-3 text-sm text-gray-400">ou</div>
            <div className="flex-1 border-t border-[#333]"></div>
          </div>

          <a
            href="/configuracao-inicial"
            className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] hover:bg-[#333] px-4 py-3 text-base font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Continuar sem conta
          </a>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Não tem uma conta?{" "}
            <a
              href="/account/signup"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Cadastre-se
            </a>
          </p>
        </div>
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;