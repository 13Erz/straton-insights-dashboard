
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const salesData = [
  { name: "Jan", value: 12500 },
  { name: "Fév", value: 15800 },
  { name: "Mar", value: 13200 },
  { name: "Avr", value: 18500 },
  { name: "Mai", value: 22100 },
  { name: "Jun", value: 19800 },
];

const productionData = [
  { name: "Prod A", value: 2400 },
  { name: "Prod B", value: 1398 },
  { name: "Prod C", value: 9800 },
  { name: "Prod D", value: 3908 },
];

const COLORS = ['#8B5CF6', '#06D6A0', '#FFB627', '#F72585'];

const Dashboard = () => {
  return (
    <DashboardLayout title="Tableau de bord">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CA Mensuel</CardTitle>
              <span className="text-2xl">💰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">142 500 €</div>
              <p className="text-xs text-muted-foreground">+12% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Production</CardTitle>
              <span className="text-2xl">🏭</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">2 840 T</div>
              <p className="text-xs text-muted-foreground">+8% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <span className="text-2xl">📦</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">186</div>
              <p className="text-xs text-muted-foreground">+5% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-straton-accent">8 420 T</div>
              <p className="text-xs text-muted-foreground">-2% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="straton-card">
            <CardHeader>
              <CardTitle className="font-heading">Évolution des Ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
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
            </CardContent>
          </Card>

          <Card className="straton-card">
            <CardHeader>
              <CardTitle className="font-heading">Répartition Production</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8B5CF6"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productionData.map((entry, index) => (
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
        </div>

        {/* Recent Activity */}
        <Card className="straton-card">
          <CardHeader>
            <CardTitle className="font-heading">Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10:30", action: "Nouvelle réception", details: "Fournisseur 1542 - 50T Produit A" },
                { time: "09:15", action: "Livraison expédiée", details: "Client 2001 - Commande #12845" },
                { time: "08:45", action: "Production terminée", details: "Lot P-2025-001 - 125T" },
                { time: "08:00", action: "Pesée effectuée", details: "Véhicule V001 - 38.5T" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50">
                  <div className="text-sm font-medium text-straton-accent min-w-[60px]">
                    {activity.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
