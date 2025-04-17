"use client";
import React from "react";




function MainComponent() {
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedProfile, setEditedProfile] = React.useState({});
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("posts");
  const [showFollowersModal, setShowFollowersModal] = React.useState(false);
  const [showFollowingModal, setShowFollowingModal] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("userId") || 1;
        
        const profileData = {
          id: userId,
          name: "DevStreamer",
          username: "devstreamer", 
          bio: "Desenvolvedor e streamer de conteúdo tech. Apaixonado por programação e jogos.",
          avatar: "/avatar1.png",
          coverPhoto: "/cover-photo.jpg",
          coins: 1500,
          followers: 128,
          following: 75,
          posts: 42,
          createdAt: "2023-01-15T00:00:00.000Z",
          social: {
            twitter: "@devstreamer",
            github: "devstreamer",
            twitch: "devstreamer"
          }
        };
        
        setProfile(profileData);
        
        const followersData = [
          { id: 2, name: "Ana Dev", username: "anadev", avatar: "/avatar2.png", isFollowing: true },
          { id: 3, name: "Carlos Code", username: "carloscode", avatar: "/avatar3.png", isFollowing: false },
          { id: 4, name: "Julia JS", username: "juliajs", avatar: "/avatar4.png", isFollowing: true },
          { id: 5, name: "Pedro Python", username: "pedropy", avatar: "/avatar5.png", isFollowing: false },
          { id: 6, name: "Mariana Mobile", username: "marimobile", avatar: "/avatar6.png", isFollowing: true }
        ];
        
        const followingData = [
          { id: 7, name: "Lucas Linux", username: "lucaslinux", avatar: "/avatar7.png" },
          { id: 8, name: "Fernanda Frontend", username: "fefrontend", avatar: "/avatar8.png" },
          { id: 9, name: "Rafael React", username: "rafareact", avatar: "/avatar9.png" },
          { id: 10, name: "Camila CSS", username: "camilacss", avatar: "/avatar10.png" },
          { id: 11, name: "Bruno Backend", username: "brunoback", avatar: "/avatar11.png" }
        ];
        
        setFollowers(followersData);
        setFollowing(followingData);
        setEditedProfile(profileData);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError("Não foi possível carregar o perfil. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(editedProfile);
      setIsEditing(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError("Não foi possível salvar as alterações. Tente novamente mais tarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditedProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFollow = async (userId, isFollowing) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isFollowing) {
        setFollowers(prev => 
          prev.map(follower => 
            follower.id === userId 
              ? { ...follower, isFollowing: false } 
              : follower
          )
        );
      } else {
        setFollowers(prev => 
          prev.map(follower => 
            follower.id === userId 
              ? { ...follower, isFollowing: true } 
              : follower
          )
        );
      }
    } catch (err) {
      console.error("Erro ao seguir/deixar de seguir:", err);
      setError("Não foi possível realizar esta ação. Tente novamente mais tarde.");
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFollowing(prev => prev.filter(user => user.id !== userId));
      
      if (profile) {
        setProfile(prev => ({
          ...prev,
          following: prev.following - 1
        }));
      }
    } catch (err) {
      console.error("Erro ao deixar de seguir:", err);
      setError("Não foi possível realizar esta ação. Tente novamente mais tarde.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xl">Carregando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
        <div className="bg-red-900 bg-opacity-30 p-6 rounded-lg border border-red-800 max-w-md text-center">
          <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <h2 className="text-xl font-bold mb-2">Erro</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            DevStream
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

      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-16 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10"></div>
          
          <div className="absolute -bottom-12 left-6 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#121212] overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
            <img 
              src={profile.avatar || "https://via.placeholder.com/150"} 
              alt={`Avatar de ${profile.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          
          {!isEditing && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleEditProfile}
                className="bg-[#00000060] hover:bg-[#00000080] text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <i className="fas fa-edit mr-2"></i>
                Editar Perfil
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          {isEditing ? (
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
              <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nome de usuário
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editedProfile.username}
                    onChange={handleInputChange}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              
              <h3 className="text-lg font-bold mb-2">Redes Sociais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <i className="fab fa-twitter text-blue-400 mr-2"></i>
                    Twitter
                  </label>
                  <input
                    type="text"
                    name="social.twitter"
                    value={editedProfile.social?.twitter || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <i className="fab fa-github text-gray-400 mr-2"></i>
                    GitHub
                  </label>
                  <input
                    type="text"
                    name="social.github"
                    value={editedProfile.social?.github || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <i className="fab fa-twitch text-purple-400 mr-2"></i>
                    Twitch
                  </label>
                  <input
                    type="text"
                    name="social.twitch"
                    value={editedProfile.social?.twitch || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-[#333] hover:bg-[#444] text-white py-2 px-4 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="pl-36 md:pl-40">
                <h1 className="text-2xl md:text-3xl font-bold">{profile.name}</h1>
                <p className="text-gray-400">@{profile.username}</p>
              </div>
              
              <div className="mt-4 bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
                <p className="text-gray-300 mb-6">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {profile.social?.twitter && (
                    <a href={`https://twitter.com/${profile.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      <i className="fab fa-twitter mr-2"></i>
                      {profile.social.twitter}
                    </a>
                  )}
                  
                  {profile.social?.github && (
                    <a href={`https://github.com/${profile.social.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-gray-300 transition-colors">
                      <i className="fab fa-github mr-2"></i>
                      {profile.social.github}
                    </a>
                  )}
                  
                  {profile.social?.twitch && (
                    <a href={`https://twitch.tv/${profile.social.twitch}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                      <i className="fab fa-twitch mr-2"></i>
                      {profile.social.twitch}
                    </a>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-3">
                      <i className="fas fa-coins text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Moedas</p>
                      <p className="font-bold text-yellow-400">{profile.coins}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowFollowersModal(true)}
                    className="flex items-center hover:bg-[#2a2a2a] p-2 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                      <i className="fas fa-users text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Seguidores</p>
                      <p className="font-bold">{profile.followers}</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setShowFollowingModal(true)}
                    className="flex items-center hover:bg-[#2a2a2a] p-2 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3">
                      <i className="fas fa-user-friends text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Seguindo</p>
                      <p className="font-bold">{profile.following}</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-pink-800 flex items-center justify-center mr-3">
                      <i className="fas fa-calendar-alt text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Membro desde</p>
                      <p className="font-bold">{new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] mb-8">
          <div className="flex border-b border-[#333]">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === "posts" ? "bg-[#2a2a2a] text-purple-400 border-b-2 border-purple-500" : "text-gray-400 hover:bg-[#222]"}`}
            >
              <i className="fas fa-stream mr-2"></i>
              Posts
            </button>
            <button
              onClick={() => setActiveTab("characters")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === "characters" ? "bg-[#2a2a2a] text-purple-400 border-b-2 border-purple-500" : "text-gray-400 hover:bg-[#222]"}`}
            >
              <i className="fas fa-user-circle mr-2"></i>
              Personagens
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === "collections" ? "bg-[#2a2a2a] text-purple-400 border-b-2 border-purple-500" : "text-gray-400 hover:bg-[#222]"}`}
            >
              <i className="fas fa-layer-group mr-2"></i>
              Coleções
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === "posts" && (
              <div className="text-center py-12">
                <i className="fas fa-stream text-5xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Nenhum post ainda</h3>
                <p className="text-gray-400 mb-6">Compartilhe suas criações e conquistas com a comunidade!</p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-colors">
                  <i className="fas fa-plus mr-2"></i>
                  Criar Novo Post
                </button>
              </div>
            )}
            
            {activeTab === "characters" && (
              <div className="text-center py-12">
                <i className="fas fa-user-circle text-5xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Nenhum personagem criado</h3>
                <p className="text-gray-400 mb-6">Crie seu primeiro VTuber no editor de personagens!</p>
                <a 
                  href="/editor"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
                >
                  <i className="fas fa-user-edit mr-2"></i>
                  Criar Personagem
                </a>
              </div>
            )}
            
            {activeTab === "collections" && (
              <div className="text-center py-12">
                <i className="fas fa-layer-group text-5xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Nenhuma coleção ainda</h3>
                <p className="text-gray-400 mb-6">Comece a colecionar itens através do sistema de gacha!</p>
                <a 
                  href="/gacha"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
                >
                  <i className="fas fa-dice mr-2"></i>
                  Jogar Gacha
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {showFollowersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1a1a1a] rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <h2 className="text-xl font-bold">Seguidores</h2>
              <button
                onClick={() => setShowFollowersModal(false)}
                className="w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center"
              >
                <i className="fas fa-times text-gray-300"></i>
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              {followers.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-users text-4xl text-gray-600 mb-3"></i>
                  <p className="text-gray-400">Nenhum seguidor ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {followers.map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <img 
                            src={follower.avatar || "https://via.placeholder.com/150"} 
                            alt={`Avatar de ${follower.name}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-bold">{follower.name}</p>
                          <p className="text-sm text-gray-400">@{follower.username}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleFollow(follower.id, follower.isFollowing)}
                        className={`px-4 py-1 rounded-full text-sm ${follower.isFollowing ? 'bg-[#333] hover:bg-[#444] text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'}`}
                      >
                        {follower.isFollowing ? 'Seguindo' : 'Seguir'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showFollowingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1a1a1a] rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <h2 className="text-xl font-bold">Seguindo</h2>
              <button
                onClick={() => setShowFollowingModal(false)}
                className="w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center"
              >
                <i className="fas fa-times text-gray-300"></i>
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              {following.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-user-friends text-4xl text-gray-600 mb-3"></i>
                  <p className="text-gray-400">Você não está seguindo ninguém ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {following.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <img 
                            src={user.avatar || "https"} /></div></div></div>))}</div>)}</div></div></div>)}</div>)}
    </div>
  );
</div>

export default MainComponent;