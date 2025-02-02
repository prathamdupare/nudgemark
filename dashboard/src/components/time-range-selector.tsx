import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeRangeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TimeRangeSelector({
  value,
  onValueChange,
}: TimeRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily Reminders</SelectItem>
        <SelectItem value="weekly">Weekly Reminders</SelectItem>
        <SelectItem value="monthly">Monthly Reminders</SelectItem>
        <SelectItem value="custom">Custom Range</SelectItem>
      </SelectContent>
    </Select>
  );
}
