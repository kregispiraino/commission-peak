import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: Array<{ id: string; label: string }>;
  searchPlaceholder?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  placeholder,
  items,
  searchPlaceholder = "Buscar..."
}: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-background z-50">
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
          onClick={(e) => e.stopPropagation()}
        />
        <ScrollArea className="h-32">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground text-center">
              Nenhum item encontrado
            </div>
          )}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
