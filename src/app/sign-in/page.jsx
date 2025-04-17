"use client";
import React from "react";

function MainComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { signInWithCredentials } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signInWithCredentials({
        email,
        password,
        callbackUrl: "/home",
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      try {
        const profileResponse = await fetch("/api/initUserProfile", {
          method: "POST",
        });

        if (!profileResponse.ok) {
          console.error(
            "Erro ao verificar perfil:",
            await profileResponse.text()
          );
        }
      } catch (profileError) {
        console.error("Erro ao verificar perfil:", profileError);
      }

      router.push("/home");
    } catch (err) {
      setError("Email ou senha inválidos. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };

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
          <p className="text-gray-400">Entre para continuar</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-900 bg-opacity-30 p-3 text-sm text-red-300 border border-red-800">
            {error}
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
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Senha
              </label>
              <a
                href="#"
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Esqueceu a senha?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-[#2a2a2a] border border-[#444] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
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
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#333] text-center">
          <p className="text-sm text-gray-400">
            Não tem uma conta?{" "}
            <a
              href="/account/signup"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Cadastre-se
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/splash"
            className="text-sm text-gray-500 hover:text-gray-400"
          >
            Voltar para a tela inicial
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-600">
          © 2025 DevStream. Todos os direitos reservados.
        </p>
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