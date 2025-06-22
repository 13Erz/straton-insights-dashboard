import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FilterBar } from "@/components/FilterBar";
import { DataTable } from "@/components/DataTable";

const mockData = [
  {
    date: "2025-06-20",
    of: "OF-2025-001",
    article: "5001",
    designation: "Béton C30/37",
    quantitePrevue: 100,
    quantiteProduite: 98,
    rendement: 98,
    statut: "Terminé"
  },
  {
    date: "2025-06-21",
    of: "OF-2025-002",
    article: "5002",
    designation: "Mortier M5",
    quantitePrevue: 50,
    quantiteProduite: 52,
    rendement: 104,
    statut: "En cours"
  }
];

const filterFields = [
  {
    id: 'date_production',
    label: 'Date de production',
    type: 'range' as const,
  },
  {
    id: 'of',
    label: 'Ordre de fabrication',
    type: 'text' as const,
    placeholder: 'N° OF'
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
  { key: 'of', label: 'OF', type: 'text' as const },
  { key: 'article', label: 'Article', type: 'text' as const },
  { key: 'designation', label: 'Désignation', type: 'text' as const },
  { key: 'quantitePrevue', label: 'Qté Prévue', type: 'number' as const },
  { key: 'quantiteProduite', label: 'Qté Produite', type: 'number' as const },
  { key: 'rendement', label: 'Rendement (%)', type: 'number' as const },
  { key: 'statut', label: 'Statut', type: 'text' as const }
];

const ProductionJournal = () => {
  const [filteredData, setFilteredData] = useState(mockData);

  const handleApplyFilters = (filters: any) => {
    console.log("Filtres appliqués:", filters);
    setFilteredData(mockData);
  };

  return (
    <DashboardLayout title="Journal de Production">
      <div className="space-y-6 animate-fade-in">
        <FilterBar fields={filterFields} onApplyFilters={handleApplyFilters} />
        <DataTable 
          title="Journal de Production"
          columns={columns}
          data={filteredData}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProductionJournal;
