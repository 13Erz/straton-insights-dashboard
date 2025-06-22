
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Connexion réussie",
      description: "Redirection vers le tableau de bord...",
    });
    navigate("/dashboard");
  };

  const handleDevLogin = () => {
    toast({
      title: "Mode développeur",
      description: "Connexion directe activée",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-straton-dark">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-straton-light mb-2">
            STRATON
          </h1>
          <p className="text-straton-accent text-lg">
            Visualisez vos données métiers. En toute sécurité.
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-center">
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@entreprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="straton-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="straton-input"
                />
              </div>
              <Button type="submit" className="w-full straton-button">
                Se connecter
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleDevLogin}
                className="w-full border-straton-accent text-straton-accent hover:bg-straton-accent hover:text-white"
              >
                Connexion directe (mode dev)
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="text-center mt-8 text-muted-foreground text-sm">
          STRATON © 2025
        </footer>
      </div>
    </div>
  );
};

export default Login;
