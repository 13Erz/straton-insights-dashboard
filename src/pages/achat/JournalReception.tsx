
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FilterBar } from "@/components/FilterBar";
import { DataTable } from "@/components/DataTable";

const mockData = [
  {
    date: "2025-06-10",
    fournisseur: "1542",
    nomFournisseur: "SARL MARTIN",
    article: "3001",
    designation: "Béton C25/30",
    quantite: 50,
    montantTTC: 12500
  },
  {
    date: "2025-06-11",
    fournisseur: "1543",
    nomFournisseur: "CIMENTS DU NORD",
    article: "3002",
    designation: "Ciment CEM II 32.5",
    quantite: 30,
    montantTTC: 8800
  },
  {
    date: "2025-06-12",
    fournisseur: "1544",
    nomFournisseur: "GRANULATS SUD",
    article: "3003",
    designation: "Sable 0/4",
    quantite: 80,
    montantTTC: 4200
  },
  {
    date: "2025-06-13",
    fournisseur: "1542",
    nomFournisseur: "SARL MARTIN",
    article: "3004",
    designation: "Graviers 4/20",
    quantite: 25,
    montantTTC: 6750
  }
];

const filterFields = [
  {
    id: 'date_reception',
    label: 'Date de réception',
    type: 'range' as const,
    placeholder: 'Sélectionner une période'
  },
  {
    id: 'fournisseur',
    label: 'Fournisseur n°',
    type: 'range' as const,
    placeholder: 'N° fournisseur',
    hasListButton: true
  },
  {
    id: 'article',
    label: 'Article n°',
    type: 'range' as const,
    placeholder: 'N° article',
    hasListButton: true
  }
];

const columns = [
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'fournisseur', label: 'Fournisseur', type: 'text' },
  { key: 'nomFournisseur', label: 'Nom Fournisseur', type: 'text' },
  { key: 'article', label: 'Article', type: 'text' },
  { key: 'designation', label: 'Désignation', type: 'text' },
  { key: 'quantite', label: 'Quantité', type: 'number' },
  { key: 'montantTTC', label: 'Montant TTC', type: 'currency' }
];

const AchatJournalReception = () => {
  const [filteredData, setFilteredData] = useState(mockData);

  const handleApplyFilters = (filters: any) => {
    console.log("Filtres appliqués:", filters);
    // Ici on appellerait l'API avec les filtres
    setFilteredData(mockData);
  };

  return (
    <DashboardLayout title="Journal Réception">
      <div className="space-y-6 animate-fade-in">
        <FilterBar fields={filterFields} onApplyFilters={handleApplyFilters} />
        <DataTable 
          title="Journal des Réceptions"
          columns={columns}
          data={filteredData}
        />
      </div>
    </DashboardLayout>
  );
};

export default AchatJournalReception;
