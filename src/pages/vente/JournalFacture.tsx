
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FilterBar } from "@/components/FilterBar";
import { DataTable } from "@/components/DataTable";
import { toast } from "@/hooks/use-toast";

export default function JournalFacture() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);

  const filterFields = [
    {
      id: "date",
      label: "Date",
      type: "range" as const,
      placeholder: "Sélectionner les dates"
    },
    {
      id: "client",
      label: "Client",
      type: "range" as const,
      placeholder: "Numéro client"
    }
  ];

  const handleApplyFilters = async (filters: any) => {
    console.log("Filtres reçus:", filters);
    
    // Validation des champs requis
    if (!filters.date_from || !filters.date_to) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une période de dates",
        variant: "destructive",
      });
      return;
    }

    if (!filters.client_from || !filters.client_to) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une plage de clients",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = {
        dateDebut: filters.date_from,
        dateFin: filters.date_to,
        clientDebut: filters.client_from,
        clientFin: filters.client_to
      };

      console.log("Envoi de la requête POST:", requestBody);

      const response = await fetch("http://localhost:3000/factures-ventes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Réponse API:", result);

      if (Array.isArray(result) && result.length > 0) {
        // Création dynamique des colonnes à partir du premier objet
        const firstItem = result[0];
        const dynamicColumns = Object.keys(firstItem).map(key => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
          type: typeof firstItem[key] === 'number' && key.includes('montant') ? 'currency' as const : 
                typeof firstItem[key] === 'number' ? 'number' as const :
                key.toLowerCase().includes('date') ? 'date' as const : 'text' as const
        }));

        setColumns(dynamicColumns);
        setData(result);
        
        toast({
          title: "Succès",
          description: `${result.length} facture(s) trouvée(s)`,
        });
      } else {
        setColumns([]);
        setData([]);
        toast({
          title: "Aucune donnée",
          description: "Aucune facture trouvée pour ces critères",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
      setColumns([]);
      setData([]);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la récupération des données",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Journal Facture Vente">
      <div className="space-y-6">
        <FilterBar 
          onApplyFilters={handleApplyFilters} 
          fields={filterFields}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-muted-foreground">Chargement des données...</div>
          </div>
        ) : (
          <DataTable
            title="Factures de Vente"
            columns={columns}
            data={data}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
