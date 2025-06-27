
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search, List } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface FilterBarProps {
  onApplyFilters: (filters: any) => void;
  fields: FilterField[];
}

interface FilterField {
  id: string;
  label: string;
  type: 'date' | 'text' | 'number' | 'range' | 'autocomplete' | 'daterange' | 'client';
  placeholder?: string;
  hasListButton?: boolean;
}

interface ClientSuggestion {
  id: string;
  name: string;
}

export function FilterBar({ onApplyFilters, fields }: FilterBarProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [clientSuggestions, setClientSuggestions] = useState<ClientSuggestion[]>([]);
  const [isSearchingClient, setIsSearchingClient] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFilterChange = (fieldId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleClientIdChange = async (value: string) => {
    handleFilterChange('client_id', value);
    
    if (value && value.length > 0) {
      try {
        const response = await fetch(`http://localhost:3000/clientbyid?id=${value}`);
        if (response.ok) {
          const client = await response.json();
          handleFilterChange('client_name', client.name || '');
        } else {
          handleFilterChange('client_name', '');
        }
      } catch (error) {
        console.error("Erreur lors de la recherche du client:", error);
        handleFilterChange('client_name', '');
      }
    } else {
      handleFilterChange('client_name', '');
    }
  };

  const handleClientNameChange = async (value: string) => {
    handleFilterChange('client_name', value);
    
    if (value && value.length >= 2) {
      setIsSearchingClient(true);
      try {
        const response = await fetch(`http://localhost:3000/clientauto?query=${encodeURIComponent(value)}`);
        if (response.ok) {
          const suggestions = await response.json();
          setClientSuggestions(suggestions);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Erreur lors de l'autocomplétion:", error);
        setClientSuggestions([]);
      } finally {
        setIsSearchingClient(false);
      }
    } else {
      setClientSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectClient = (client: ClientSuggestion) => {
    handleFilterChange('client_id', client.id);
    handleFilterChange('client_name', client.name);
    setShowSuggestions(false);
    setClientSuggestions([]);
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({});
    setClientSuggestions([]);
    setShowSuggestions(false);
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
              
              {field.type === 'daterange' ? (
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal straton-input",
                          !filters[`${field.id}_from`] && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {filters[`${field.id}_from`] ? format(new Date(filters[`${field.id}_from`]), "dd/MM/yyyy") : "Du"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filters[`${field.id}_from`] ? new Date(filters[`${field.id}_from`]) : undefined}
                        onSelect={(date) => handleFilterChange(`${field.id}_from`, date ? format(date, "yyyy-MM-dd") : '')}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal straton-input",
                          !filters[`${field.id}_to`] && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {filters[`${field.id}_to`] ? format(new Date(filters[`${field.id}_to`]), "dd/MM/yyyy") : "Au"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filters[`${field.id}_to`] ? new Date(filters[`${field.id}_to`]) : undefined}
                        onSelect={(date) => handleFilterChange(`${field.id}_to`, date ? format(date, "yyyy-MM-dd") : '')}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : field.type === 'client' ? (
                <div className="flex space-x-2">
                  <Input
                    placeholder="ID Client"
                    value={filters.client_id || ''}
                    onChange={(e) => handleClientIdChange(e.target.value)}
                    className="straton-input flex-1"
                  />
                  <div className="relative flex-1">
                    <Input
                      placeholder="Nom du client"
                      value={filters.client_name || ''}
                      onChange={(e) => handleClientNameChange(e.target.value)}
                      className="straton-input"
                    />
                    {showSuggestions && clientSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                        {clientSuggestions.map((client) => (
                          <div
                            key={client.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => selectClient(client)}
                          >
                            <div className="font-medium">{client.name}</div>
                            <div className="text-gray-500 text-xs">ID: {client.id}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : field.type === 'range' ? (
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
                <div className="flex space-x-2">
                  <Input
                    id={field.id}
                    type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                    placeholder={field.placeholder}
                    value={filters[field.id] || ''}
                    onChange={(e) => handleFilterChange(field.id, e.target.value)}
                    className="straton-input flex-1"
                  />
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
              )}
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
