"use client";
import React from "react";

function MainComponent() {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
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
        callbackUrl: "/perfil",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Não foi possível iniciar o login. Tente novamente ou use um método diferente.",
        OAuthCallback: "Login falhou após redirecionamento. Tente novamente.",
        OAuthCreateAccount:
          "Não foi possível criar uma conta com este método. Tente outra opção.",
        EmailCreateAccount:
          "Este email não pode ser usado para criar uma conta. Ele pode já existir.",
        Callback: "Algo deu errado durante o login. Tente novamente.",
        OAuthAccountNotLinked:
          "Esta conta está vinculada a um método de login diferente. Tente usar esse método.",
        CredentialsSignin:
          "Email ou senha incorretos. Tente novamente ou redefina sua senha.",
        AccessDenied: "Você não tem permissão para fazer login.",
        Configuration:
          "O login não está funcionando no momento. Tente novamente mais tarde.",
        Verification: "Seu link de login expirou. Solicite um novo.",
      };

      setError(
        errorMessages[err.message] || "Algo deu errado. Tente novamente."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121212] flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl bg-[#1a1a1a] p-8 shadow-xl border border-[#333] relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            DevStream
          </h1>
          <p className="text-gray-400 mt-2">Bem-vindo de volta</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="overflow-hidden rounded-lg border border-[#333] bg-[#2a2a2a] px-4 py-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full bg-transparent text-white outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <div className="overflow-hidden rounded-lg border border-[#333] bg-[#2a2a2a] px-4 py-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-transparent text-white outline-none"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-900/30 border border-red-500/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>

          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-[#333] flex-grow"></div>
            <span className="text-gray-400 text-sm">ou</span>
            <div className="h-px bg-[#333] flex-grow"></div>
          </div>

          <button
            type="button"
            onClick={() => (window.location.href = "/perfil")}
            className="w-full rounded-lg bg-[#2a2a2a] border border-[#333] px-4 py-3 text-base font-medium text-white transition-colors hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Continuar sem conta
          </button>

          <p className="text-center text-sm text-gray-400">
            Não tem uma conta?{" "}
            <a
              href="/account/signup"
              className="text-purple-400 hover:text-purple-300"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default MainComponent;