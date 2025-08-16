import { useState } from "react";
import { MainMenu } from "@/components/game/MainMenu";
import { GamePlay } from "@/components/game/GamePlay";
import { Settings } from "@/components/game/Settings";

type GameState = 'menu' | 'playing' | 'settings';
type GameMode = 'normal' | 'coding';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('normal');

  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleOpenSettings = () => {
    setGameState('settings');
  };

  const renderCurrentView = () => {
    switch (gameState) {
      case 'playing':
        return <GamePlay mode={gameMode} onBack={handleBackToMenu} />;
      case 'settings':
        return <Settings onBack={handleBackToMenu} />;
      default:
        return (
          <MainMenu 
            onStartGame={handleStartGame} 
            onOpenSettings={handleOpenSettings} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
    </div>
  );
};

export default Index;
