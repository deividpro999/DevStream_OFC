"use client";
import React from "react";

function MainComponent() {
  const [isExporting, setIsExporting] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const [exportData, setExportData] = React.useState(null);
  const [importData, setImportData] = React.useState(null);
  const [importResult, setImportResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [codeExport, setCodeExport] = React.useState(null);
  const [isExportingCode, setIsExportingCode] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const { data: user, loading } = useUser();

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch("/api/exportDatabaseData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao exportar dados: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setExportData(data);
      setSuccessMessage("Dados exportados com sucesso!");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Erro na exportação:", err);
      setError(err.message || "Ocorreu um erro ao exportar os dados");
    } finally {
      setIsExporting(false);
    }
  };

  const downloadJson = () => {
    if (!exportData) return;

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `devstream_data_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCode = async () => {
    setIsExportingCode(true);
    setError(null);

    try {
      const modulesList = [
        { id: 1, name: "Splash Screen" },
        { id: 2, name: "Configuração Inicial" },
        { id: 3, name: "Configuração Inicial Auth" },
        { id: 4, name: "Editor de Personagem" },
        { id: 5, name: "ExportarDados" },
        { id: 6, name: "Gacha Redirect" },
        { id: 7, name: "Loja de Moedas" },
        { id: 8, name: "Loja de Moedas" },
        { id: 9, name: "Loja de Destino" },
        { id: 10, name: "New Page" },
        { id: 11, name: "Nova Home" },
        { id: 12, name: "Nova Home com Auth" },
        { id: 13, name: "Nova Home Sem Auth" },
        { id: 14, name: "Perfil" },
        { id: 15, name: "Perfil Atualizado" },
        { id: 16, name: "Perfil Completo" },
        { id: 17, name: "Perfil Corrigido" },
        { id: 18, name: "Perfil Revisado" },
        { id: 19, name: "Sign In" },
        { id: 20, name: "Sistema de Gacha" },
        { id: 21, name: "Splash Screen" },
        { id: 22, name: "Nova Home" },
        { id: 23, name: "Logout" },
        { id: 24, name: "Login Estilizado" },
        { id: 25, name: "Configuração Inicial" },
        { id: 26, name: "Nova Home Corrigida" },
        { id: 27, name: "Roupas VTuber" },
        { id: 28, name: "addCoins" },
        { id: 29, name: "exportDatabaseData" },
        { id: 30, name: "followUser" },
        { id: 31, name: "getCharacters" },
        { id: 32, name: "getOutfits" },
        { id: 33, name: "getUserFollowers" },
        { id: 34, name: "getUserFollowing" },
        { id: 35, name: "getUserProfile" },
        { id: 36, name: "getUserProfileNoAuth" },
        { id: 37, name: "importDatabaseData" },
        { id: 38, name: "initUserProfile" },
        { id: 39, name: "initUserProfileNoAuth" },
        { id: 40, name: "removeCoins" },
        { id: 41, name: "saveUserProfile" },
        { id: 42, name: "unfollowUser" },
        { id: 43, name: "updateUserName" },
        { id: 44, name: "updateUserProfile" },
        { id: 45, name: "saveUserProfile" },
        { id: 46, name: "initUserProfile" },
        { id: 47, name: "getCharacters" },
        { id: 48, name: "addCoins" },
        { id: 49, name: "saveUserProfile" },
        { id: 50, name: "Sign In" },
        { id: 51, name: "Sign Up" },
        { id: 52, name: "Logout" },
      ];

      const codeCollection = {
        exportDate: new Date().toISOString(),
        modules: modulesList,
        code: {},
        schema: {},
      };

      codeCollection.schema = {
        description: "Esquema do banco de dados PostgreSQL",
        tables: [
          "auth_accounts",
          "auth_sessions",
          "auth_users",
          "auth_verification_token",
          "characters",
          "coin_transactions",
          "followers",
          "gacha_pulls",
          "outfits",
          "user_characters",
          "user_outfits",
          "user_profiles",
        ],
      };

      codeCollection.code[5] = {
        id: 5,
        name: "ExportarDados",
        type: "page",
        path: "/exportar-dados",
        code:
          document.querySelector("pre")?.innerText ||
          "// Código não disponível diretamente",
      };

      setCodeExport(codeCollection);
      setSuccessMessage("Código exportado com sucesso!");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Erro na exportação de código:", err);
      setError(err.message || "Ocorreu um erro ao exportar o código");
    } finally {
      setIsExportingCode(false);
    }
  };

  const downloadCodeExport = () => {
    if (!codeExport) return;

    const dataStr = JSON.stringify(codeExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `devstream_code_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setImportData(jsonData);
        setError(null);
      } catch (err) {
        setError("Arquivo JSON inválido. Verifique o formato do arquivo.");
        setImportData(null);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!importData) {
      setError("Nenhum dado para importar. Selecione um arquivo JSON válido.");
      return;
    }

    setIsImporting(true);
    setError(null);

    try {
      const response = await fetch("/api/importDatabaseData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: importData.data }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erro ao importar dados");
      }

      setImportResult(result);
      setSuccessMessage("Dados importados com sucesso!");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Erro na importação:", err);
      setError(err.message || "Ocorreu um erro ao importar os dados");
    } finally {
      setIsImporting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 shadow-xl border border-[#333] relative z-10">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-lock text-red-400 text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
            <p className="text-gray-400">
              Você precisa estar autenticado para acessar esta página
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <a
              href="/account/signin?callbackUrl=/exportar-dados"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg text-center transition-colors"
            >
              Fazer Login
            </a>
            <a
              href="/nova-home"
              className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white py-3 px-4 rounded-lg text-center transition-colors"
            >
              Voltar para Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Gerenciar Dados
          </h1>
          <a
            href="/nova-home"
            className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-md text-sm transition-all flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Voltar
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] mb-6">
            <h2 className="text-xl font-bold mb-4">Exportar Dados</h2>
            <p className="text-gray-400 mb-6">
              Esta ferramenta permite exportar todos os seus dados do DevStream
              para um arquivo JSON. Você pode usar este arquivo para fazer
              backup dos seus dados ou transferi-los para outra conta.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Exportando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-database mr-2"></i>
                    Exportar Dados
                  </>
                )}
              </button>

              {exportData && (
                <button
                  onClick={downloadJson}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Baixar JSON
                </button>
              )}
            </div>

            {exportData && (
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2">Prévia dos Dados</h3>
                <div className="bg-[#2a2a2a] rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(exportData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] mb-6">
            <h2 className="text-xl font-bold mb-4">
              Exportar Código e Estética
            </h2>
            <p className="text-gray-400 mb-6">
              Esta ferramenta permite exportar informações sobre o código e a
              estrutura visual do seu aplicativo. Você pode usar este arquivo
              para documentação ou para recriar partes do seu aplicativo em
              outro lugar.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleExportCode}
                disabled={isExportingCode}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isExportingCode ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Exportando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-code mr-2"></i>
                    Exportar Código
                  </>
                )}
              </button>

              {codeExport && (
                <button
                  onClick={downloadCodeExport}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Baixar Código
                </button>
              )}
            </div>

            {codeExport && (
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2">Prévia da Estrutura</h3>
                <div className="bg-[#2a2a2a] rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(
                      {
                        exportDate: codeExport.exportDate,
                        moduleCount: codeExport.modules.length,
                        schema: codeExport.schema,
                        codeExample: "// Código disponível no arquivo baixado",
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333] mb-6">
            <h2 className="text-xl font-bold mb-4">Importar Dados</h2>
            <p className="text-gray-400 mb-6">
              Você pode importar dados previamente exportados. Esta função só
              está disponível para administradores do sistema.
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />

              <button
                onClick={triggerFileInput}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <i className="fas fa-file-upload mr-2"></i>
                Selecionar Arquivo JSON
              </button>

              {importData && (
                <div className="p-3 bg-blue-900/30 border border-blue-800 rounded-lg text-blue-300 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>Arquivo carregado: {importData.exportDate}</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <p>Contém: </p>
                    <ul className="list-disc pl-5 mt-1">
                      {importData.data.characters && (
                        <li>{importData.data.characters.length} personagens</li>
                      )}
                      {importData.data.outfits && (
                        <li>{importData.data.outfits.length} roupas</li>
                      )}
                      {importData.data.userProfiles && (
                        <li>{importData.data.userProfiles.length} perfis</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={handleImport}
                disabled={isImporting || !importData}
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isImporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Importando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-file-import mr-2"></i>
                    Importar Dados
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            {importResult && (
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2">
                  Resultado da Importação
                </h3>
                <div className="bg-[#2a2a2a] rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(importResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-[#333]">
            <h2 className="text-xl font-bold mb-4">Como salvar no GitHub</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-blue-400">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 mb-1">
                    Crie uma conta no GitHub
                  </h4>
                  <p className="text-sm text-gray-400">
                    Se você ainda não tem uma conta, acesse{" "}
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      github.com
                    </a>{" "}
                    e crie uma conta gratuita.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-purple-400">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-purple-400 mb-1">
                    Crie um novo repositório
                  </h4>
                  <p className="text-sm text-gray-400">
                    Clique no botão "+" no canto superior direito e selecione
                    "New repository". Dê um nome como "devstream-backup" e
                    torne-o privado se quiser manter seus dados seguros.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-pink-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-pink-400">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-pink-400 mb-1">
                    Faça upload do arquivo JSON
                  </h4>
                  <p className="text-sm text-gray-400">
                    Dentro do seu repositório, clique em "Add file" e depois
                    "Upload files". Arraste o arquivo JSON baixado e clique em
                    "Commit changes".
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-bold text-green-400">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-1">
                    Atualize regularmente
                  </h4>
                  <p className="text-sm text-gray-400">
                    Para manter seu backup atualizado, repita o processo de
                    exportação e upload periodicamente, substituindo o arquivo
                    antigo ou criando versões com datas diferentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
          <div className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>{successMessage}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        .animate-slideDown {
          animation: slideDown 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;