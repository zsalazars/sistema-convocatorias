import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/libs/utils";

interface DatePickerProps {
  selectedDate: Date | null; // Cambiar a `Date | null` para que se pueda manejar la ausencia de fecha
  onDateSelect: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date || null);
  };

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selectedDate ? (
              format(selectedDate, "PPP", { locale: es })
            ) : (
              <span>-- Elegir fecha --</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate || undefined} // Asegurar que se pase `undefined` si no hay fecha seleccionada
            onSelect={handleDateSelect} // Usar la función ajustada
            initialFocus
            locale={es}
          />
        </PopoverContent>
      </Popover>
  );
};

export default DatePicker;
