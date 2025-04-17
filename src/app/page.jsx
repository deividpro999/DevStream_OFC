"use client";
import React from "react";

function MainComponent() {
  const [typedText, setTypedText] = React.useState("");
  const [showLoader, setShowLoader] = React.useState(false);
  const [fadeOut, setFadeOut] = React.useState(false);
  const fullText = "DevStream";

  React.useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowLoader(true);

        // Start redirect countdown after typing is complete
        setTimeout(() => {
          setFadeOut(true);
        }, 2000);

        setTimeout(() => {
          // Verificar se o usuário já tem um perfil
          const savedProfile = localStorage.getItem("userProfile");
          if (savedProfile) {
            try {
              const profile = JSON.parse(savedProfile);
              if (profile && profile.name && profile.name !== "Desenvolvedor") {
                // Se já tiver um perfil válido, redirecionar para a home
                window.location.href = "/nova-home";
              } else {
                // Se o perfil estiver incompleto, redirecionar para a configuração inicial
                window.location.href = "/configuracao-inicial";
              }
            } catch (error) {
              // Em caso de erro, redirecionar para a configuração inicial
              window.location.href = "/configuracao-inicial";
            }
          } else {
            // Se não tiver perfil, redirecionar para a configuração inicial
            window.location.href = "/configuracao-inicial";
          }
        }, 3000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div
      className={`min-h-screen w-full bg-[#121212] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="absolute -inset-20 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 flex items-center">
            <i className="fas fa-code text-purple-500 text-4xl mr-4"></i>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              {typedText}
              <span className="animate-blink text-white">|</span>
            </h1>
            <i className="fas fa-terminal text-blue-500 text-4xl ml-4"></i>
          </div>

          {showLoader && (
            <div className="mt-6 flex flex-col items-center">
              <div className="w-64 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-loading-bar"></div>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Carregando recursos...
              </p>
            </div>
          )}

          <div className="mt-16 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#333] animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {i === 1 && (
                  <i className="fas fa-dice text-purple-400 text-xl"></i>
                )}
                {i === 2 && (
                  <i className="fas fa-user-edit text-pink-400 text-xl"></i>
                )}
                {i === 3 && (
                  <i className="fas fa-store text-blue-400 text-xl"></i>
                )}
                {i === 4 && (
                  <i className="fas fa-plus text-green-400 text-xl"></i>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-[-80px] left-0 right-0">
            <p className="text-center text-gray-500 text-xs">
              © 2025 DevStream
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
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

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 h-16 bg-gradient-to-t from-purple-500 to-transparent opacity-20 animate-equalizer"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.8 + (i % 3) * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes loading-bar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes equalizer {
          0%, 100% { height: 8px; }
          50% { height: 16px; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-in-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-equalizer {
          animation: equalizer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;