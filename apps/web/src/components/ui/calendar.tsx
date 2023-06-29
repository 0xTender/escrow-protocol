import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@app/utils";
import { buttonVariants } from "@app/components/ui/button";
import { Input } from "./input";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  handleChange: (e: Date) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  handleChange,
  ...props
}: CalendarProps) {
  const [timeValue, setTimeValue] = React.useState<string>("00:00");

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      footer={
        <>
          <p>
            Pick a time:{" "}
            <Input
              type="time"
              value={timeValue}
              onChange={(e) => {
                const time = e.target.value;
                if (!selected) {
                  setTimeValue(time);
                  return;
                }
                const [hours, minutes] = time
                  .split(":")
                  .map((str) => parseInt(str, 10));

                const newSelectedDate = new Date(
                  (selected as Date).getFullYear(),
                  (selected as Date).getMonth(),
                  (selected as Date).getDate(),
                  hours,
                  minutes
                );
                setTimeValue(time);
                handleChange(newSelectedDate);
              }}
            />
          </p>
          <p>Selected date: {selected ? selected.toLocaleString() : "None"}</p>
        </>
      }
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
