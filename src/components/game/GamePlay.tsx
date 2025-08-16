import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Target, Zap, Clock } from "lucide-react";

interface Word {
  id: string;
  text: string;
  x: number;
  y: number;
  speed: number;
}

interface GamePlayProps {
  mode: 'normal' | 'coding';
  onBack: () => void;
}

const NORMAL_WORDS = [
  'space', 'rocket', 'galaxy', 'planet', 'star', 'comet', 'meteor', 'universe',
  'nebula', 'cosmos', 'orbit', 'lunar', 'solar', 'asteroid', 'satellite',
  'telescope', 'mission', 'launch', 'explore', 'discovery'
];

const CODING_WORDS = [
  'function', 'variable', 'const', 'let', 'return', 'if', 'else', 'for',
  'while', 'array', 'object', 'class', 'import', 'export', 'async', 'await',
  'promise', 'callback', 'closure', 'prototype'
];

export const GamePlay = ({ mode, onBack }: GamePlayProps) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [hitAnimations, setHitAnimations] = useState<{id: string, x: number, y: number}[]>([]);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const wordSpawnTimer = useRef<NodeJS.Timeout>();
  const gameTimer = useRef<NodeJS.Timeout>();

  const wordList = mode === 'coding' ? CODING_WORDS : NORMAL_WORDS;

  const spawnWord = useCallback(() => {
    if (!gameActive || !gameAreaRef.current) return;

    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const newWord: Word = {
      id: Math.random().toString(),
      text: wordList[Math.floor(Math.random() * wordList.length)],
      x: Math.random() * (gameArea.width - 120),
      y: -50,
      speed: 1 + Math.random() * 2
    };

    setWords(prev => [...prev, newWord]);
  }, [gameActive, wordList]);

  const checkTypedWord = useCallback(() => {
    const typedWord = currentInput.trim().toLowerCase();
    if (!typedWord) return;

    setWords(prev => {
      const hitWord = prev.find(word => word.text.toLowerCase() === typedWord);
      if (hitWord) {
        // Add hit animation
        setHitAnimations(prevHits => [...prevHits, { 
          id: Math.random().toString(), 
          x: hitWord.x + 60, 
          y: hitWord.y + 20 
        }]);
        
        // Remove animation after delay
        setTimeout(() => {
          setHitAnimations(prevHits => prevHits.filter(hit => hit.id !== hitWord.id));
        }, 600);

        setScore(prevScore => prevScore + typedWord.length * 10);
        setCurrentInput('');
        return prev.filter(word => word.id !== hitWord.id);
      }
      return prev;
    });
  }, [currentInput]);

  // Game loop for word movement
  useEffect(() => {
    if (!gameActive) return;

    const moveWords = () => {
      setWords(prev => prev
        .map(word => ({ ...word, y: word.y + word.speed }))
        .filter(word => word.y < window.innerHeight + 100)
      );
    };

    const interval = setInterval(moveWords, 16); // ~60fps
    return () => clearInterval(interval);
  }, [gameActive]);

  // Spawn words periodically
  useEffect(() => {
    if (!gameActive) return;

    wordSpawnTimer.current = setInterval(spawnWord, 2000);
    return () => {
      if (wordSpawnTimer.current) clearInterval(wordSpawnTimer.current);
    };
  }, [spawnWord, gameActive]);

  // Game timer
  useEffect(() => {
    if (!gameActive) return;

    gameTimer.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (gameTimer.current) clearInterval(gameTimer.current);
    };
  }, [gameActive]);

  // Handle input submission
  useEffect(() => {
    checkTypedWord();
  }, [currentInput, checkTypedWord]);

  const restartGame = () => {
    setWords([]);
    setCurrentInput('');
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setHitAnimations([]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-star-move opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Game UI */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
          
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              <span className="font-bold text-lg">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="font-bold text-lg">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="relative h-[70vh] border border-border rounded-lg overflow-hidden"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)' }}
        >
          {/* Floating Words */}
          {words.map(word => (
            <div
              key={word.id}
              className="absolute px-3 py-2 bg-card border border-primary rounded-lg text-primary font-mono text-lg animate-float-down"
              style={{ 
                left: word.x, 
                top: word.y,
                transform: `translateY(${word.y}px)`,
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
              }}
            >
              {word.text}
            </div>
          ))}

          {/* Hit Animations */}
          {hitAnimations.map(hit => (
            <div
              key={hit.id}
              className="absolute text-accent font-bold text-2xl animate-explosion pointer-events-none"
              style={{ left: hit.x, top: hit.y }}
            >
              <Zap className="w-8 h-8" />
            </div>
          ))}

          {/* Game Over Overlay */}
          {!gameActive && (
            <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
              <Card className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
                <p className="text-xl mb-2">Final Score: <span className="text-accent font-bold">{score}</span></p>
                <p className="text-muted-foreground mb-6">
                  Mode: {mode === 'coding' ? 'Coding' : 'Normal'} Words
                </p>
                <div className="space-y-3">
                  <Button onClick={restartGame} className="w-full">
                    Play Again
                  </Button>
                  <Button variant="outline" onClick={onBack} className="w-full">
                    Back to Menu
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="mt-4">
          <Input
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type the words as they fall..."
            className="w-full h-14 text-lg text-center font-mono bg-card border-primary"
            autoFocus
            disabled={!gameActive}
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Type words and press Enter to shoot them down!
          </p>
        </div>
      </div>
    </div>
  );
};