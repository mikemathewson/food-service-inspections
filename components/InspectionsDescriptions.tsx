import type { Inspection } from "../types";
import { useState, useEffect } from "react";
import Card from "./Card";
import Switch from "../components/Switch";
import {
  CheckCircleIcon,
  ExclamationIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

type Props = {
  inspections: Inspection[];
};

type GroupedInspections = {
  [key: string]: Inspection[];
};

export default function InspectionsTable({ inspections }: Props) {
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>(
    []
  );
  const [criticalOnly, setCriticalOnly] = useState(false);

  useEffect(() => {
    const filtered = inspections.filter((inspection) => {
      return !criticalOnly || inspection.type === "Critical Violation";
    });
    setFilteredInspections(filtered);
  }, [inspections, criticalOnly]);

  // Get array of unique dates
  const dates: string[] = filteredInspections
    .map((a) => a.date)
    .filter(
      (value, index, self) => index === self.findIndex((t) => t === value)
    )
    .reverse();

  // Group by date
  const grouped = filteredInspections.reduce(
    (r: GroupedInspections, a: Inspection) => {
      r[a.date] = [...(r[a.date] || []), a];
      return r;
    },
    {}
  );

  // Date format
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div>
      <Switch
        id="critical-only"
        label="Critical violations only"
        checked={criticalOnly}
        toggle={() => setCriticalOnly(!criticalOnly)}
      />
      {dates.map((date) => (
        <Card
          title={new Date(date).toLocaleDateString("en-US", dateOptions)}
          className="mt-4"
          key={date}
        >
          <>
            {grouped[date].map((inspection) => (
              <div className="flex mb-4 last:mb-0" key={inspection.id}>
                <div>
                  {inspection.violation_item == "None" ? (
                    <CheckCircleIcon className="h-6 w-6 text-emerald-700" />
                  ) : inspection.type == "Critical Violation" ? (
                    <XCircleIcon className="h-6 w-6 text-rose-800" />
                  ) : (
                    <ExclamationIcon className="h-6 w-6 text-amber-700" />
                  )}
                </div>
                <div className="ml-2">
                  {inspection.violation_item == "None" ? (
                    <span>No violations</span>
                  ) : (
                    <span>{inspection.description}</span>
                  )}
                </div>
              </div>
            ))}
          </>
        </Card>
      ))}
    </div>
  );
}
