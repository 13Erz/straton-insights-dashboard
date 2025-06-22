import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FilterBar } from "@/components/FilterBar";
import { DataTable } from "@/components/DataTable";

const mockData = [
  {
    date: "2025-06-18",
    client: "2001",
    nomClient: "ENTREPRISE DURAND",
    bonLivraison: "BL-2025-001",
    article: "4001",
    designation: "Béton prêt à l'emploi",
    quantite: 35,
    montantTTC: 8750
  },
  {
    date: "2025-06-19",
    client: "2002",
    nomClient: "BATIMENT MODERNE",
    bonLivraison: "BL-2025-002",
    article: "4002",
    designation: "Mortier de pose",
    quantite: 20,
    montantTTC: 4200
  }
];

const filterFields = [
  {
    id: 'date_livraison',
    label: 'Date de livraison',
    type: 'range' as const,
  },
  {
    id: 'client',
    label: 'Client n°',
    type: 'range' as const,
    hasListButton: true
  },
  {
    id: 'article',
    label: 'Article n°',
    type: 'range' as const,
    hasListButton: true
  }
];

const columns = [
  { key: 'date', label: 'Date', type: 'date' as const },
  { key: 'client', label: 'Client', type: 'text' as const },
  { key: 'nomClient', label: 'Nom Client', type: 'text' as const },
  { key: 'bonLivraison', label: 'Bon Livraison', type: 'text' as const },
  { key: 'article', label: 'Article', type: 'text' as const },
  { key: 'designation', label: 'Désignation', type: 'text' as const },
  { key: 'quantite', label: 'Quantité', type: 'number' as const },
  { key: 'montantTTC', label: 'Montant TTC', type: 'currency' as const }
];

const VenteJournalLivraison = () => {
  const [filteredData, setFilteredData] = useState(mockData);

  const handleApplyFilters = (filters: any) => {
    console.log("Filtres appliqués:", filters);
    setFilteredData(mockData);
  };

  return (
    <DashboardLayout title="Journal Livraison">
      <div className="space-y-6 animate-fade-in">
        <FilterBar fields={filterFields} onApplyFilters={handleApplyFilters} />
        <DataTable 
          title="Journal des Livraisons"
          columns={columns}
          data={filteredData}
        />
      </div>
    </DashboardLayout>
  );
};

export default VenteJournalLivraison;
