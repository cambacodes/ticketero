"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

export type ImperativeHanldeFromDatePicker = {
  reset: () => void;
};
type DatePickerProps = {
  id: string;
  name: string;
  onChange?: (date: Date) => void;
  defaultValue?: Date;
  imparativeHandle?: React.RefObject<ImperativeHanldeFromDatePicker | null>;
};

export function DatePicker({
  id,
  name,
  onChange,
  defaultValue,
  imparativeHandle,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);

  React.useImperativeHandle(
    imparativeHandle,
    () => ({
      reset: () => {
        setDate(undefined);
      },
    }),
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleNoop = React.useCallback(() => {}, []);

  const formattedDateString = date ? format(date, "yyyy-MM-dd") : "";
  return (
    <div className="flex flex-col gap-3 w-full">
      <input
        type="datetime-local"
        value={date?.toISOString().slice(0, 16) ?? ""}
        name={name}
        id="deadline"
        className="hidden"
        onChange={handleNoop}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} name={id} asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {formattedDateString ? formattedDateString : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (!date) return;
              setDate(date);
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
