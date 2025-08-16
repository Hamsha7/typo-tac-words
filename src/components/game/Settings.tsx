import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Volume2, VolumeX, Palette } from "lucide-react";

interface SettingsProps {
  onBack: () => void;
}

const THEMES = [
  { id: 'cosmic', name: 'Cosmic Blue', primary: '199 89% 48%', secondary: '263 70% 50%', accent: '142 76% 36%' },
  { id: 'neon', name: 'Neon Purple', primary: '280 100% 70%', secondary: '320 100% 60%', accent: '60 100% 50%' },
  { id: 'matrix', name: 'Matrix Green', primary: '120 100% 50%', secondary: '160 100% 40%', accent: '200 100% 60%' },
  { id: 'sunset', name: 'Sunset Orange', primary: '30 100% 60%', secondary: '350 100% 60%', accent: '270 100% 70%' },
  { id: 'ocean', name: 'Deep Ocean', primary: '200 100% 40%', secondary: '220 100% 30%', accent: '180 100% 50%' }
];

export const Settings = ({ onBack }: SettingsProps) => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState([70]);
  const [selectedTheme, setSelectedTheme] = useState('cosmic');

  const applyTheme = (theme: typeof THEMES[0]) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--primary-glow', theme.primary.replace('48%', '65%'));
    root.style.setProperty('--secondary-glow', theme.secondary.replace('50%', '75%'));
    root.style.setProperty('--accent-glow', theme.accent.replace('36%', '60%'));
    setSelectedTheme(theme.id);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-star-move opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        <div className="space-y-8">
          {/* Audio Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {musicEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              Audio Settings
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Background Music</h3>
                  <p className="text-sm text-muted-foreground">Enable space ambient music during gameplay</p>
                </div>
                <Switch
                  checked={musicEnabled}
                  onCheckedChange={setMusicEnabled}
                />
              </div>

              {musicEnabled && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Music Volume</h3>
                    <span className="text-sm text-muted-foreground">{musicVolume[0]}%</span>
                  </div>
                  <Slider
                    value={musicVolume}
                    onValueChange={setMusicVolume}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Theme Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Palette className="w-6 h-6" />
              Visual Themes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    selectedTheme === theme.id 
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => applyTheme(theme)}
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold">{theme.name}</h3>
                    
                    {/* Theme Preview */}
                    <div className="flex gap-2">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: `hsl(${theme.primary})` }}
                      />
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: `hsl(${theme.secondary})` }}
                      />
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: `hsl(${theme.accent})` }}
                      />
                    </div>

                    {selectedTheme === theme.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Game Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Game Settings</h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>🎮 Difficulty levels - Coming soon</p>
              <p>⚡ Custom word lists - Coming soon</p>
              <p>🏆 Leaderboards - Connect to Supabase to enable</p>
              <p>👥 Multiplayer modes - Connect to Supabase to enable</p>
            </div>
          </Card>

          {/* Connect Notice */}
          <Card className="p-6 border-accent/50 bg-accent/5">
            <h3 className="font-bold text-accent mb-2">Unlock More Features</h3>
            <p className="text-sm text-muted-foreground">
              Connect to Supabase to enable user accounts, progress saving, leaderboards, and multiplayer features.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};