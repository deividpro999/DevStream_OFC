"use client";
import React from "react";

function MainComponent() {
  const router = useRouter();

  React.useEffect(() => {
    // Redirecionar diretamente para a página de login
    router.push("/account/signin?callbackUrl=/configuracao-inicial-auth");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl p-8 shadow-xl border border-[#333] relative z-10 animate-fadeIn">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin mb-4"></div>
          <h1 className="mb-2 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            DevStream
          </h1>
          <p className="text-center text-gray-400 mb-4">
            Redirecionando para login...
          </p>
          <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-progress"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-progress {
          animation: progress 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;