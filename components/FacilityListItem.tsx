import type { Facility } from "../types";
import Link from "next/link";
import Card from "../components/Card";
import Badge from "../components/Badge";
import {
  CheckCircleIcon,
  ExclamationIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

type Props = {
  item: Facility;
};

export default function FacilityListItem({ item }: Props) {
  const total = item.violations + item.warnings;

  return (
    <Link href={"/" + item.operation_id} passHref>
      <a className="block">
        <Card
          title={item.name}
          className="block uppercase mb-4 sm:mb-6 hover:outline hover:outline-slate-300"
        >
          <div className="flex items-center">
            <div className="flex-1 text-xs sm:text-sm">
              {item.address}
              <br />
              {item.city}, {item.zip_code}
            </div>
            <div className="ml-2 sm:flex items-center">
              {item.warnings > 0 && (
                <Badge
                  label="Non-critical violations"
                  className="bg-amber-700 text-white"
                  count={item.warnings}
                  icon={<ExclamationIcon className="h-5 w-5 mt-0.5" />}
                />
              )}
              {item.violations > 0 && (
                <Badge
                  label="Critical violations"
                  className="bg-rose-800 text-white"
                  count={item.violations}
                  icon={<XCircleIcon className="h-5 w-5 mt-0.5" />}
                />
              )}
              {total === 0 && (
                <Badge
                  label="No violations"
                  className="bg-emerald-700 text-white"
                  count={0}
                  icon={<CheckCircleIcon className="h-5 w-5 mt-0.5" />}
                />
              )}
            </div>
          </div>
        </Card>
      </a>
    </Link>
  );
}
