
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search, List } from "lucide-react";

interface FilterBarProps {
  onApplyFilters: (filters: any) => void;
  fields: FilterField[];
}

interface FilterField {
  id: string;
  label: string;
  type: 'date' | 'text' | 'number' | 'range' | 'autocomplete';
  placeholder?: string;
  hasListButton?: boolean;
}

export function FilterBar({ onApplyFilters, fields }: FilterBarProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (fieldId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({});
    onApplyFilters({});
  };

  return (
    <Card className="straton-card mb-6">
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
              </Label>
              <div className="flex space-x-2">
                {field.type === 'range' ? (
                  <>
                    <Input
                      placeholder="De"
                      value={filters[`${field.id}_from`] || ''}
                      onChange={(e) => handleFilterChange(`${field.id}_from`, e.target.value)}
                      className="straton-input flex-1"
                    />
                    <Input
                      placeholder="À"
                      value={filters[`${field.id}_to`] || ''}
                      onChange={(e) => handleFilterChange(`${field.id}_to`, e.target.value)}
                      className="straton-input flex-1"
                    />
                  </>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                    placeholder={field.placeholder}
                    value={filters[field.id] || ''}
                    onChange={(e) => handleFilterChange(field.id, e.target.value)}
                    className="straton-input flex-1"
                  />
                )}
                {field.hasListButton && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-straton-accent text-straton-accent hover:bg-straton-accent hover:text-white"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="flex space-x-2">
            <Button onClick={handleApply} className="straton-button">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
