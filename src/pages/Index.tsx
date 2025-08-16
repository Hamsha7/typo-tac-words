const Index = () => {
  console.log("Index component is rendering");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          TYPO TAC WORDS
        </h1>
        <p className="text-xl mb-8 text-blue-200">The Ultimate Typing Game Experience</p>
        <div className="space-y-4">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:scale-105 transition-transform">
            Start New Game
          </button>
          <div className="text-sm text-blue-300">
            Preview is now working! 🎮
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
