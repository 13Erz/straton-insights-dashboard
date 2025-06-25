import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, Users, Warehouse, FileSpreadsheet, FileDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Données solde client
const soldeClientData = [
  { name: "Client A", value: 45000 },
  { name: "Client B", value: 32000 },
  { name: "Client C", value: 28000 },
  { name: "Client D", value: 18000 },
  { name: "Client E", value: 12000 },
];

// Données ventes par produit (3 mois)
const ventesProduitData = [
  { 
    produit: "Béton C30/37", 
    mai: 85000, 
    avril: 78000, 
    mars: 82000 
  },
  { 
    produit: "Mortier M5", 
    mai: 42000, 
    avril: 38000, 
    mars: 45000 
  },
  { 
    produit: "Granulats 0/4", 
    mai: 28000, 
    avril: 32000, 
    mars: 29000 
  },
  { 
    produit: "Sable lavé", 
    mai: 35000, 
    avril: 31000, 
    mars: 33000 
  },
];

// Données ventes par commercial (3 mois)
const ventesCommercialData = [
  { 
    commercial: "Martin L.", 
    mai: 95000, 
    avril: 87000, 
    mars: 92000 
  },
  { 
    commercial: "Sophie D.", 
    mai: 78000, 
    avril: 82000, 
    mars: 76000 
  },
  { 
    commercial: "Thomas R.", 
    mai: 65000, 
    avril: 58000, 
    mars: 71000 
  },
  { 
    commercial: "Claire M.", 
    mai: 52000, 
    avril: 49000, 
    mars: 54000 
  },
];

const COLORS = ['#8B5CF6', '#EC4899', '#DC2626', '#FFFFFF'];

const Dashboard = () => {
  const [caActuel, setCaActuel] = useState<number | null>(null);
  const [caEvolutionData, setCaEvolutionData] = useState<any[]>([]);
  const [caLoading, setCaLoading] = useState(true);
  const [caError, setCaError] = useState<string | null>(null);
  const [graphLoading, setGraphLoading] = useState(true);
  const [graphError, setGraphError] = useState<string | null>(null);

  // Récupération du CA mensuel actuel
  useEffect(() => {
    const fetchCAActuel = async () => {
      try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const response = await fetch('http://localhost:3000/chiffredaffaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            annee: currentYear,
            mois: currentMonth
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du CA');
        }

        const data = await response.json();
        setCaActuel(typeof data === 'number' ? data : parseFloat(data));
        setCaError(null);
      } catch (error) {
        console.error('Erreur CA:', error);
        setCaError('Données indisponibles');
      } finally {
        setCaLoading(false);
      }
    };

    fetchCAActuel();
  }, []);

  // Récupération des données d'évolution du CA
  useEffect(() => {
    const fetchGraphCA = async () => {
      try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const response = await fetch('http://localhost:3000/graphchiffredaffaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            annee: currentYear,
            mois: currentMonth
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données graphique');
        }

        const data = await response.json();
        setCaEvolutionData(Array.isArray(data) ? data : []);
        setGraphError(null);
      } catch (error) {
        console.error('Erreur graphique CA:', error);
        setGraphError('Données indisponibles');
      } finally {
        setGraphLoading(false);
      }
    };

    fetchGraphCA();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount) + ' MAD';
  };

  const handleExportExcel = () => {
    toast({
      title: "Export Excel",
      description: "Le tableau de bord est en cours d'export...",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF", 
      description: "Le tableau de bord est en cours d'export...",
    });
  };

  return (
    <DashboardLayout title="Tableau de bord">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CA Mensuel</CardTitle>
              <TrendingUp className="h-5 w-5 text-straton-accent" />
            </CardHeader>
            <CardContent>
              {caLoading ? (
                <div className="text-2xl font-bold text-straton-accent">Chargement...</div>
              ) : caError ? (
                <div className="text-2xl font-bold text-red-500">Données indisponibles</div>
              ) : (
                <div className="text-2xl font-bold text-straton-accent">
                  {caActuel ? formatCurrency(caActuel) : 'N/A'}
                </div>
              )}
              <p className="text-xs text-muted-foreground">Mois en cours</p>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Production</CardTitle>
              <Package className="h-5 w-5 text-straton-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">2 840 T</div>
              <p className="text-xs text-muted-foreground">+8% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consommation</CardTitle>
              <Users className="h-5 w-5 text-straton-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">186</div>
              <p className="text-xs text-muted-foreground">+5% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
              <Warehouse className="h-5 w-5 text-straton-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">8 420 T</div>
              <p className="text-xs text-muted-foreground">-2% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution CA */}
          <Card className="straton-card">
            <CardHeader>
              <CardTitle className="font-heading">Évolution du chiffre d'affaires</CardTitle>
            </CardHeader>
            <CardContent>
              {graphLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Chargement des données...</p>
                </div>
              ) : graphError ? (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-red-500">Données indisponibles</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={caEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader>
              <CardTitle className="font-heading">Solde Client</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={soldeClientData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8B5CF6"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {soldeClientData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader>
              <CardTitle className="font-heading">Ventes par Produit</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ventesProduitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="produit" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="mai" fill="#8B5CF6" name="Mai" />
                  <Bar dataKey="avril" fill="#EC4899" name="Avril" />
                  <Bar dataKey="mars" fill="#DC2626" name="Mars" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader>
              <CardTitle className="font-heading">Ventes par Commercial</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ventesCommercialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="commercial" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="mai" fill="#8B5CF6" name="Mai" />
                  <Bar dataKey="avril" fill="#EC4899" name="Avril" />
                  <Bar dataKey="mars" fill="#DC2626" name="Mars" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="straton-card">
          <CardHeader>
            <CardTitle className="font-heading">Export du tableau de bord</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                onClick={handleExportExcel}
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exporter en Excel
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportPDF}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Exporter en PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
