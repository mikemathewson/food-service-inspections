import type { Inspection } from "../types";
import Card from "./Card";
import Legend from "./Legend";
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
  // Get array of unique dates
  const dates: string[] = inspections
    .map((a) => a.date)
    .filter(
      (value, index, self) => index === self.findIndex((t) => t === value)
    )
    .reverse();

  // Group by date
  const grouped = inspections.reduce((r: GroupedInspections, a: Inspection) => {
    r[a.date] = [...(r[a.date] || []), a];
    return r;
  }, {});

  // Date format
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div>
      <Legend />
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
