import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, Zap, Code, Type, Users, Bot } from "lucide-react";

interface MainMenuProps {
  onStartGame: (mode: 'normal' | 'coding') => void;
  onOpenSettings: () => void;
}

export const MainMenu = ({ onStartGame, onOpenSettings }: MainMenuProps) => {
  const [selectedMode, setSelectedMode] = useState<'normal' | 'coding'>('normal');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-star-move opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        {/* Game Title */}
        <div className="mb-12">
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow-pulse">
            TYPO TAC WORDS
          </h1>
          <p className="text-xl text-muted-foreground">
            The Ultimate Space Typing Battle Experience
          </p>
        </div>

        {/* Game Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`p-6 cursor-pointer transition-all hover:scale-105 ${
              selectedMode === 'normal' 
                ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary shadow-lg shadow-primary/25' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedMode('normal')}
          >
            <Type className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Normal Words</h3>
            <p className="text-muted-foreground">
              Type everyday words and phrases to improve your speed
            </p>
          </Card>

          <Card 
            className={`p-6 cursor-pointer transition-all hover:scale-105 ${
              selectedMode === 'coding' 
                ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary shadow-lg shadow-primary/25' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedMode('coding')}
          >
            <Code className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h3 className="text-2xl font-bold mb-2">Coding Mode</h3>
            <p className="text-muted-foreground">
              Practice with code snippets and programming syntax
            </p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => onStartGame(selectedMode)}
            size="lg"
            className="w-full max-w-md h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform shadow-lg shadow-primary/25"
          >
            <Zap className="w-6 h-6 mr-2" />
            Start New Game
          </Button>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary/10"
              disabled
            >
              <Bot className="w-5 h-5 mr-2" />
              vs Computer
            </Button>
            
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10"
              disabled
            >
              <Users className="w-5 h-5 mr-2" />
              vs Friends
            </Button>
          </div>

          <Button 
            variant="ghost" 
            onClick={onOpenSettings}
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings & Themes
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          🚀 Connect to Supabase for multiplayer features and progress saving
        </p>
      </div>
    </div>
  );
};