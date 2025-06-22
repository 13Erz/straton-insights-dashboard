
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FilterBar } from "@/components/FilterBar";
import { DataTable } from "@/components/DataTable";

const mockData = [
  {
    date: "2025-06-15",
    fournisseur: "1542",
    nomFournisseur: "SARL MARTIN",
    numeroFacture: "FAC-2025-001",
    montantHT: 10500,
    montantTVA: 2100,
    montantTTC: 12600,
    statut: "Validée"
  },
  {
    date: "2025-06-16",
    fournisseur: "1543",
    nomFournisseur: "CIMENTS DU NORD",
    numeroFacture: "FAC-2025-002",
    montantHT: 7500,
    montantTVA: 1500,
    montantTTC: 9000,
    statut: "En attente"
  }
];

const filterFields = [
  {
    id: 'date_facture',
    label: 'Date de facture',
    type: 'range' as const,
  },
  {
    id: 'fournisseur',
    label: 'Fournisseur n°',
    type: 'range' as const,
    hasListButton: true
  },
  {
    id: 'numero_facture',
    label: 'N° Facture',
    type: 'text' as const,
    placeholder: 'Numéro de facture'
  }
];

const columns = [
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'fournisseur', label: 'Fournisseur', type: 'text' },
  { key: 'nomFournisseur', label: 'Nom Fournisseur', type: 'text' },
  { key: 'numeroFacture', label: 'N° Facture', type: 'text' },
  { key: 'montantHT', label: 'Montant HT', type: 'currency' },
  { key: 'montantTVA', label: 'TVA', type: 'currency' },
  { key: 'montantTTC', label: 'Montant TTC', type: 'currency' },
  { key: 'statut', label: 'Statut', type: 'text' }
];

const AchatJournalFacture = () => {
  const [filteredData, setFilteredData] = useState(mockData);

  const handleApplyFilters = (filters: any) => {
    console.log("Filtres appliqués:", filters);
    setFilteredData(mockData);
  };

  return (
    <DashboardLayout title="Journal Facture Achat">
      <div className="space-y-6 animate-fade-in">
        <FilterBar fields={filterFields} onApplyFilters={handleApplyFilters} />
        <DataTable 
          title="Journal des Factures Achat"
          columns={columns}
          data={filteredData}
        />
      </div>
    </DashboardLayout>
  );
};

export default AchatJournalFacture;
